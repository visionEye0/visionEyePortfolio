import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // 1. Fetch Profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`, { 
      headers, 
      next: { revalidate: 3600 } 
    });
    const profile = profileRes.ok ? await profileRes.json() : null;

    // 2. Fetch Contributions Calendar via GraphQL
    let contributions = [];
    if (token) {
      const query = `
        query($userName:String!) {
          user(login: $userName){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;
      const variables = { userName: username };
      const graphqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 }
      });

      if (graphqlRes.ok) {
        const graphqlData = await graphqlRes.json();
        const weeks = graphqlData?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
        weeks.forEach((week: any) => {
          week.contributionDays.forEach((day: any) => {
            contributions.push({
              date: day.date,
              count: day.contributionCount,
            });
          });
        });
      }
    }

    // Fallback: Fetch Events if we couldn't get contributions
    let allEvents: any[] = [];
    if (contributions.length === 0) {
      for (let page = 1; page <= 3; page++) {
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`, { 
          headers,
          next: { revalidate: 300 } // cache for 5 minutes
        });
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          allEvents = allEvents.concat(events);
          if (events.length < 100) break; // Reached the end
        } else {
          break;
        }
      }
    }

    // 3. Fetch PRs
    const prsRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+-user:${username}&sort=created&order=desc&per_page=30`, { 
      headers,
      next: { revalidate: 0 }
    });
    const prs = prsRes.ok ? await prsRes.json() : { items: [], total_count: 0 };

    // 3b. Fetch additional PRs for foodvita using classic token
    const classicToken = process.env.GITHUB_TOKEN_CLASSIC;
    if (classicToken) {
      const classicHeaders: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${classicToken}`
      };
      const classicPrsRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+repo:nefro313/Foodvita&sort=created&order=desc&per_page=30`, { 
        headers: classicHeaders,
        next: { revalidate: 0 }
      });
      
      if (classicPrsRes.ok) {
        const classicPrs = await classicPrsRes.json();
        // Merge and deduplicate by PR id
        const allPrs = [...(prs.items || []), ...(classicPrs.items || [])];
        const uniquePrsMap = new Map();
        allPrs.forEach((pr: any) => uniquePrsMap.set(pr.id, pr));
        
        const uniquePrs = Array.from(uniquePrsMap.values());
        // Sort by created_at descending
        uniquePrs.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        prs.items = uniquePrs.slice(0, 30);
        prs.total_count = uniquePrs.length;
      }
    }

    return NextResponse.json({
      profile,
      events: allEvents,
      contributions,
      prs
    });

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
