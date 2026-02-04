# D4 Preview

**D4 Preview** is a specialized visualization engine designed to bridge the gap between data and design. It serves as an interactive canvas where complex hierarchies, map data, and ad creatives converge into a unified, coherent experience.

## Tech Stack

*   **Framework:** Svelte 5 (Runes) + Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **UI Library:** Bits UI (Headless Svelte components)
*   **Icons:** Lucide Svelte

## Features

*   **AdCanvas:** Pixel-perfect rendering of ad creatives.
*   **Tree View:** Interactive, recursive visualization of data hierarchies.
*   **Properties Panel:** Detailed inspection and editing of selected elements.
*   **Visualizer Maps:** Context-aware overlays for overrides and ranges.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## Project Structure

*   `src/components`: UI components (AdCanvas, Panels, Maps, etc.)
*   `src/lib`: Shared utilities and type definitions.
*   `src/assets`: Static assets.
*   `_legacy_backup`: Backup of the previous React implementation.
