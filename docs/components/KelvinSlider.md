# KelvinSlider Component Documentation

## Purpose
The `KelvinSlider` provides an interactive color temperature range controller (from 2700K to 6500K). It updates global lighting state variables (Kelvin values and profile labels) used in other CCT simulation modules.

## When to Use
- Smart Living and CCT customizer showcases.
- Control dashboards representing warm/cool lighting changes.

## When Not to Use
- Static galleries where lighting customization is disabled.

## Variants
- Features built-in preset shortcuts: "Relax" (2700K), "Studio" (4000K), and "Daylight" (6500K).

## Props
- This component consumes state variables directly from the lighting store and does not receive custom props.

## Accessibility
- Input element is keyboard navigable using Left and Right arrow keys.
- Associated with a descriptive screen-reader identifier (`aria-label="Color Temperature Kelvin Slider"`).
- Keyboard focused rings are enabled (`focus-visible:ring-2 focus-visible:ring-gold`).

## Responsive Behavior
- Layout components wrap smoothly across mobile views. Preset buttons convert to 3 columns.

## Example Usage
```tsx
import { KelvinSlider } from '@/components/ui/KelvinSlider';

export default function SmartLivingView() {
  return (
    <div className="p-8 bg-surface rounded-md">
      <KelvinSlider />
    </div>
  );
}
```

## Best Practices
- Load beside other interactive showcases so users can immediately see visual feedback when Kelvin values change.

## Common Mistakes
- Overriding store bindings manually. Rely on global Zustand state handles.
