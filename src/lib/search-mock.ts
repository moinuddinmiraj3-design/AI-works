// Sample data for the sourcing flow (New Search + Search Results).

export type Importance = "very" | "important" | "nice";
export type CriterionResult = "met" | "partial" | "missing";

export type Criterion = { id: string; label: string; importance: Importance; matched: number };

export const criteria: Criterion[] = [
  { id: "k1", label: "5+ years of product design", importance: "very", matched: 31 },
  { id: "k2", label: "B2B SaaS or dashboard products", importance: "very", matched: 26 },
  { id: "k3", label: "Strong Figma and prototyping", importance: "very", matched: 34 },
  { id: "k4", label: "User research experience", importance: "important", matched: 22 },
  { id: "k5", label: "Based in the US", importance: "important", matched: 29 },
  { id: "k6", label: "Built or owned a design system", importance: "nice", matched: 14 },
];

export const importanceLabel: Record<Importance, string> = {
  very: "Very important",
  important: "Important",
  nice: "Nice to have",
};

export type Experience = { company: string; title: string; period: string; note: string; tone: string };

export type Candidate = {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  years: number;
  avatar: string;
  match: number;
  openToWork: boolean;
  results: Record<string, CriterionResult>;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: string;
  status: "new" | "shortlisted" | "hidden";
};

