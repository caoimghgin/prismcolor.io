# PRISM-001: Project Documentation & Redesign Research

**Status:** Done
**Story Points:** 0.6
**Assignee:** Kevin + Claude

---

## Story

As a developer onboarding to PrismColor, I need accurate project documentation and a consolidated view of user feedback and redesign priorities so that future work is grounded in real requirements.

## Acceptance Criteria

- [x] README updated with correct install instructions (Yarn 4 via Corepack, not npm)
- [x] README documents the core color science (CIE L*, weight scale, palette generation algorithm)
- [x] README documents project architecture (directory structure, data flow, state management)
- [x] Old Mantine template boilerplate removed from README
- [x] Codebase fully explored and understood: models, components, store, constants, utilities
- [x] User feedback reviewed and synthesized (Andy Dang)
- [x] Redesign brief reviewed and analyzed (Cinderella Treatment)
- [x] Frank's UI mockup reviewed (Palette Dashboard layout with tonal category groupings)

## Summary of Findings

### Codebase

- **Core engine** (`models/ScaleModel.js`) is solid — 23-step L* linear scale, OKLch interpolation, gamut mapping, contrast annotation
- **State** is minimal and clean — Zustand store tracks optimization, contrast metric, and editing state
- **UI** is functional but undersells the science — no curve visualization, no contrast grid, no dark mode, no educational context
- **Mixed JS/TS** — models and components are JavaScript, store and types are TypeScript

### User Feedback (Andy Dang)

Key requests:
1. Lightness curve visualization with ability to see/tweak values
2. Explanation of why CIE L* over HSL/HSB/OKLCH
3. Contrast grid (references EightShapes)
4. Intuitive contrast breakpoint at 500 (already implemented, not surfaced in UI)
5. Dark/light mode preview

### Redesign Brief (Cinderella Treatment)

Core problem: Competitor tools (Supa Colors Studio) are gaining attention with dark mode aesthetics and draggable curve editors despite being perceptually incorrect. PrismColor has the science but not the presentation.

Priority recommendations:
1. **Dark mode** — table stakes for pro credibility
2. **"The Truth" visualization** — side-by-side HSL vs L* curve comparison (highest differentiation value)
3. **Comparison mode** — same color through Genome vs Material vs Tailwind vs naive HSL
4. **Color picker** — visual picker, not just hex input
5. **L* education** — inline explainers, hover tooltips
6. **Animation/motion** — smooth transitions, generation animations
7. **Export enhancements** — CSS variables, Tailwind config, design tokens

### Frank's UI Mockup

Dashboard layout with:
- Tonal category headers (Highlights, Full Tones, Mid Tones, 3/4 Tones, Shadows) grouping swatches
- All semantic scales visible simultaneously with key color inputs inline
- Top-right actions: Edit palette, Export, Create palette
- Cleaner information hierarchy than current UI

## Notes

- The lightness curve should default to read-only (linear = correct). An "unlock" toggle for advanced users preserves the scientific integrity while still giving the interactive feel users expect.
- The broken "Learn More" link on the landing page (routes to `/view` which doesn't exist) should be fixed as part of foundation work.
- Project uses Yarn 4 (`packageManager` field in package.json) — npm will fail with ERESOLVE errors.
