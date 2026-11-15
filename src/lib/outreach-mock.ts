// Sample data for Outreach + Sequence Editor.

export type SeqStatus = "active" | "paused" | "draft";

export type Step = { id: string; subject: string; body: string; waitDays: number; sent: number; opened: number; replied: number };

export type Sequence = {
  id: string; name: string; status: SeqStatus; collection: string; recipients: number;
  sent: number; openRate: number; replyRate: number; updated: string; note?: string; steps: Step[];
};

const designSteps: Step[] = [
  {
    id: "st1", waitDays: 0, sent: 12, opened: 8, replied: 2,
    subject: "Product design at {Company}? A quick idea",
    body: "Hi {First name},\n\nI came across your work at {Company} and really liked how you approached admin and billing flows. We're hiring a Senior Product Designer at Northwind to own our dashboard experience end to end.\n\nWould you be open to a 20-minute chat this week? Happy to share more about the team and the problems we're solving.\n\nBest,\nAlex",
  },
  {
    id: "st2", waitDays: 3, sent: 9, opened: 5, replied: 1,
    subject: "Re: Product design at {Company}? A quick idea",
    body: "Hi {First name},\n\nJust bumping this in case it got buried. I think your experience as a {Role} would be a great fit, and the role is fully remote in the US.\n\nWorth a quick call?\n\nAlex",
  },
  {
    id: "st3", waitDays: 4, sent: 4, opened: 2, replied: 0,
    subject: "Last note from me",
    body: "Hi {First name},\n\nI won't keep filling your inbox. If the timing isn't right, no worries at all. If you'd like to talk later, just reply to this email.\n\nAll the best,\nAlex",
  },
];

export const sequences: Sequence[] = [
  { id: "sq1", name: "Product designer outreach", status: "active", collection: "Product Designers — SF", recipients: 12, sent: 25, openRate: 64, replyRate: 21, updated: "2 hours ago", steps: designSteps },
  {
    id: "sq2", name: "Backend engineers — Berlin", status: "active", collection: "Backend · Go", recipients: 9, sent: 14, openRate: 57, replyRate: 14, updated: "Yesterday",
    steps: designSteps.slice(0, 2).map((s, i) => ({ ...s, id: "b" + i, subject: i ? "Re: Staff engineering at Northwind" : "Staff engineering at Northwind", sent: i ? 5 : 9, opened: i ? 2 : 6, replied: i ? 0 : 2 })),
  },
  {
    id: "sq3", name: "Growth leads", status: "paused", collection: "Growth leads", recipients: 4, sent: 6, openRate: 50, replyRate: 17, updated: "Nov 9", note: "Paused · hit today's sending limit",
    steps: designSteps.map((s, i) => ({ ...s, id: "g" + i, subject: ["Growth at Northwind", "Re: Growth at Northwind", "Closing the loop"][i], sent: [4, 2, 0][i], opened: [2, 1, 0][i], replied: [1, 0, 0][i] })),
  },
  {
    id: "sq4", name: "Design leadership", status: "draft", collection: "Not linked yet", recipients: 0, sent: 0, openRate: 0, replyRate: 0, updated: "Nov 8",
    steps: designSteps.slice(0, 2).map((s, i) => ({ ...s, id: "d" + i, sent: 0, opened: 0, replied: 0 })),
  },
];

export type MailStatus = "replied" | "opened" | "sent" | "scheduled";
export type Mail = { id: string; to: string; avatar: string; company: string; role: string; subject: string; status: MailStatus; when: string; sequence: string; step: number };

