'use client';

import React from 'react';
import { getKelvinProfileLabel, useLightingStore, getKelvinHexColor } from '../../store/lightingStore';

const presetButtonBase =
  'h-10 px-3 rounded-sm text-[13px] font-medium transition-all duration-300 border border-border text-text-dim hover:text-cream hover:border-border-mid';

export function KelvinSlider() {
  const { kelvin, setKelvin, activePreset, setPreset } = useLightingStore();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKelvin(Number(e.target.value));
  };

  const dynamicColor = getKelvinHexColor(kelvin);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6" id="kelvin-slider-panel">
      {/* Current Selection Indicators */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="font-sans text-xs uppercase tracking-[0.08em] text-text-dim font-semibold">
            Active Profile
          </span>
          <span className="font-sans text-md font-medium text-cream">
            {getKelvinProfileLabel(kelvin)}
          </span>
        </div>
        <div className="flex items-baseline gap-1 bg-surface-alt border border-border px-3 py-1.5">
          <span className="font-mono text-lg font-bold text-gold">{kelvin}</span>
          <span className="font-mono text-xs text-text-dim">K</span>
        </div>
      </div>

      {/* The Styled Slider Track */}
      <div className="relative group py-2">
        <input
          type="range"
          min="3000"
          max="6000"
          step="50"
          value={kelvin}
          onChange={handleSliderChange}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:outline-none bg-transparent"
          style={{
            background: 'linear-gradient(to right, #FFF9D8 0%, #F9F7F8 33.3%, #F4FDFF 100%)'
          }}
          aria-label="Color Temperature Kelvin Slider"
        />
        
        {/* Underlay glow tracks */}
        <div 
          className="absolute inset-0 -z-10 h-1.5 top-1/2 -translate-y-1/2 rounded-full blur-md opacity-50 transition-colors duration-300"
          style={{
            backgroundColor: dynamicColor,
            boxShadow: `0 0 15px 4px ${dynamicColor}88`
          }}
        />
      </div>

      {/* Human Labels */}
      <div className="flex justify-between text-xs font-sans uppercase tracking-[0.08em] text-text-dim font-semibold">
        <span>Warm White (3000K)</span>
        <span>Cool White (6000K)</span>
      </div>

      {/* Multi-mood Preset Toggles */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <button
          onClick={() => setPreset('warm')}
          className={`${presetButtonBase} focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
          style={
            activePreset === 'warm'
              ? {
                  backgroundColor: 'var(--active-warm-bg)',
                  borderColor: 'var(--active-warm-border)',
                  color: 'var(--active-warm-text)',
                }
              : {}
          }
        >
          Warm White (3000K)
        </button>
        <button
          onClick={() => setPreset('natural')}
          className={`${presetButtonBase} focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
          style={
            activePreset === 'natural'
              ? {
                  backgroundColor: 'var(--active-natural-bg)',
                  borderColor: 'var(--active-natural-border)',
                  color: 'var(--active-natural-text)',
                }
              : {}
          }
        >
          Natural White (4000K)
        </button>
        <button
          onClick={() => setPreset('cool')}
          className={`${presetButtonBase} focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
          style={
            activePreset === 'cool'
              ? {
                  backgroundColor: 'var(--active-cool-bg)',
                  borderColor: 'var(--active-cool-border)',
                  color: 'var(--active-cool-text)',
                }
              : {}
          }
        >
          Cool White (6000K)
        </button>
      </div>
    </div>
  );
}
