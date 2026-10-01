# Legalflow – Dashboard (UI/UX Engineer take-home)

A pixel-accurate Angular 18 implementation of the **LCM – Dashboard / "Dashboard - Filled"** Figma frame, built with standalone components, signals, SCSS and Tailwind CSS. All data is static mock data, with no backend.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/legalflow-dashboard
```

Requires Node 18.19+ (tested with Node 22). The build has 0 errors and 0 warnings.

## Tech and conventions

- **Angular 18** with standalone components, `ChangeDetectionStrategy.OnPush` everywhere, signals (`signal`, `computed`, `input`, `viewChild`), and the new control flow (`@if`, `@for`, `@switch`).
- **Tailwind CSS 3** for layout and utilities. Component SCSS is used where it reads better (charts, scrollbars, container queries).
- **Fonts:** Inter and Urbanist variable fonts are self-hosted via Fontsource. The design uses non-standard weights (424, 432, 540), which only variable fonts can render, and self-hosting means no runtime dependency on Google Fonts.
- **Icons:** all are inline SVG (`lf-icon`), 24px grid, 1.5px stroke, `currentColor`. No icon fonts or emoji.

## Design tokens

Every value was read from the Figma file (variables plus node inspection), not estimated from screenshots. They are defined once, in `tailwind.config.js`, and mirrored in `src/styles/_variables.scss` for SCSS-only rules.

| Group | Values |
| --- | --- |
| Brand | `#db7658` (500), `#8c4b39` (700), `#784031` (800), alpha-10 `rgba(189,138,57,.1)`, alpha-16 |
| Text | `#171717`, `#5c5c5c`, `#a3a3a3` |
| Surfaces / strokes | `#fff`, `#f7f7f7`, `#ebebeb`, `#d1d1d1`, sidebar `#f0f0f0`, chip `#e9eaeb` |
| Status | green `#1fc16b` / `#178c4e` / `#1a7544`, red `#fb3748` / `#d02533`, yellow `#f6b51e` / `#c99a2c`, orange `#fa7319`, plus their alpha-10/16 fills |
| Type | Inter (labels 12/16, 14/20, 16/24, 18/24, 24/32; paragraphs weight 424/432). Urbanist titles (20/28 w540, 24/26, 32/40) |
| Radius | 4, 6, 8, 12, 16 (scroll track 19) |
| Spacing | 2, 4, 6, 8, 10, 12, 16, 24, 32 |
| Gradients | activity, cases and tasks chart washes, and the AI summary gradient (exact stops and angles from Figma) |

Figma strokes are drawn *inside* the frame, so they don't add to element size. To keep heights exact (cards 578 / 366 / 140 / 371 / 417, stat cards 88, rows 64/72/76), strokes on fixed-size elements use `outline-offset:-1px` or inset `box-shadow` instead of `border`.

## Structure

```
src/app/
├── core/
│   ├── models/dashboard.models.ts      typed interfaces
│   ├── mock-data/dashboard.mock.ts     all static content
│   └── services/layout.service.ts      viewport + sidebar state (signals)
├── shared/components/
│   ├── icon/          inline SVG icon set
│   ├── card-shell/    white card + grey header + actions slot
│   ├── badge/         status chips (sm for cases, md for tasks)
│   ├── button/        [lfButton] directive: outline / soft / brand / ghost
│   ├── scroll-area/   list well + custom 12px external scrollbar (draggable)
│   ├── stat-card/     KPI card
│   ├── tooltip/       [lfTooltip] for icon-only controls
│   ├── avatar/  logo/  empty-state/
├── layout/
│   ├── sidebar/       open / collapsed / mobile drawer
│   └── topbar/
└── features/dashboard/
    ├── dashboard.component.ts          page grid
    ├── stats-row/
    ├── recent-activity/  (+ activity-bar-chart)
    ├── ai-summary/
    ├── upcoming-events/
    ├── recent-cases/     (+ cases-donut)
    └── upcoming-tasks/
```

## Functionality

- **Sidebar**
  - States: open (212px) and collapsed (120px, icons only). Icons are 18px, labels 15px, and collapsed rows are 40px tall, centred and evenly spaced.
  - Behaviour: smooth width transition, expandable groups (animated), and an active item with `aria-current`. Collapsed icons show tooltips on hover and focus. Clicking a group while collapsed opens the sidebar on that group.
  - Logo and toggle: the 85×28 logo is the exact Figma vector, never shrunk, wrapped or cut. When open, the logo and the » toggle are both shown. When collapsed, the toggle is fully hidden and the logo becomes a `<button aria-label="Expand sidebar">` (Enter/Space, focus ring, pointer cursor).
