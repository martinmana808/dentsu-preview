# D4 Preview

**D4 Preview** is a specialized visualization engine designed to bridge the gap between data and design. It serves as an interactive canvas where complex hierarchies, map data, and ad creatives converge into a unified, coherent experience.

## Tech Stack

*   **Framework:** Svelte 5 (Runes) + Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **UI Library:** Bits UI (Headless Svelte components)
*   **Icons:** Lucide Svelte

## Features

*   **AdCanvas Overlay**: Pixel-perfect rendering with real-time X/Y HUD, Zoom tracking, and **Auto-Fit scaling** for massive formats.
*   **Spatial Reference**: Includes fixed-scale crosshairs and spotlight-style overflow dimming for layout precision.
*   **Tree View**: Interactive, recursive visualization of data hierarchies.
*   **Index Navigation**: Contextual size index with reactive visual overlays and a "[+]" expansion menu for dynamic management.
*   **Linked Database**: Intelligent data layer linking formats to specific ranges and overrides.

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
