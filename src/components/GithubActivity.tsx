"use client";

import { useEffect, useState } from "react";
import { Terminal, Wifi, Coffee, Code, Mail, GitMerge, GitPullRequest } from "lucide-react";

const Twitter = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Github = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const Linkedin = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const Youtube = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>;
const Twitch = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/></svg>;

export default function GithubActivity({ username = "pranavkrishna" }: { username?: string }) {
  const [profile, setProfile] = useState<any>(null);
  const [prs, setPrs] = useState<any[]>([]);
  const [prCount, setPrCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"merged" | "open" | "closed">("merged");
  const [loading, setLoading] = useState(true);
  const [commitsActivity, setCommitsActivity] = useState<number[]>([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (profileRes.ok) {
          setProfile(await profileRes.json());
        }

        // 2. Fetch Events (for activity graph approximation)
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          // Group PushEvents by day for the last 30 days
          const days = Array(30).fill(0);
          const now = new Date();
          events.forEach((event: any) => {
            if (event.type === "PushEvent") {
              const eventDate = new Date(event.created_at);
              const diffTime = Math.abs(now.getTime() - eventDate.getTime());
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays < 30) {
                // Add commit count (payload.commits.length) to that day
                days[29 - diffDays] += event.payload.commits?.length || 1;
              }
            }
          });
          // Normalize to intensities between 0.1 and 1
          const maxCommits = Math.max(...days, 1);
          const intensities = days.map(count => (count === 0 ? 0.1 : Math.max(0.3, count / maxCommits)));
          setCommitsActivity(intensities);
        } else {
          // Fallback static intensities if rate limited
          setCommitsActivity(Array(30).fill(0.1).map((_, i) => [0.1, 0.4, 0.8, 1, 0.6, 0.3, 0.9, 0.2, 0.5, 0.8, 0.7, 0.4, 1, 0.5][i % 14]));
        }

        // 3. Fetch PRs
        const prsRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+sort:updated-desc&per_page=30`);
        if (prsRes.ok) {
          const prData = await prsRes.json();
          setPrs(prData.items || []);
          setPrCount(prData.total_count || 0);
        }
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
            {formatter.format(new Date()).toLowerCase()}
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
            <span>{commitsActivity.length > 0 ? "LIVE" : "30d"}</span>
          </div>

          <div className="mb-3 flex h-5 gap-1">
            {(commitsActivity.length > 0 ? commitsActivity : Array(30).fill(0.1)).map((intensity, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-violet-500 transition-opacity duration-500"
                style={{ opacity: intensity }}
              />
            ))}
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="text-zinc-300">
              {profile?.public_repos ? `${profile.public_repos} public repos` : "MON • 6 commits • 0.6h"}
            </div>
            <div className="text-zinc-600">
              synced {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-8 gap-2">
        {[
          { icon: Twitter, href: `https://twitter.com/${profile?.twitter_username || username}` },
          { icon: Linkedin, href: "#" },
          { icon: Github, href: profile?.html_url || `https://github.com/${username}` },
          { icon: Youtube, href: "#" },
          { icon: Twitch, href: "#" },
          { icon: Coffee, href: "#" },
          { icon: Code, href: "#" },
          { icon: Mail, href: profile?.email ? `mailto:${profile.email}` : "#" },
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
