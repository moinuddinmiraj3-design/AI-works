# Design System

Modeled on the **Exa web dashboard** ([Mobbin reference](https://mobbin.com/apps/exa-web-8bd92ec4-c6bd-4e80-b9b8-45b15a5a207f/915c1459-cf7d-4450-b60f-7f108f6d139e/screens)).
This copies the visual language (layout, scale, color roles, components). It does not copy Exa's logo, name or copy text. Use our own brand mark.

## Files
| File | Purpose |
|---|---|
| `tokens.css` | CSS custom properties: color, type, spacing, radius, shadow, motion. Includes the `.theme-dark` scope |
| `components.css` | Framework-free component classes built on the tokens |
| `tailwind.preset.js` | The same tokens as a Tailwind preset |
| `index.html` | Live reference page with every token and component |

## Principles
1. **Two-tone workspace.** A light app shell holds navigation and input; a near-black panel (`.theme-dark`) holds code and output. The split is the product's signature.
2. **Dense and quiet.** UI text is 12–13px, controls are 26–32px tall, and borders are 1px `#e5e5e5`. Layout comes from whitespace and grouping, not boxes.
3. **One accent.** Cobalt `#2443e0` is used only for the primary action (Run, Submit), the active nav item, active tabs and switches that are on. Everything else stays neutral.
4. **Settings-row pattern.** Put the label and helper text on the left and the control on the right, in a ~56/44 split. Nested options are indented 16px.
5. **Low elevation.** Shadows appear only on floating things: menus, toasts, the assistant pill and modals.

## Color roles
- **Text:** `gray-900` primary · `gray-600` secondary · `gray-500` helper · `gray-400` placeholder
- **Surfaces:** `#fff` canvas · `gray-25` sidebar · `gray-50` muted cards and segmented-control active state
- **Accent:** `blue-600` primary button · `blue-50` bg with `blue-600` text for the active nav item and the "Try an example" chip · `blue-500` links and charts
- **Hero headline:** `navy-900`
- **Dark panel:** `ink-950` tab bar · `ink-900` body · `ink-850` result cards · `ink-700` borders · `ink-100` text
- **Status:** green success / API-status dot · sky info toast

## Typography
Geist for UI and Geist Mono for code, keys and the response timer. These are open-source stand-ins for Exa's grotesk/mono pairing. Weights are 400, 500 and 600 only; titles use 500, not bold. CAPS labels (`TOTAL USAGE`, `API STATUS`) are 10px with 0.06em tracking.

| Role | Size/Weight |
|---|---|
| Hero | 30 / 500, navy |
| Page title | 20 / 500 |
| Metric | 24 / 600 |
| Section | 16 / 500 |
| Card / result title | 14 / 500 |
| Field label | 13 / 500 |
| UI (buttons, nav, inputs) | 12 / 400–500 |
| Helper | 11 / 400 muted |
| Caps label / badge | 10 / 500 uppercase |

## Spacing, radius, elevation
- **Spacing:** 4px grid. Common values are 4, 6, 8, 12, 16, 20 and 24.
- **Radius:** 3 for badges · 4 for inputs, buttons and nav · 6 for cards · 8 for the composer, menus and modal · 12 for metric cards · full for pills, chips and switches.
- **Layout:** sidebar 240px · dark panel tab bar 40px · inputs 32px · small buttons and tabs 26px.

## Component inventory
Sidebar (team switcher, grouped nav, external-link icon, NEW badge, feedback button) · page header with Docs / Copy-for-AI buttons · underline tabs · pill tabs (Code / Output) · query composer (textarea, soft "Try an example" dropdown, Clear and Run) · settings row · input · select · date-range input · segmented control (Include/Exclude) · switch · checkbox · badges (`NEW`, mono `TRY "PEOPLE"`) · suggestion chips · home chat input · endpoint cards with skeleton previews · metric cards · usage bar chart (`blue-500` bars, dotted gridlines) · dark result card with Show More footer · code block with line numbers · menu / team switcher · toasts with progress bar · dark response modal · floating "Ask assistant" pill · empty state ("Click Run to see a response").
