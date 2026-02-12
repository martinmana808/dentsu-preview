# GEMINI Index

## Project Summary
**D4 Preview** is a **Svelte 5** application built with Vite and TypeScript. It utilizes Bits UI for its component library and features specialized visualization tools including maps, tree views, and an ad canvas.

## History
### [2026-02-12] AdCanvas Overhaul | [Spatial UX & Scaling](./GEMINI--logs.md#log-20260212-adcanvas-overhaul)
*   **Auto-Fit Scaling**: Implemented dynamic viewport fitting with 1:1 panning sensitivity.
*   **Spatial HUD**: Added real-time X/Y position and Zoom level tracking.
*   **Navigation [+]**: Added "Add New Range/Size" menu and fixed range highlighting issues.
*   **Spotlight Dimming**: Fixed overflow visualization corner rendering using box-shadows.

### [2026-02-12] Navigation Refactor | [Index Mode & Visual Wraps](./GEMINI--logs.md#log-20260212-navigation-refactor)
*   **Top Nav**: Replaced dropdown with an (a, b, c...) index list for all sizes.
*   **Visual Wraps**: Implemented reactive overlays for Global (Green), Range (Purple), and Size (Orange) modes.
*   **Layout Cleanup**: Hid the Overrides/Ranges maps and the Breakpoints ruler/segments.

### [2026-02-12] YOLO V3 | [Linked Database Architecture](./GEMINI--logs.md#log-20260212-linked-db-refactor)
*   **Data Model**: Implemented many-to-many relationship between Sizes and Ranges.
*   **Reactivity**: Overrides now dynamically update in the panel based on selection.
*   **Global Integration**: Property counts in Global tab are now aggregated dynamically.

### [2026-02-09] YOLO v2 Fixes | [Layout & Styling](./GEMINI--logs.md#log-20260209-yolo-v2-fixes)
*   **Z-Index Fix**: Moved floating menus to component root to prevent clipping.
*   **Styling**: Implemented Range (Purple) and Size (Orange) variants for inputs.
*   **Bug Fixes**: Resolved stacking context issues and event bubbling for dropdowns.

### [2026-02-09] YOLO v2 | [Data & UI Polish](./GEMINI--logs.md#log-20260209-yolo-v2-features)
*   **Local DB**: Implemented `src/lib/data.ts` with hardcoded sizes, ranges, and random overrides.
*   **UI Colors**: Applied Green (Global), Purple (Ranges), Orange (Sizes) color coding to Properties Panel.
*   **Menu Fixes**: Resolved overflow clipping for "Add Override" and "Apply" menus using fixed positioning.

### [2026-02-08] YOLO Workflow | [Major Feature Implementation](./GEMINI--logs.md#log-20260208-yolo-workflow)
*   **Image Controls**: Implemented scaling, panning, origin visualization, and overflow toggle in `AdCanvas`.
*   **Properties Overhaul**: Refactored panel for selective overrides (add/remove) and application scopes ("Apply to").
*   **Breakpoints UI**: Created `BreakpointsBar` for linear format/range visualization at the top of the app.

### [2026-02-07] UI Refinements | [Git Workflow](./GEMINI--logs.md#log-20260207-ui-refinement-and-planning)
*   Updated `Input`/`Textarea` styling (borderless, focus states, disabled opacity).
*   Revised `TODO.md` with new feedback and roadmap items.

### [2026-02-04] File Inputs | [UI Consistency](./GEMINI--logs.md#log-20260204-file-input-styling)
*   Standardized disabled input styling to match readonly inputs (removed opacity fade).

### [2026-02-04] Focus Fix | [Focus Styles Visual Bug](./GEMINI--logs.md#log-20260204-fix-focus-style)
*   Reverted thick focus ring to subtle gray standard.

### [2026-02-04] Input Focus | [UI Refinement](./GEMINI--logs.md#log-20260204-input-focus-styling)
*   Updated focus ring to gray and removed offset for cleaner look.

### [2026-02-04] Input Styling | [UI Refinement](./GEMINI--logs.md#log-20260204-input-styling)
*   Updated `Input` and `Textarea` styling to match design (borderless, light gray).

### [2026-02-04] Translation Branch | [Git Workflow](./GEMINI--logs.md#log-20260204-translate-svelte-branch)
*   Created `translate-to-svelte` branch.
*   Updated `README.md` and Manifesto for Svelte context.

### [2026-02-04] CSS & Properties Tabs | [Fixes & Features](./GEMINI--logs.md#log-20260204-css-and-props)
*   Resolved Tailwind v4 configuration.
*   Implemented Ranges and Sizes tabs in `PropertiesPanel`.

### [2026-02-02] Svelte Migration | [Refactoring React to Svelte 5](./GEMINI--logs.md#log-20260202-svelte-migration)
*   Fully migrated codebase from React to Svelte 5 (Runes).
*   Replaced Radix UI with Bits UI.
*   Verified specific components: `AdCanvas`, `PropertiesPanel`, `TreeView`.

### [2026-02-02] Git Workflow Initialization | [Initial Setup](./GEMINI--logs.md#log-20260202-git-workflow)
*   Initialized Antigravity Master Logging Protocol.
*   Established `GEMINI.md`, `GEMINI--logs.md`, and `GEMINI--manifesto.md`.
*   Enhanced `README.md` with project details.
