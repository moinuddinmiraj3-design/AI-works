// Fake data for the UI phase. Replace with real API calls later.
// Portraits: Unsplash (royalty-free), stored in /public/avatars.

export type Tone = "blue" | "violet" | "amber" | "green" | "rose" | "slate";

export const user = { name: "Alex Morgan", firstName: "Alex", role: "Head of Talent", avatar: "/avatars/a12.jpg" };
export const workspace = { name: "Northwind", plan: "Starter", searchesUsed: 9, searchesLimit: 25, trialDaysLeft: 7 };

export const collections = [
  { id: "c1", name: "Product Designers — SF", count: 7, tone: "blue" as Tone },
  { id: "c2", name: "Backend · Go", count: 2, tone: "violet" as Tone },
  { id: "c3", name: "Growth leads", count: 1, tone: "amber" as Tone },
  { id: "c4", name: "Design leadership", count: 0, tone: "green" as Tone },
];

export type SearchStatus = "searching" | "ready";
export const searches = [
  { id: "s1", title: "Senior Product Designer", description: "Product designer with 5+ years in B2B SaaS, strong Figma and research skills, US remote", status: "searching" as SearchStatus, progress: 0.72, reviewed: 214, strong: 38, shortlisted: 12, tone: "blue" as Tone, updated: "2 min ago" },
  { id: "s2", title: "Staff Backend Engineer", description: "Go engineer with distributed systems experience, open to Berlin hybrid", status: "searching" as SearchStatus, progress: 0.4, reviewed: 166, strong: 21, shortlisted: 9, tone: "violet" as Tone, updated: "14 min ago" },
  { id: "s3", title: "Data Scientist", description: "Python, experimentation and causal inference, NYC or remote East Coast", status: "ready" as SearchStatus, progress: 1, reviewed: 300, strong: 41, shortlisted: 0, tone: "green" as Tone, updated: "1 hr ago" },
  { id: "s4", title: "Growth Marketing Lead", description: "Scaled a PLG funnel from seed to Series B, paid and lifecycle", status: "ready" as SearchStatus, progress: 1, reviewed: 188, strong: 17, shortlisted: 9, tone: "amber" as Tone, updated: "Yesterday" },
];

export const stats = [
  { key: "lists", label: "Collections", value: "3", caption: "50 candidates saved", icon: "folder", tone: "blue" as Tone },
  { key: "shortlisted", label: "Shortlisted", value: "126", caption: "+18 this week", icon: "users", tone: "violet" as Tone },
  { key: "searches", label: "Searches run", value: "9", caption: "2 running now", icon: "search", tone: "green" as Tone },
  { key: "outreach", label: "Emails sent", value: "84", caption: "15 replies · 18% reply rate", icon: "mail", tone: "amber" as Tone },
];

export type CandidateStatus = "new" | "emailed" | "replied" | "no-email";
export const shortlisted = [
  { id: "p1", name: "Maya Chen", title: "Product Designer", company: "Loom", match: 97, collection: "c1", status: "replied" as CandidateStatus, avatar: "/avatars/a5.jpg" },
  { id: "p2", name: "Daniel Reyes", title: "Senior UX Designer", company: "Intercom", match: 95, collection: "c1", status: "emailed" as CandidateStatus, avatar: "/avatars/a2.jpg" },
  { id: "p3", name: "Emma Larsen", title: "Design Lead", company: "Mixpanel", match: 93, collection: "c1", status: "no-email" as CandidateStatus, avatar: "/avatars/a3.jpg" },
  { id: "p4", name: "Lucas Moreau", title: "Staff Engineer", company: "Grafana", match: 91, collection: "c2", status: "new" as CandidateStatus, avatar: "/avatars/a4.jpg" },
  { id: "p5", name: "Amara Okafor", title: "Backend Engineer", company: "Cockroach Labs", match: 90, collection: "c2", status: "emailed" as CandidateStatus, avatar: "/avatars/a9.jpg" },
  { id: "p6", name: "Jonas Weber", title: "Product Designer", company: "N26", match: 88, collection: "c1", status: "new" as CandidateStatus, avatar: "/avatars/a6.jpg" },
  { id: "p7", name: "Erik Lindqvist", title: "Growth Lead", company: "Notion", match: 87, collection: "c3", status: "replied" as CandidateStatus, avatar: "/avatars/a1.jpg" },
];