export const candidates: Candidate[] = [
  {
    id: "p1", name: "Maya Chen", title: "Senior Product Designer", company: "Loom", location: "San Francisco, CA", years: 7,
    avatar: "/avatars/a5.jpg", match: 97, openToWork: true, status: "shortlisted",
    results: { k1: "met", k2: "met", k3: "met", k4: "met", k5: "met", k6: "partial" },
    summary: "Leads design for Loom's workspace admin. Ran 40+ customer interviews last year and rebuilt the billing flow end to end.",
    skills: ["Figma", "Prototyping", "User research", "Design systems", "B2B SaaS", "Usability testing"],
    experience: [
      { company: "Loom", title: "Senior Product Designer", period: "2022 – now", note: "Owns workspace admin and billing. Shipped the new seat management flow.", tone: "bg-[#ece8ff] text-[#5b3fd6]" },
      { company: "Asana", title: "Product Designer", period: "2019 – 2022", note: "Designed reporting dashboards for enterprise customers.", tone: "bg-[#ffe9e6] text-[#d4442e]" },
      { company: "IDEO", title: "Interaction Designer", period: "2017 – 2019", note: "Research-led concept work for health and fintech clients.", tone: "bg-gray-100 text-gray-700" },
    ],
    education: "BFA Interaction Design, California College of the Arts",
  },
  {
    id: "p2", name: "Daniel Reyes", title: "Senior UX Designer", company: "Intercom", location: "Austin, TX", years: 6,
    avatar: "/avatars/a2.jpg", match: 95, openToWork: true, status: "new",
    results: { k1: "met", k2: "met", k3: "met", k4: "met", k5: "met", k6: "missing" },
    summary: "Designs Intercom's inbox for support teams. Strong prototyper who tests every flow with customers before handoff.",
    skills: ["Figma", "Framer", "User research", "B2B SaaS", "Accessibility"],
    experience: [
      { company: "Intercom", title: "Senior UX Designer", period: "2021 – now", note: "Inbox and routing rules for support teams.", tone: "bg-brand-50 text-brand-700" },
      { company: "HubSpot", title: "UX Designer", period: "2018 – 2021", note: "CRM record pages and reporting.", tone: "bg-orange-50 text-orange-600" },
    ],
    education: "BS Human-Computer Interaction, UT Austin",
  },
  {
    id: "p3", name: "Emma Larsen", title: "Design Lead", company: "Mixpanel", location: "Remote, US", years: 9,
    avatar: "/avatars/a3.jpg", match: 93, openToWork: false, status: "new",
    results: { k1: "met", k2: "met", k3: "met", k4: "partial", k5: "met", k6: "met" },
    summary: "Leads a team of four designers on Mixpanel's analytics product and owns the company's design system.",
    skills: ["Figma", "Design systems", "Data visualization", "Team leadership", "B2B SaaS"],
    experience: [
      { company: "Mixpanel", title: "Design Lead", period: "2020 – now", note: "Analytics reports and the Mixpanel design system.", tone: "bg-[#ece8ff] text-[#5b3fd6]" },
      { company: "Dropbox", title: "Product Designer", period: "2016 – 2020", note: "Sharing and permissions.", tone: "bg-[#e6f0ff] text-[#2f66d6]" },
    ],
    education: "MDes, Carnegie Mellon University",
  },
  {
    id: "p6", name: "Jonas Weber", title: "Product Designer", company: "N26", location: "Berlin, Germany", years: 5,
    avatar: "/avatars/a6.jpg", match: 88, openToWork: true, status: "new",
    results: { k1: "met", k2: "partial", k3: "met", k4: "met", k5: "missing", k6: "partial" },
    summary: "Designs onboarding and account flows for N26's business banking product. Open to relocating to the US.",
    skills: ["Figma", "Prototyping", "User research", "Fintech"],
    experience: [
      { company: "N26", title: "Product Designer", period: "2021 – now", note: "Business account onboarding.", tone: "bg-gray-100 text-gray-700" },
      { company: "Zalando", title: "UX Designer", period: "2019 – 2021", note: "Checkout and returns.", tone: "bg-orange-50 text-orange-600" },
    ],
    education: "BA Communication Design, UdK Berlin",
  },
  {
    id: "p8", name: "Grace Murphy", title: "Product Designer", company: "Notion", location: "New York, NY", years: 4,
    avatar: "/avatars/a11.jpg", match: 84, openToWork: false, status: "new",
    results: { k1: "partial", k2: "met", k3: "met", k4: "partial", k5: "met", k6: "missing" },
    summary: "Works on Notion's database views. Ships quickly and has strong visual craft; less formal research experience.",
    skills: ["Figma", "Visual design", "Prototyping", "Productivity tools"],
    experience: [
      { company: "Notion", title: "Product Designer", period: "2022 – now", note: "Database views and templates.", tone: "bg-gray-100 text-gray-700" },
      { company: "Squarespace", title: "Visual Designer", period: "2020 – 2022", note: "Templates and marketing pages.", tone: "bg-[#e6f0ff] text-[#2f66d6]" },
    ],
    education: "BFA Graphic Design, Parsons",
  },
  {
    id: "p9", name: "Kenji Tanaka", title: "UX Designer", company: "Shopify", location: "Remote, Canada", years: 5,
    avatar: "/avatars/a8.jpg", match: 79, openToWork: true, status: "hidden",
    results: { k1: "met", k2: "partial", k3: "met", k4: "met", k5: "missing", k6: "missing" },
    summary: "Merchant admin designer at Shopify with a research background.",
    skills: ["Figma", "User research", "E-commerce"],
    experience: [{ company: "Shopify", title: "UX Designer", period: "2020 – now", note: "Merchant admin and orders.", tone: "bg-brand-50 text-brand-700" }],
    education: "BDes, OCAD University",
  },
];

export const pool = { reviewed: 214, total: 260, excellent: 38, high: 52, medium: 71, low: 53, average: 81 };

export const chat = [
  { from: "user" as const, text: "Senior product designer, 5+ years in B2B SaaS, strong Figma and research skills, based in the US." },
  { from: "ai" as const, text: "I turned that into 6 criteria and started scoring profiles. You can change how much each one matters on the left." },
  { from: "ai" as const, text: "214 of about 260 profiles reviewed. 38 are strong matches (90%+). Most of them have dashboard or admin experience." },
];

export const roleTemplates = ["Product Designer", "Software Engineer", "Marketing Lead", "Data Scientist", "Account Executive"];

/* ---------------- Library: extra people and per-search criteria ---------------- */

