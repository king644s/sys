'use client';

import React from 'react';
import { useLightingStore } from '../../store/lightingStore';

export function KelvinSlider() {
  const { kelvin, setKelvin, activePreset, setPreset } = useLightingStore();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKelvin(Number(e.target.value));
  };

  const currentLabel = () => {
    if (kelvin <= 3000) return 'Warm Amber Sunset';
    if (kelvin <= 4500) return 'Neutral Architectural Studio';
    return 'Cool Sky Daylight';
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6" id="kelvin-slider-panel">
      {/* Current Selection Indicators */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-ghost">
            Active Profile
          </span>
          <span className="font-sans text-md font-medium text-white ring-offset-void">
            {currentLabel()}
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
          min="2700"
          max="6500"
          step="50"
          value={kelvin}
          onChange={handleSliderChange}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold/30 bg-transparent"
          style={{
            background: 'linear-gradient(to right, #FF9225 0%, #FAFAF8 40%, #A6CEFF 100%)'
          }}
          aria-label="Color Temperature Kelvin Slider"
        />
        
        {/* Underlay glow tracks */}
        <div 
          className="absolute inset-0 -z-10 h-1.5 top-1/2 -translate-y-1/2 rounded-full blur-md opacity-35 transition-colors duration-300"
          style={{
            background: kelvin < 4000 
              ? 'rgba(255,146,37,0.4)' 
              : kelvin < 5500 
                ? 'rgba(250,250,248,0.3)' 
                : 'rgba(158,206,255,0.4)'
          }}
        />
      </div>

      {/* Human Labels */}
      <div className="flex justify-between text-[11px] font-mono uppercase tracking-widest text-text-dim">
        <span>Warm Relax (2700K)</span>
        <span>Cool Daylight (6500K)</span>
      </div>

      {/* Multi-mood Preset Toggles */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <button
          onClick={() => setPreset('relax')}
          className={`py-2 px-3 tracking-wider font-sans text-[10px] uppercase transition-all duration-300 border ${
            activePreset === 'relax' 
              ? 'bg-gold/10 border-gold text-gold' 
              : 'border-border text-text-dim hover:text-white hover:border-border-mid'
          }`}
        >
          Relax (2700K)
        </button>
        <button
          onClick={() => setPreset('focus')}
          className={`py-2 px-3 tracking-wider font-sans text-[10px] uppercase transition-all duration-300 border ${
            activePreset === 'focus' 
              ? 'bg-cream/5 border-cream/50 text-cream' 
              : 'border-border text-text-dim hover:text-white hover:border-border-mid'
          }`}
        >
          Studio (4000K)
        </button>
        <button
          onClick={() => setPreset('daylight')}
          className={`py-2 px-3 tracking-wider font-sans text-[10px] uppercase transition-all duration-300 border ${
            activePreset === 'daylight' 
              ? 'bg-[#2D68C4]/10 border-[#2D68C4]/40 text-[#2D68C4]' 
              : 'border-border text-text-dim hover:text-white hover:border-border-mid'
          }`}
        >
          Daylight (6500K)
        </button>
      </div>
    </div>
  );
}
