# PRISM-002: Core Model & Utility Test Coverage

**Status:** To Do
**Story Points:** 3.0
**Assignee:** Unassigned
**Blocked by:** None
**Blocks:** UI refactor, redesign work

---

## Story

As a developer preparing to refactor the UI, I need comprehensive test coverage on the core color engine so that I can confidently change the presentation layer without breaking palette generation, contrast calculations, or gamut mapping.

## Context

Current test coverage is < 5%. The 78 existing tests cover only validation regex patterns and one template component. All models, utilities, store, and extensions are untested. Before any refactor or redesign work begins, the color engine must have a safety net.

## Acceptance Criteria

### ScaleModel (`models/ScaleModel.js`)
- [ ] Given a single key color, produces 23 swatches
- [ ] White is locked at index 0 (L*=100, weight 000)
- [ ] Black is locked at index 22 (L*=0, weight 999)
- [ ] L*=50 target is tweaked to 49.75 for WCAG 4.5:1 compliance
- [ ] All swatches map to correct target L* values
- [ ] Interpolation between multiple key colors produces smooth transitions
- [ ] Null keys (neutral scale) generates a valid grayscale

### ColorModel (`models/ColorModel.js`)
- [ ] `.as("hex")` returns valid hex string
- [ ] `.as("srgb_8bit_array")` returns [R, G, B] with values 0–255
- [ ] `.as("srgb_8bit")` returns {r, g, b} object
- [ ] WCAG 2.1 contrast against white is calculated correctly
- [ ] WCAG 2.1 contrast against black is calculated correctly
- [ ] APCA contrast against white is calculated correctly
- [ ] APCA contrast against black is calculated correctly

### SwatchModel (`models/SwatchModel.js`)
- [ ] Out-of-gamut colors are normalized to sRGB
- [ ] In-gamut colors pass through unchanged
- [ ] Weight is correctly derived from L* value
- [ ] Contrast ratios are populated on construction
- [ ] isKey, isAnchor, isLock flags are set correctly

### PaletteModel (`models/PaletteModel.js`)
- [ ] Constructs correct number of scales from seed config
- [ ] Each scale has correct semantic name
- [ ] Handles the default palette seed (primary, secondary, positive, negative, etc.)

### Utilities (`utilities/index.js`)
- [ ] `hexToRgb` — parses hex to RGB array
- [ ] `rgbToHex` — converts RGB to hex string
- [ ] `luminanceToWeight` — maps L* values to correct weight strings
- [ ] `luminanceToTarget` — finds nearest standard L* target
- [ ] `eightBitToDecimal` / `decimalToEightBit` — round-trip correctly
- [ ] `swatchFrgColor` — returns white/black based on contrast metric
- [ ] `gamutMap` — maps color to specified gamut

### Extensions (`extensions/colorjs.io/`)
- [ ] `isValid` — accepts valid hex, CSS functions, named colors, transparent
- [ ] `isValid` — rejects malformed strings
- [ ] `parseFunction` — parses CSS color function strings correctly

## Out of Scope

- Component tests (separate ticket)
- Store tests (separate ticket)
- Integration / E2E tests (separate ticket)
- Visual regression tests (separate ticket)

## Notes

- Tests should use known color values with pre-calculated expected outputs (not just "doesn't throw")
- For contrast calculations, cross-reference against a known tool (e.g., WebAIM) to validate expected values
- The L*=49.75 tweak at weight 500 should have an explicit test proving it passes WCAG 4.5:1 against white
- Consider snapshot tests for full scale output to catch regressions during refactor
