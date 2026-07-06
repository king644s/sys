import { create } from 'zustand';

export const KELVIN_PRESET_RANGES = {
  warm: { min: 3000, max: 3999, label: 'Warm White' },
  natural: { min: 4000, max: 5999, label: 'Natural White' },
  cool: { min: 6000, max: 6000, label: 'Cool White' },
} as const;

export type KelvinPreset = keyof typeof KELVIN_PRESET_RANGES;

export function getPresetFromKelvin(temp: number): KelvinPreset {
  if (temp <= KELVIN_PRESET_RANGES.warm.max) return 'warm';
  if (temp <= KELVIN_PRESET_RANGES.natural.max) return 'natural';
  return 'cool';
}

export function getKelvinProfileLabel(temp: number): string {
  return KELVIN_PRESET_RANGES[getPresetFromKelvin(temp)].label;
}

export function getKelvinHexColor(temp: number): string {
  if (temp <= 4000) {
    const ratio = Math.max(0, Math.min(1, (temp - 3000) / (4000 - 3000)));
    const r = Math.round(255 + (249 - 255) * ratio);
    const g = Math.round(249 + (247 - 249) * ratio);
    const b = Math.round(216 + (248 - 216) * ratio);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } else {
    const ratio = Math.max(0, Math.min(1, (temp - 4000) / (6000 - 4000)));
    const r = Math.round(249 + (244 - 249) * ratio);
    const g = Math.round(247 + (253 - 247) * ratio);
    const b = Math.round(248 + (255 - 248) * ratio);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}

interface LightingState {
  kelvin: number;
  activePreset: KelvinPreset;
  setKelvin: (temp: number) => void;
  setPreset: (preset: KelvinPreset) => void;
  selectedCategorySlug: string | null;
  setSelectedCategory: (slug: string | null) => void;
}

const PRESET_KELVIN: Record<KelvinPreset, number> = {
  warm: 3000,
  natural: 4000,
  cool: 6000,
};

export const useLightingStore = create<LightingState>((set) => ({
  kelvin: 3000,
  activePreset: 'warm',
  setKelvin: (temp) =>
    set({
      kelvin: temp,
      activePreset: getPresetFromKelvin(temp),
    }),
  setPreset: (preset) =>
    set({
      activePreset: preset,
      kelvin: PRESET_KELVIN[preset],
    }),
  selectedCategorySlug: null,
  setSelectedCategory: (slug) => set({ selectedCategorySlug: slug }),
}));
