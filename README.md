# prismcolor.io

A perceptually uniform color palette generator built on CIE L\*a\*b\* and CIE LCH. Unlike other palette tools, PrismColor guarantees cross-hue lightness consistency — a 500-weight blue and a 500-weight red share identical CIE L\* values.

## How It Works

### The Weight Scale

PrismColor uses a **000–999 weight scale** that maps linearly to CIE L\* lightness:

- **000** = white (L\* = 100)
- **500** = perceptual midtone (L\* ≈ 50)
- **999** = black (L\* = 0)

The full scale has 23 steps: `000, 025, 050, 075, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 999`.

A minor adjustment is applied at specific WCAG 4.5:1 contrast thresholds to ensure accessibility compliance without compromising perceptual uniformity across the rest of the scale.

### Color Spaces

- **CIE L\*a\*b\* (D65)** — source of truth for perceptual lightness
- **CIE LCH** — used alongside L\*a\*b\* for perceptual color representation
- **OKLch** — used as the interpolation space for generating smooth color gradients between key colors
- **sRGB** — output color space for web display

### Palette Generation

1. The user provides one or more **key colors** for a semantic scale (e.g., primary, negative, neutral)
2. White (L\*=100) and black (L\*=0) are locked at the ends of the scale
3. Colors are interpolated between keys using OKLch with a maximum perceptual delta (ΔE ≤ 0.50) per step
4. Each generated color is matched to its nearest target L\* value from the 23-step scale
5. Every swatch is gamut-mapped to sRGB and annotated with WCAG 2.1 and APCA contrast ratios

### Design System Compatibility

The universal 23-step palette is the canonical representation. PrismColor maps subsets of this palette to match the naming conventions of existing design systems:

- Material Design (M2 & M3)
- IBM Carbon
- Adobe Spectrum
- Salesforce Lightning
- Ant Design
- Accessible Palette
- ColorBox

## Architecture

### Tech Stack

- **Framework:** Next.js 15 (Pages Router)
- **UI Library:** Mantine 7
- **State Management:** Zustand
- **Color Math:** colorjs.io
- **Language:** TypeScript / JavaScript

### Project Structure

```
models/
  ScaleModel.js        # Core palette generation algorithm
  ColorModel.js        # Extended colorjs.io Color class with contrast calculations
  SwatchModel.js       # Individual color swatch with gamut mapping and metadata
  PaletteModel.js      # Container for multiple semantic scales
  OptimizationModel.js # Design system weight mappings

store/
  usePaletteStore.ts   # Zustand store (optimization, contrast metric, editing state)

pages/
  index.tsx            # Landing page
  create.tsx           # Main palette creation interface

components/
  NavBar/              # Top navigation bar with download/settings
  SideNav/             # Left sidebar with optimization/contrast selectors and scale list
    Mode/View.js       # View mode: scale selector, optimization & contrast dropdowns
    Mode/Edit.js       # Edit mode: key color management with color picker
  PaletteView/         # Main content area dispatcher
  SwatchGroup/         # Grid display of all semantic scales
  ScaleGroup/          # Detailed single-scale view during editing

constants/
  index.js             # Target L* values, weight strings, semantic names

utilities/
  index.js             # Color conversion helpers, contrast-aware text color

extensions/
  colorjs.io/          # Custom color validation and parsing
```

### Data Flow

```
User edits key colors
  → ScaleModel regenerates via OKLch interpolation
    → Each color matched to target L* value
      → SwatchModel gamut-maps to sRGB, calculates contrast
        → Zustand store updates
          → UI re-renders swatch grid
```

### State (Zustand)

The store tracks three things:

- **optimization** — which design system mapping is active (Universal, Material, Carbon, etc.)
- **contrast** — which metric to display (CIE L\*, WCAG 2.1, APCA, Ok L\*, CAM16, HCT)
- **editing** — which semantic scale is currently being edited (null = view mode)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation

Enable Corepack (ships with Node.js) to use the correct Yarn version:

```bash
sudo corepack enable
```

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

## Yarn scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