// Candidates shortlisted per day / per week (chart)
export const shortlistDaily = [
  { label: "Oct 30", value: 4 }, { label: "Oct 31", value: 6 }, { label: "Nov 1", value: 3 }, { label: "Nov 2", value: 1 },
  { label: "Nov 3", value: 9 }, { label: "Nov 4", value: 12 }, { label: "Nov 5", value: 8 }, { label: "Nov 6", value: 14 },
  { label: "Nov 7", value: 7 }, { label: "Nov 8", value: 2 }, { label: "Nov 9", value: 3 }, { label: "Nov 10", value: 16 },
  { label: "Nov 11", value: 11 }, { label: "Nov 12", value: 6 },
];
export const shortlistWeekly = [
  { label: "Sep 22", value: 18 }, { label: "Sep 29", value: 25 }, { label: "Oct 6", value: 14 }, { label: "Oct 13", value: 31 },
  { label: "Oct 20", value: 22 }, { label: "Oct 27", value: 36 }, { label: "Nov 3", value: 55 }, { label: "Nov 10", value: 33 },
];

export type TaskKind = "reply" | "email" | "paused" | "done";
export const tasks = [
  { id: "t1", kind: "reply" as TaskKind, title: "3 replies waiting", detail: "Maya Chen, Erik Lindqvist and 1 more", action: "Open" },
  { id: "t2", kind: "email" as TaskKind, title: "17 candidates have no email", detail: "Product Designers — SF", action: "Find emails" },
  { id: "t3", kind: "paused" as TaskKind, title: "Sequence paused", detail: "Design outreach hit today's sending limit", action: "Review" },
];

export const sourced = { total: 1284, delta: 12.4, strong: 117 };

export const roles = [
  { id: "s1", title: "Senior Product Designer", icon: "pen", shortlisted: 12, target: 20 },
  { id: "s2", title: "Staff Backend Engineer", icon: "code", shortlisted: 9, target: 15 },
  { id: "s4", title: "Growth Marketing Lead", icon: "trend", shortlisted: 9, target: 10 },
];

export const replyBreakdown = [
  { key: "replied", label: "Replied", pct: 18, color: "bg-primary", dot: "bg-primary" },
  { key: "opened", label: "Opened", pct: 46, color: "bg-ink-900", dot: "bg-ink-900" },
  { key: "none", label: "No response", pct: 36, color: "bg-gray-200", dot: "bg-gray-300" },
];

export const weeklySourced = [
  { label: "Aug 25", value: 62 }, { label: "Sep 1", value: 48 }, { label: "Sep 8", value: 71 }, { label: "Sep 15", value: 55 },
  { label: "Sep 22", value: 80 }, { label: "Sep 29", value: 66 }, { label: "Oct 6", value: 92 }, { label: "Oct 13", value: 74 },
  { label: "Oct 20", value: 58 }, { label: "Oct 27", value: 103 }, { label: "Nov 3", value: 121 }, { label: "Nov 10", value: 96 },
];

// Pipeline per day — each square in the chart is one candidate.
export const pipelineDays = [
  { day: "Oct 30", shortlisted: 2, contacted: 1, replied: 0 },
  { day: "Oct 31", shortlisted: 3, contacted: 1, replied: 0 },
  { day: "Nov 1", shortlisted: 1, contacted: 2, replied: 1 },
  { day: "Nov 2", shortlisted: 1, contacted: 1, replied: 0 },
  { day: "Nov 3", shortlisted: 3, contacted: 2, replied: 1 },
  { day: "Nov 4", shortlisted: 3, contacted: 3, replied: 1 },
  { day: "Nov 5", shortlisted: 2, contacted: 4, replied: 2 },
  { day: "Nov 6", shortlisted: 4, contacted: 3, replied: 1 },
  { day: "Nov 7", shortlisted: 2, contacted: 3, replied: 1 },
  { day: "Nov 8", shortlisted: 1, contacted: 1, replied: 0 },
  { day: "Nov 9", shortlisted: 1, contacted: 1, replied: 1 },
  { day: "Nov 10", shortlisted: 4, contacted: 4, replied: 2 },
  { day: "Nov 11", shortlisted: 3, contacted: 4, replied: 2 },
  { day: "Nov 12", shortlisted: 3, contacted: 2, replied: 1 },
];
