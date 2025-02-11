import { create } from 'zustand';
import PaletteModel from '../models/PaletteModel';
import type { Delegate, Model } from '../shared.types';

interface PaletteStore {
  delegate: Delegate;
  model: Model | null; // Making model nullable
  setDelegate: (delegate: Delegate) => void;
  setModel: (model: Model) => void;
}

const initialDelegate: Delegate = {
  optimization: 'Universal',
  contrast: 'CIE L* (d65)',
  editing: null,
};

export const usePaletteStore = create<PaletteStore>((set) => ({
  delegate: initialDelegate,
  model: null,
  setDelegate: (delegate) => set({ delegate }),
  setModel: (model) => set({ model }),
}));
