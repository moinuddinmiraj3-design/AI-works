# MVP Scope: AI Candidate Sourcing & Outreach

Reference product: **Wrangle (web)**, studied on [Mobbin](https://mobbin.com/apps/wrangle-web-754b7fd2-714c-4ea1-81e8-6c3ffb295d80/bc5d983c-bad6-495f-9414-9a18a4f6e703/screens).
Goal: cut the full product down to **10 core pages**. Everything else is a modal, drawer or small connecting page.

---

## 1. What the reference product is

An AI recruiting tool. A recruiter describes the person they want in plain language. AI finds matching profiles and scores each one against criteria. The recruiter shortlists people into collections, finds their emails and contacts them through automated email sequences. Interviews are then scheduled through a connected calendar.

**The core loop:**

```
Describe role ──► AI finds + scores candidates ──► Shortlist into a collection
      ▲                                                     │
      │                                                     ▼
  Refine search ◄── Track replies ◄── Send emails / sequence ◄── Get contact emails
```

### Full feature inventory (what Wrangle has today)

| Area | Features seen |
|---|---|
| **Shell** | Workspace switcher · New search (⌘K) · global search (⌘/) · next-meeting widget · collections in the sidebar · trial card · credits counter · notifications · Invite team · Knowledge hub |
| **Onboarding** | Modal wizard: connect Google (Gmail + Calendar) → create workspace (logo, name, slug) → invite teammates → "How did you hear about us" + referral code, with a live status card |
| **Dashboard** | Recent searches/collections cards · 4 stat tiles (lists, saved, searches, outreached) · recent candidates list · "profiles added" bar chart (daily/weekly) · empty state |
| **Sourcing** | Prompt ("Who can I help you find?") · role suggestion chips · Deep Research mode · source picker · stepper (Job Description → Refine Search) · Preferences · History |
| **Search results** | 3 panes: **Copilot chat** (criteria, pool stats, quick actions) · **candidate cards** (match %, criteria checks by importance, Hide / Shortlist) · **profile panel** (LinkedIn, location, skills, experience). Tabs: Sourcing / Shortlisted / Hidden · Shortlist all · Add to collection · **Filter popover** with a slider per criterion and a minimum match % |
| **Library / Collections** | Spreadsheet table (name, title, company, location, email, LinkedIn) · Share · Attributes · View · Import people · Filters · Export CSV · bulk select → Add to list / Message / Delete · **email enrichment** · Copilot chat overlay · compose with templates and variables |
| **Candidate profile** | Prev/next ("34 of 197") · tabs Overview / Emails / Interviews / Notes · per-candidate Copilot · View LinkedIn |
| **Emails** | Sent / Scheduled / Templates · list + preview · Edit / Cancel scheduled · Manage variables · Create template |
| **Sequences** | List (cards + table, status) · editor: email steps + wait N days · templates · variables (First name, Company) · preview as recipient · delivery window, timezone, business days · daily/hourly send limits · send-from account · signature · Recipients tab · enroll from collection · enable/disable · test email |
| **Interviews** | Meetings grouped by date · Join meeting · Notes · booking link · availability · event settings (title, duration) |
| **Settings** | Connections (Google, network sync) · Integrations · Plans · Members · **Career page** (branding, preview, job posts) |
| **Extras** | Chrome extension (search your own network) · credits economy · Knowledge hub · feedback |

---

## 2. Keep / Simplify / Cut for the MVP

### ✅ Keep (this is the product)
| Feature | Why |
|---|---|
| Natural-language search prompt | The entry point and the "wow" |
| AI match score + criteria checklist per candidate | This is the differentiator. Without it we're just a people-search table |
| Shortlist / Hide | Fast triage is the core interaction |
| Collections (saved lists) | Where shortlisted people live and where outreach starts |
| Candidate profile | Needed to make a decision |
| Find email (enrichment) | You can't do outreach without it |
| Email templates with variables | Personalisation at scale |
| Simple sequence (email → wait → follow-up) | Most replies come from follow-ups |
| Connect Gmail to send | Emails must come from the recruiter's own inbox |

### 🟡 Simplify
| Feature | MVP version |
|---|---|
| Copilot chat (everywhere) | Only on the **search results** page, for refining the search ("only US", "add Figma"). No chat on collections or profiles |
| Filter popover with sliders per criterion | One **minimum match %** slider plus the importance tags |
| Sequence settings (windows, timezones, hourly caps, business days) | Send window + business days only. Fixed safe daily cap behind the scenes |
| Onboarding wizard (4 steps + survey) | 2 steps: **workspace name → connect Google**. Invites are optional, from Settings |
| Dashboard (stats + chart + lists) | 4 stat tiles + recent searches + "continue where you left off". No chart |
| Emails area (Sent / Scheduled / Templates) | Merged into one **Outreach** page with tabs |
| Collection table (Attributes, Views, Share) | Fixed columns, CSV export, bulk actions. No custom views or attributes |
| Candidate tabs (Overview / Emails / Interviews / Notes) | Overview + Activity (emails sent, replies) + one notes field |
| Plans & credits | One plan or a simple usage counter. Billing can be manual or a Stripe link at first |

### ❌ Cut from the MVP (v2+)
| Feature | Why it can wait |
|---|---|
| Interviews module (calendar sync, booking links, availability, event settings) | Recruiters already use Calendly or Google Calendar. Put a booking link in the email template |
| Career page / job board builder | A different product (inbound). Our MVP is outbound sourcing |
| Chrome extension + "network sync" | Big build. Not needed to prove the core loop |
| Deep Research mode | Optimisation. Ship one good search mode first |
| Import people from CSV | Nice to have. Users start from our search |
| Custom attributes, saved views, sharing collections | Power-user features |
| Credits economy UI | Track usage internally and show a simple limit |
| Knowledge hub, referral survey, "how did you hear" | Marketing and ops, not product |
| Next-meeting widget in the sidebar | Depends on the cut Interviews module |
| Multiple workspaces / workspace switcher | One workspace per account at first |
| Global ⌘K command search | Add once there's enough content to search |
| A/B tests, multiple sender accounts, hourly caps | Advanced deliverability |

---

## 3. The 10 core pages

| # | Page | Route | Purpose | Key UI |
|---|---|---|---|---|
| 1 | **Sign in / Sign up** | `/login` `/signup` | Access | Google SSO (also grants Gmail) + email fallback |
| 2 | **Onboarding** | `/onboarding` | Get to a first search in under 60s | Step 1 workspace name + logo · step 2 connect Google · live checklist card |
| 3 | **Home** | `/` | Starting point + overview | Greeting + search prompt shortcut · 4 stat tiles (searches, shortlisted, emails sent, replies) · recent searches · recent collections · empty state |
| 4 | **New Search** | `/search/new` | Describe the ideal candidate | Large prompt box · role suggestion chips · location / seniority quick pickers · past searches link |
| 5 | **Search Results** ⭐ | `/search/:id` | Triage AI-matched candidates | **Left:** criteria + Copilot refine chat · **Center:** candidate cards (match %, criteria checks, Hide / Shortlist) with tabs All / Shortlisted / Hidden · **Right:** profile preview · top: min-match filter, "Add shortlisted to collection" |
| 6 | **Collections** | `/collections` + `/collections/:id` | Manage saved candidates | List of collections → table view (name, title, company, location, email status, LinkedIn) · bulk: Find emails, Add to sequence, Remove · Export CSV |
| 7 | **Candidate Profile** | `/candidates/:id` | Decide and track one person | Header (name, role, links, match %) · Overview (experience, skills, education) · Activity (emails, replies) · notes · prev/next within the list |
| 8 | **Outreach** | `/outreach` | All sequences + emails in one place | Tabs: **Sequences** (status, recipients, sent, replied) · **Emails** (sent / scheduled list + preview, cancel) · **Templates** |
| 9 | **Sequence Editor** | `/outreach/sequences/:id` | Build and run a sequence | Steps (email → wait N days → email) · variable chips · preview as recipient · settings side panel (send window, business days, from) · Recipients tab · Enroll from collection · Activate / Pause |
| 10 | **Settings** | `/settings` | Account plumbing | Sections: Profile · Workspace · Connected Gmail · Members (invite) · Plan & usage |

### Connecting pieces (not counted as pages)
- **Modals:** Add to collection / Create collection · Compose one-off email · Enroll in sequence · Create / edit template · Invite member · Upgrade / limit reached · Confirm delete
- **Drawers / popovers:** Search history · Min-match filter · Variables picker · Candidate quick-view (reused on Collections)
- **System pages:** Forgot password · Email verify · OAuth callback · 404 / error · Empty states for every list
- **Feedback:** Toasts (shortlisted, email sent, enrichment queued, sequence enrolled) · loading/skeleton state for AI search ("Evaluating profiles…")

---

## 4. Primary user flows

**A. First run**
`Sign up (Google) → Onboarding: workspace → connect Gmail → New Search`

**B. Source**
`New Search → Search Results → refine via Copilot → Shortlist ⨉ N → "Add to collection" (modal) → Collection`

**C. Reach out**
`Collection → select rows → Find emails → "Add to sequence" (modal: pick or create) → Sequence Editor → Activate`

**D. Follow up**
`Outreach → Emails / Sequences → Candidate Profile (Activity) → reply arrives → mark status / note`

**E. Return visit**
`Home → recent search or collection → continue at B or C`

```
           ┌──────────┐    ┌────────────┐
 Sign in ─►│Onboarding│───►│ New Search │◄────────── Home
           └──────────┘    └─────┬──────┘              ▲
                                 ▼                     │
                        ┌────────────────┐             │
                        │ Search Results │──profile──► Candidate Profile
                        └───────┬────────┘                  ▲
                    add to collection                        │
                                ▼                            │
                        ┌────────────────┐                   │
                        │  Collections   │───────────────────┘
                        └───────┬────────┘
                       add to sequence
                                ▼
                 ┌────────────────────────────┐
                 │ Outreach ⇄ Sequence Editor │
                 └────────────────────────────┘
                     Settings (from sidebar)
```

---

## 5. MVP sidebar

```
[Logo] Workspace
+ New search
─────────────
Home
Searches          (history)
Collections
Outreach
─────────────
Collections ▸     (quick links to recent lists)
─────────────
Settings
```
Compared with the reference, this drops Interviews, Emails as a separate item, Knowledge hub, the meeting widget and the workspace switcher.

---

## 6. Open questions for the next phase
1. **Candidate data source:** our own database, a data provider API (e.g. People Data Labs, Proxycurl-style) or LinkedIn-via-extension later? This drives cost and scope more than anything else.
2. **Email finding:** which enrichment provider, and what's the cost per email?
3. **Who pays and how:** per seat, per search or credits? This decides whether usage UI is needed in v1.
4. **Our domain twist:** what makes our product *different* (niche roles, region, agency vs in-house, a different workflow)? This changes which of the 10 pages carries the most weight.
5. **Sending:** Gmail only, or also Outlook, at launch?