export const criteriaSets: Record<string, { title: string; items: Criterion[] }> = {
  s1: { title: "Senior Product Designer", items: criteria },
  s2: {
    title: "Staff Backend Engineer",
    items: [
      { id: "b1", label: "8+ years backend engineering", importance: "very", matched: 18 },
      { id: "b2", label: "Production Go experience", importance: "very", matched: 15 },
      { id: "b3", label: "Distributed systems at scale", importance: "very", matched: 12 },
      { id: "b4", label: "Led technical projects", importance: "important", matched: 14 },
      { id: "b5", label: "Open to Berlin hybrid", importance: "important", matched: 11 },
    ],
  },
  s4: {
    title: "Growth Marketing Lead",
    items: [
      { id: "g1", label: "Scaled a PLG funnel", importance: "very", matched: 9 },
      { id: "g2", label: "Paid and lifecycle channels", importance: "very", matched: 12 },
      { id: "g3", label: "Seed to Series B experience", importance: "important", matched: 7 },
      { id: "g4", label: "Managed a small team", importance: "nice", matched: 6 },
    ],
  },
};

export const moreCandidates: Candidate[] = [
  {
    id: "p10", name: "Robert Hale", title: "Principal Designer", company: "Atlassian", location: "Seattle, WA", years: 14,
    avatar: "/avatars/a10.jpg", match: 90, openToWork: false, status: "shortlisted",
    results: { k1: "met", k2: "met", k3: "partial", k4: "met", k5: "met", k6: "met" },
    summary: "Principal designer on Jira's admin experience. Deep design-systems background and a strong mentor.",
    skills: ["Design systems", "Information architecture", "Figma", "Mentoring", "B2B SaaS"],
    experience: [
      { company: "Atlassian", title: "Principal Designer", period: "2018 – now", note: "Jira admin and the Atlassian Design System.", tone: "bg-[#e6f0ff] text-[#2f66d6]" },
      { company: "Microsoft", title: "Senior Designer", period: "2012 – 2018", note: "Office 365 admin center.", tone: "bg-gray-100 text-gray-700" },
    ],
    education: "BA Graphic Design, University of Washington",
  },
  {
    id: "p11", name: "Layla Hassan", title: "Product Designer", company: "Figma", location: "San Francisco, CA", years: 5,
    avatar: "/avatars/a7.jpg", match: 89, openToWork: true, status: "shortlisted",
    results: { k1: "met", k2: "partial", k3: "met", k4: "met", k5: "met", k6: "partial" },
    summary: "Designs collaboration features at Figma. Runs her own research and prototypes in code.",
    skills: ["Figma", "Prototyping", "User research", "Collaboration tools"],
    experience: [
      { company: "Figma", title: "Product Designer", period: "2021 – now", note: "Comments and multiplayer.", tone: "bg-orange-50 text-orange-600" },
      { company: "Airbnb", title: "Product Designer", period: "2019 – 2021", note: "Host tools.", tone: "bg-[#ffe9e6] text-[#d4442e]" },
    ],
    education: "BS Cognitive Science, UC San Diego",
  },
  {
    id: "p4", name: "Lucas Moreau", title: "Staff Engineer", company: "Grafana", location: "Berlin, Germany", years: 11,
    avatar: "/avatars/a4.jpg", match: 91, openToWork: false, status: "shortlisted",
    results: { b1: "met", b2: "met", b3: "met", b4: "met", b5: "partial" },
    summary: "Staff engineer on Grafana's storage layer. Wrote much of the Go ingestion pipeline that handles billions of samples a day.",
    skills: ["Go", "Distributed systems", "Kubernetes", "Observability", "Tech lead"],
    experience: [
      { company: "Grafana", title: "Staff Engineer", period: "2019 – now", note: "Metrics storage and ingestion in Go.", tone: "bg-orange-50 text-orange-600" },
      { company: "SoundCloud", title: "Senior Engineer", period: "2014 – 2019", note: "Streaming backend.", tone: "bg-gray-100 text-gray-700" },
    ],
    education: "MSc Computer Science, TU Berlin",
  },
  {
    id: "p5", name: "Amara Okafor", title: "Backend Engineer", company: "Cockroach Labs", location: "New York, NY", years: 8,
    avatar: "/avatars/a9.jpg", match: 90, openToWork: true, status: "shortlisted",
    results: { b1: "met", b2: "met", b3: "met", b4: "partial", b5: "missing" },
    summary: "Works on CockroachDB's transaction layer. Strong systems background, open to relocating for the right team.",
    skills: ["Go", "Databases", "Distributed systems", "C++"],
    experience: [
      { company: "Cockroach Labs", title: "Backend Engineer", period: "2020 – now", note: "Transaction layer and replication.", tone: "bg-[#ece8ff] text-[#5b3fd6]" },
      { company: "Bloomberg", title: "Software Engineer", period: "2016 – 2020", note: "Market data services.", tone: "bg-gray-100 text-gray-700" },
    ],
    education: "BEng Computer Engineering, University of Lagos",
  },
  {
    id: "p7", name: "Erik Lindqvist", title: "Growth Lead", company: "Notion", location: "Remote, US", years: 7,
    avatar: "/avatars/a1.jpg", match: 87, openToWork: false, status: "shortlisted",
    results: { g1: "met", g2: "met", g3: "partial", g4: "met" },
    summary: "Leads self-serve growth at Notion. Grew template-driven signups 3x and runs a team of four.",
    skills: ["PLG", "Lifecycle", "Paid acquisition", "Experimentation"],
    experience: [
      { company: "Notion", title: "Growth Lead", period: "2021 – now", note: "Self-serve funnel and templates.", tone: "bg-gray-100 text-gray-700" },
      { company: "Calendly", title: "Growth Marketer", period: "2018 – 2021", note: "Paid and lifecycle.", tone: "bg-[#e6f0ff] text-[#2f66d6]" },
    ],
    education: "BA Economics, NYU",
  },
];

