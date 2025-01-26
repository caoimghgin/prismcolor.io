// Shared Color interface
interface Color {
  spaceId: string;
  coords: [number, number, number];
  alpha: number;
}

// Shared Value interface
interface Value {
  origin: string;
  destination: string;
  hex: string;
}

// Shared Swatch interface
interface Swatch {
  color: Color;
  value: Value;
  weight: string;
  index: number;
  priority: number;
  isLock?: boolean;
  isKey?: boolean;
  isAnchor?: boolean;
  wcag_white: number;
  wcag_black: number;
  apca_white: number;
  apca_black: number;
  lab_d65_l: number;
  hex: string;
}

// Shared Palette interface
interface BasePalette {
  id: number;
  semantic: string;
  swatches: Swatch[];
  stepsDeltaE: number;
  tweenSpace: string;
  destinationSpace: string;
}

export interface Model {
  values: BasePalette[];
}

export interface Delegate {
  optimization: string;
  contrast: string;
  editing: BasePalette | null;
}

export interface PaletteConfig {
  index: number;
  semantic: string;
  keys: string[] | null;
}
