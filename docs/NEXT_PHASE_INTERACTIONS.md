# Interaction audit — status

Latest click audit: **412** interactive elements across all 10 pages and their hidden states (tabs, settings sections, onboarding steps).

| Result | Before popups | Now |
|---|---|---|
| Goes to another page | 116 | 116 |
| Changes the page (tabs, toggles, menus, dialogs, filters, live preview) | 161 | 236 |
| Works with a confirmation message | 24 | 31 |
| "Available once the backend is connected" | 93 | 11 |
| Truly dead | 0 | 0 (18 flagged items are already-selected options or chips that fill a text box) |

## Built in this round (popups and menus)

All are built on one shared set of components (`src/components/ui/pop.tsx`): popover menus, dialogs, a right-side drawer and toasts. They work the same way in the real app and in the prototype.

- **Shell:** Notifications panel · Workspace menu · ⌘/ Find anything palette with live search · New collection dialog
- **Home:** This month menu · 14 days menu · Import list · Share report · Add role
- **New Search:** Search history drawer (searchable) · Add filter (adds a chip) · Add a criterion (adds a row)
- **Search Results:** Minimum match slider · Sort menu · Save to collection picker · Compose email · Open profile link
- **Collections:** Share · Export CSV · Filter · New collection
- **Candidate Profile:** Compose email (with templates) · More actions menu · Save to collection
- **Outreach:** New template · Edit template · Reply composer · Edit scheduled email · Cancel scheduled email (confirm)
- **Sequence Editor:** Send test · Enroll recipients · Use a template (fills the step) · Add step (adds a real step) · Delete step (confirm)
- **Settings:** Location and time-zone menus · Member role menu · Invite · Disconnect Gmail (confirm) · Upgrade plan · Change photo / Replace logo · Save / Cancel
- **Onboarding:** Upload logo

Bugs fixed along the way: sidebar dialogs were drawn behind the page; the palette only searched 5 people; the Invite confirmation was overwritten by the wrong message.

## Still to do

### Needs the backend
- [ ] Search Results assistant: quick chips (Find more, US only, Must have research) and Send — **AI refinement**
- [ ] Load more matches — **search API**
- [ ] Everything that currently confirms with a toast but doesn't save yet: sending email, enrolling, invites, imports, CSV export, saving settings, uploads, billing checkout

### UI work — done
- [x] Collapse sidebar → icon-only rail (stays collapsed while you move between pages)
- [x] Sequence editor formatting: bold, italic, underline, link, bulleted list, shown live in the preview
- [x] On phones, dialogs opened from the slide-out menu close the menu and open full-screen

### Prototype limits (not bugs in the real app)
- Typing a new brief doesn't regenerate the criteria (the AI will do this).
- Changes reset when you leave a page, because there's no database yet.
