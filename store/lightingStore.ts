import { create } from 'zustand';

export const KELVIN_PRESET_RANGES = {
  relax: { min: 2700, max: 3399, label: 'Warm Amber Sunset' },
  focus: { min: 3400, max: 5299, label: 'Neutral Architectural Studio' },
  daylight: { min: 5300, max: 6500, label: 'Cool Sky Daylight' },
} as const;

export type KelvinPreset = keyof typeof KELVIN_PRESET_RANGES;

export function getPresetFromKelvin(temp: number): KelvinPreset {
  if (temp <= KELVIN_PRESET_RANGES.relax.max) return 'relax';
  if (temp <= KELVIN_PRESET_RANGES.focus.max) return 'focus';
  return 'daylight';
}

export function getKelvinProfileLabel(temp: number): string {
  return KELVIN_PRESET_RANGES[getPresetFromKelvin(temp)].label;
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
  relax: 2700,
  focus: 4000,
  daylight: 6500,
};

export const useLightingStore = create<LightingState>((set) => ({
  kelvin: 3000,
  activePreset: 'relax',
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
