"use client";

import { useEffect, useState, useMemo } from "react";
import { Terminal, Wifi, Coffee, Code, Mail, GitMerge, GitPullRequest } from "lucide-react";

const Twitter = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Github = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const Linkedin = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

export default function GithubActivity({ username = "pranavkrishna" }: { username?: string }) {
  const [profile, setProfile] = useState<any>(null);
  const [prs, setPrs] = useState<any[]>([]);
  const [prCount, setPrCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"merged" | "open" | "closed">("merged");
  const [loading, setLoading] = useState(true);
  const [commitsActivity, setCommitsActivity] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<{date: string, count: number, publicCount: number, privateCount: number} | null>(null);
  const [filterType, setFilterType] = useState<"both" | "public" | "private">("both");

  const displayDays = useMemo(() => {
    if (!commitsActivity.length) return Array(140).fill({ empty: true });
    return commitsActivity.map(d => {
      if (d.empty) return d;
      const count = filterType === "both" ? d.publicCount + d.privateCount 
                  : filterType === "public" ? d.publicCount 
                  : d.privateCount;
      let intensity = 0;
      if (count === 0) intensity = 0;
      else if (count === 1) intensity = 1;
      else if (count <= 3) intensity = 2;
      else if (count <= 6) intensity = 3;
      else intensity = 4;
      return { ...d, count, intensity };
    });
  }, [commitsActivity, filterType]);

  useEffect(() => {
    setSelectedDay(null);
  }, [filterType]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data from our secure proxy route
        const res = await fetch(`/api/github?username=${username}`);
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
        
        const data = await res.json();
        
        if (data.profile) setProfile(data.profile);
        if (data.prs) {
          setPrs(data.prs.items || []);
          setPrCount(data.prs.total_count || 0);
        }

        const now = new Date();
        const todayDay = now.getDay();
        const padding = (todayDay + 1 - (140 % 7) + 7) % 7;
        
        const daysData = Array(140 + padding).fill(null).map((_, i) => {
          if (i < padding) return { empty: true };
          const d = new Date();
          d.setDate(d.getDate() - (139 - (i - padding)));
          return {
            date: d.toISOString().split('T')[0],
            publicCount: 0,
            privateCount: 0,
          };
        });

        if (data.contributions && Array.isArray(data.contributions) && data.contributions.length > 0) {
          // Use GraphQL contribution calendar
          data.contributions.forEach((contrib: any) => {
            const dayObj = daysData.find(d => !d.empty && d.date === contrib.date);
            if (dayObj) {
              dayObj.publicCount = contrib.count;
              // We don't have public vs private breakdown from GraphQL, so we just put it all in publicCount
            }
          });
        } else if (data.events && Array.isArray(data.events)) {
          // Fallback to events
          data.events.forEach((event: any) => {
            const isPush = event.type === "PushEvent";
            const isPR = event.type === "PullRequestEvent";
            const isIssue = event.type === "IssuesEvent";
            const isPRReview = event.type === "PullRequestReviewEvent";
            const isCreate = event.type === "CreateEvent";

            if (isPush || isPR || isIssue || isPRReview || isCreate) {
              const eventDateStr = event.created_at.split('T')[0];
              const dayObj = daysData.find(d => !d.empty && d.date === eventDateStr);
              
              if (dayObj) {
                const isPublic = event.public === true;
                let commits = 1;
                
                if (isPush) {
                  commits = event.payload?.commits?.length || 1;
                }
                
                if (isPublic) {
                  dayObj.publicCount += commits;
                } else {
                  dayObj.privateCount += commits;
                }
              }
            }
          });
        }
        
        setCommitsActivity(daysData);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const filteredPrs = prs.filter(pr => {
    if (activeTab === "merged") return pr.pull_request?.merged_at != null;
    if (activeTab === "open") return pr.state === "open";
    if (activeTab === "closed") return pr.state === "closed" && pr.pull_request?.merged_at == null;
    return false;
  }).slice(0, 3);

  // Time formatter
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-4 font-mono text-left">
      {/* Top Card */}
      <div className="glass rounded-2xl p-5 text-sm text-zinc-400 shadow-2xl">
        {/* Terminal Header */}
        <div className="mb-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>{username}@anarchy % status</span>
            <span className="flex items-center gap-1 text-emerald-400">
              --live <Wifi className="h-3 w-3 animate-pulse" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
            <span suppressHydrationWarning>
              {formatter.format(new Date()).toLowerCase()}
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mb-8 flex items-center gap-4">
          <img
            src={profile?.avatar_url || "https://github.com/shadcn.png"}
            alt="Avatar"
            className="h-12 w-12 rounded-lg opacity-80 grayscale transition-all hover:grayscale-0"
          />
          <div>
            <div className="text-zinc-200">@{profile?.login || username}</div>
            <div className="mt-1 text-xs">{profile?.bio || "building & shipping"}</div>
          </div>
        </div>

        {/* Commits Graph */}
        <div>
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path>
              </svg>
              Commits
            </span>
            <div className="flex gap-2 text-[10px]">
              {["public", "private", "both"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`transition-colors ${filterType === type ? "text-emerald-400" : "hover:text-zinc-300"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3 grid w-fit grid-rows-7 grid-flow-col gap-1">
            {displayDays.map((day, i) => {
              if (day.empty) return <div key={i} className="h-3.5 w-3.5" />;
              const bgClass = day.intensity === 0 ? "bg-white/5" 
                : day.intensity === 1 ? "bg-emerald-900"
                : day.intensity === 2 ? "bg-emerald-700"
                : day.intensity === 3 ? "bg-emerald-500"
                : "bg-emerald-400";
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  title={`${day.count} commits on ${day.date}`}
                  className={`h-3.5 w-3.5 rounded-[2px] transition-all hover:scale-125 hover:z-10 hover:ring-1 hover:ring-white/50 ${bgClass}`}
                />
              );
            })}
          </div>
          <div className="space-y-1.5 text-[11px] min-h-[32px]">
            <div className="text-zinc-300">
              {selectedDay ? (
                <span className="text-emerald-400">{selectedDay.count} commits on {selectedDay.date}</span>
              ) : (
                profile?.public_repos ? `${profile.public_repos} public repos` : "MON • 6 commits • 0.6h"
              )}
            </div>
            <div className="text-zinc-600" suppressHydrationWarning>
              synced {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-5 gap-2">
        {[
          { icon: Twitter, href: "https://twitter.com/crazy_krissss" },
          { icon: Linkedin, href: "https://linkedin.com/in/happy-coder" },
          { icon: Github, href: profile?.html_url || `https://github.com/${username}` },
          { icon: Code, href: "#" }, // You can link this to LeetCode, CodePen, etc.
          { icon: Mail, href: "mailto:pranavsayshii@gmail.com" },
        ].map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex aspect-square items-center justify-center rounded-lg text-zinc-500 transition-all hover:border-white/20 hover:text-white"
          >
            <social.icon className="h-4 w-4" />
          </a>
        ))}
      </div>

      {/* Recent PRs Card */}
      <div className="glass rounded-2xl p-5 text-sm text-zinc-400 shadow-2xl">
        <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500">
          <span className="flex items-center gap-1.5">
            <GitPullRequest className="h-3.5 w-3.5" />
            Recent PRs
          </span>
          <span>{prCount > 0 ? prCount : "580"}</span>
        </div>

        <div className="mb-5 flex gap-5 border-b border-white/5 pb-2.5 text-[11px] uppercase tracking-wider">
          {["merged", "open", "closed"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={activeTab === tab 
                ? "-mb-[11px] border-b border-violet-400 pb-2.5 text-violet-400" 
                : "pb-2.5 transition-colors hover:text-zinc-200"}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="h-3.5 w-3.5 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-white/10" />
                    <div className="h-2 w-1/2 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPrs.length > 0 ? (
            filteredPrs.map((pr: any) => {
              const repoUrl = pr.repository_url.replace("https://api.github.com/repos/", "");
              return (
                <a 
                  key={pr.id} 
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <GitMerge className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] text-zinc-300 transition-colors group-hover:text-violet-400">
                      {pr.title}
                    </div>
                    <div className="mt-1 truncate text-[11px] text-zinc-600">
                      {repoUrl}
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="text-[12px] text-zinc-500 italic py-2">No {activeTab} pull requests found recently.</div>
          )}
        </div>

        <a 
          href={`https://github.com/pulls?q=author:${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider transition-colors hover:text-white"
        >
          View all on github
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