export const mails: Mail[] = [
  { id: "m1", to: "Maya Chen", avatar: "/avatars/a5.jpg", company: "Loom", role: "Senior Product Designer", subject: "Product design at Loom? A quick idea", status: "replied", when: "Nov 11, 08:05", sequence: "Product designer outreach", step: 1 },
  { id: "m2", to: "Daniel Reyes", avatar: "/avatars/a2.jpg", company: "Intercom", role: "Senior UX Designer", subject: "Product design at Intercom? A quick idea", status: "opened", when: "Nov 10, 14:22", sequence: "Product designer outreach", step: 1 },
  { id: "m3", to: "Robert Hale", avatar: "/avatars/a10.jpg", company: "Atlassian", role: "Principal Designer", subject: "Re: Product design at Atlassian? A quick idea", status: "sent", when: "Nov 12, 09:00", sequence: "Product designer outreach", step: 2 },
  { id: "m4", to: "Layla Hassan", avatar: "/avatars/a7.jpg", company: "Figma", role: "Product Designer", subject: "Product design at Figma? A quick idea", status: "sent", when: "Nov 10, 09:02", sequence: "Product designer outreach", step: 1 },
  { id: "m5", to: "Lucas Moreau", avatar: "/avatars/a4.jpg", company: "Grafana", role: "Staff Engineer", subject: "Re: Staff engineering at Northwind", status: "scheduled", when: "Thu, 09:00", sequence: "Backend engineers — Berlin", step: 2 },
  { id: "m6", to: "Emma Larsen", avatar: "/avatars/a3.jpg", company: "Mixpanel", role: "Design Lead", subject: "Product design at Mixpanel? A quick idea", status: "scheduled", when: "Thu, 09:30", sequence: "Product designer outreach", step: 1 },
];

export const templates = [
  { id: "t1", name: "First touch — designers", subject: "Product design at {Company}? A quick idea", body: designSteps[0].body, used: 31 },
  { id: "t2", name: "Gentle follow-up", subject: "Re: {Subject}", body: designSteps[1].body, used: 24 },
  { id: "t3", name: "Breakup email", subject: "Last note from me", body: designSteps[2].body, used: 12 },
  { id: "t4", name: "Referral ask", subject: "Know a great {Role}?", body: "Hi {First name},\n\nEven if the timing isn't right for you, do you know anyone who'd be a great fit for this role? I'd really appreciate an intro.\n\nThanks,\nAlex", used: 5 },
];

export const previewPeople = [
  { id: "p1", name: "Maya Chen", first: "Maya", company: "Loom", role: "Senior Product Designer", avatar: "/avatars/a5.jpg", email: "maya.chen@hey.com" },
  { id: "p2", name: "Daniel Reyes", first: "Daniel", company: "Intercom", role: "Senior UX Designer", avatar: "/avatars/a2.jpg", email: "daniel@reyes.design" },
  { id: "p10", name: "Robert Hale", first: "Robert", company: "Atlassian", role: "Principal Designer", avatar: "/avatars/a10.jpg", email: "rob.hale@gmail.com" },
];

export const recipients = [
  { id: "p1", name: "Maya Chen", avatar: "/avatars/a5.jpg", company: "Loom", step: 1, state: "Replied", when: "Nov 11" },
  { id: "p2", name: "Daniel Reyes", avatar: "/avatars/a2.jpg", company: "Intercom", step: 2, state: "Step 2 on Nov 13", when: "Nov 10" },
  { id: "p10", name: "Robert Hale", avatar: "/avatars/a10.jpg", company: "Atlassian", step: 2, state: "Sent step 2", when: "Nov 12" },
  { id: "p11", name: "Layla Hassan", avatar: "/avatars/a7.jpg", company: "Figma", step: 1, state: "Step 2 on Nov 13", when: "Nov 10" },
  { id: "p3", name: "Emma Larsen", avatar: "/avatars/a3.jpg", company: "Mixpanel", step: 0, state: "Starts Thu, 09:30", when: "Today" },
];

/** Replace {Variables} with a person's details. */
export function fill(text: string, p: { first: string; company: string; role: string }) {
  return text.replaceAll("{First name}", p.first).replaceAll("{Company}", p.company).replaceAll("{Role}", p.role).replaceAll("{Subject}", "your last email");
}