- **Mobile drawer**
  - Opens from the hamburger and closes on overlay click, Escape, or selecting an item.
  - Height is 100dvh (100vh fallback). The layout is a flex column: fixed header, scrollable nav (`min-height: 0`), and a non-shrinking footer with `env(safe-area-inset-bottom)` padding. Reports, Settings and the user row stay fully visible (checked at 360/390/430 × 640).
  - Accessibility: `role="dialog"` with `aria-modal`. Focus moves in on open, is trapped while open, and returns to the hamburger on close. The body scroll is locked, and the panel is `inert` while hidden.
- **Stat cards:** use a tinted icon box and a trend indicator. Colour follows sentiment, and screen readers get the direction as text.
- **Activity chart:** a grouped bar chart rendered from the mock data. Hovering or focusing a day dims the others and shows a tooltip.
- **AI summary:** Hide/Show with an animated collapse (`aria-expanded`, `aria-controls`).
- **Upcoming events**
  - The week strip is a WAI-ARIA tablist (←/→/Home/End). Selecting a day filters the events.
  - Dots show each day's event count, an empty state appears for days without events, and a live region announces the count.
- **Recent cases:** donut chart (draws in once on load) and a case list with status badges.
- **Upcoming tasks:** the legend items are filter toggles (`aria-pressed`) that dim the other bar segments. A proportional segmented bar and an empty state with "Clear filter" are included.
- **Scrolling**
  - Every list scrolls inside its card through `lf-scroll-area`. The native scrollbar is hidden, and a synced, draggable 12px track with an 8px thumb sits outside the grey well, as in the design.
  - Wheel, touch and keyboard scrolling all work, and the region is focusable.
  - The track keeps its width when there's nothing to scroll, so nothing shifts. The sidebar nav uses a thin styled native scrollbar.
- **Accessibility**
  - Semantic `aside`/`nav`/`main`/`header`/`section`/`ul` and a skip link.
  - Visible `:focus-visible` rings everywhere and full keyboard support.
  - `prefers-reduced-motion` is respected.

## Responsive behaviour

| Width | Layout |
| --- | --- |
| **≥ 1024 (desktop)** | Sidebar open (collapsible). Two equal columns with 16px gaps. Fixed design heights (Activities 578, Events 371). Recent Cases and Upcoming Tasks fill the rest of their columns, so **both columns always end on the same line**, including when the AI summary is hidden or text wraps differently. Lists use `contain: size` so their content never stretches a card. |
| **768–1023 (tablet)** | Sidebar starts collapsed (icons only) and can still be expanded. Single column. Stat cards 2×2. |
| **< 768 (mobile)** | Off-canvas drawer and a hamburger in the topbar. Single column, re-ordered by priority: AI summary → events → tasks → activity → cases. Stat cards 2-up, with subgrid so headers and values line up across a row. 40px+ tap targets. |

Section internals respond to **their own width** (CSS container queries), not the viewport. This lets the same component work in a 588px desktop column, a 380px column at 1024px with the sidebar open, and a 328px phone card:

- Activity chips stack under the title.
- Bar widths flex.
- The week strip tightens.
- The task legend becomes a 2×2 grid.
- The cases chart turns into a compact horizontal summary.
- Event and task titles get two lines instead of one.

Verified with headless Chromium at 1440, 1024, 768, 390, 360 and 320. There is no horizontal page scroll at any width from 320px up.

## Deviations from the design (and why)

1. **Meeting icon:** the Google Meet icon is replaced by a neutral video-call glyph, to avoid shipping a third-party trademark. (The logo now uses the exact vector exported from the Figma node.)
1b. **Sidebar sizes:** open width is 212px instead of Figma's 200px. Icons were increased to 18px and labels to 15px for readability, and at 200px "Manage Tenants" would truncate.
2. **Other icons** are hand-drawn inline SVGs matched to the design's outline style (size and stroke). They are close, but not the exact original glyphs.
3. **Weekend dates:** the design shows "11" for Fri, Sat and Sun. Sat and Sun are corrected to 12 and 13 (the week is Mon 7 – Sun 13 Sep 2026).
4. **"Total 21"** is kept as in the design. Note that the design's own counts (2 + 12 + 8 + 5) add up to 27.
5. **Last case number:** the last case row (#24494) is styled grey/14px in Figma. It now uses the same orange underlined style as the other rows for consistency.
6. **Avatar:** the photo is replaced with an initials avatar (no image asset available).
7. **Content offset:** the Figma content frame has an extra 5px offset from the sidebar that looks accidental. Content uses a symmetric 24px padding.
8. **Hidden events:** the design's event list is clipped by the card edge. Here the list fills the card and scrolls with 12px bottom padding instead.

## With more time I would

- Swap in the exported Figma SVGs for the nav icons for exact glyph fidelity.
- Add Angular Router so the nav items are real routes, and back the "View All" / "Calendar" buttons with pages.
- Add unit tests for the scroll-area, the events filtering/keyboard tabs and the tasks filter, plus Playwright visual-regression snapshots at each breakpoint.
- Add a dark theme. The tokens are already centralised, so it's mostly a second palette.