export const allCandidates: Candidate[] = [...candidates, ...moreCandidates];

/** Which search a candidate was found in (drives the match breakdown). */
export const searchOf = (id: string) => (["p4", "p5"].includes(id) ? "s2" : id === "p7" ? "s4" : "s1");

/* ---------------- Collections ---------------- */

export type Outreach = "not-contacted" | "emailed" | "opened" | "replied";
export type Member = { id: string; email: string | null; outreach: Outreach; added: string };

export const collectionMembers: Record<string, Member[]> = {
  c1: [
    { id: "p1", email: "maya.chen@hey.com", outreach: "replied", added: "Today" },
    { id: "p2", email: "daniel@reyes.design", outreach: "opened", added: "Today" },
    { id: "p3", email: null, outreach: "not-contacted", added: "Yesterday" },
    { id: "p10", email: "rob.hale@gmail.com", outreach: "emailed", added: "Yesterday" },
    { id: "p11", email: "layla.h@proton.me", outreach: "emailed", added: "Nov 10" },
    { id: "p6", email: null, outreach: "not-contacted", added: "Nov 10" },
    { id: "p8", email: "grace@murphy.studio", outreach: "not-contacted", added: "Nov 9" },
  ],
  c2: [
    { id: "p4", email: "lucas@moreau.dev", outreach: "emailed", added: "Nov 8" },
    { id: "p5", email: null, outreach: "not-contacted", added: "Nov 8" },
  ],
  c3: [{ id: "p7", email: "erik.lindqvist@gmail.com", outreach: "replied", added: "Nov 6" }],
  c4: [],
};

export const outreachLabel: Record<Outreach, string> = {
  "not-contacted": "Not contacted",
  emailed: "Emailed",
  opened: "Opened",
  replied: "Replied",
};

/** Activity feed for the candidate page. */
export function activityFor(id: string) {
  const m = Object.values(collectionMembers).flat().find((x) => x.id === id);
  const steps = [
    { kind: "found", text: "Found by Lasso in “" + criteriaSets[searchOf(id)].title + "”", when: "Nov 9, 10:12" },
    { kind: "shortlist", text: "Shortlisted by Alex Morgan", when: "Nov 9, 10:40" },
  ];
  if (m && m.outreach !== "not-contacted") steps.push({ kind: "email", text: "Sent “Opportunity at Northwind” (step 1 of 3)", when: "Nov 10, 09:00" });
  if (m && (m.outreach === "opened" || m.outreach === "replied")) steps.push({ kind: "open", text: "Opened the email", when: "Nov 10, 14:22" });
  if (m && m.outreach === "replied") steps.push({ kind: "reply", text: "Replied: “Thanks for reaching out — happy to chat this week.”", when: "Nov 11, 08:05" });
  return steps.reverse();
}
