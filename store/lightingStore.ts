import { create } from 'zustand';

interface LightingState {
  kelvin: number;
  activePreset: 'relax' | 'focus' | 'daylight' | 'custom';
  setKelvin: (temp: number) => void;
  setPreset: (preset: 'relax' | 'focus' | 'daylight') => void;
  selectedCategorySlug: string | null;
  setSelectedCategory: (slug: string | null) => void;
  cartEnquiry: string[]; // List of product IDs added for quote requests
  addToEnquiry: (id: string) => void;
  removeFromEnquiry: (id: string) => void;
}

export const useLightingStore = create<LightingState>((set) => ({
  kelvin: 3000,
  activePreset: 'relax',
  setKelvin: (temp) => set((state) => {
    let preset: 'relax' | 'focus' | 'daylight' | 'custom' = 'custom';
    if (temp === 2700) preset = 'relax';
    else if (temp === 4000) preset = 'focus';
    else if (temp === 6500) preset = 'daylight';
    return { kelvin: temp, activePreset: preset };
  }),
  setPreset: (preset) => set(() => {
    let temp = 3000;
    if (preset === 'relax') temp = 2700;
    else if (preset === 'focus') temp = 4000;
    else if (preset === 'daylight') temp = 6500;
    return { activePreset: preset, kelvin: temp };
  }),
  selectedCategorySlug: null,
  setSelectedCategory: (slug) => set({ selectedCategorySlug: slug }),
  cartEnquiry: [],
  addToEnquiry: (id) => set((state) => ({
    cartEnquiry: state.cartEnquiry.includes(id) ? state.cartEnquiry : [...state.cartEnquiry, id]
  })),
  removeFromEnquiry: (id) => set((state) => ({
    cartEnquiry: state.cartEnquiry.filter(pId => pId !== id)
  }))
}));
