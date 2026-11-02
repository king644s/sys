import type { LucideIcon } from 'lucide-react';
import {
  Smartphone,
  Mic2,
  PanelTop,
  ToggleLeft,
  Lightbulb,
  Shield,
  Sun,
  Radio,
  Zap,
  Blinds,
  Lock,
  Cctv,
  Leaf,
  Music2,
  Thermometer,
  Mic,
  Atom,
  Fingerprint,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export interface ControlMode {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

export interface SmartSolution {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: LucideIcon;
  href: string;
}

export const CONTROL_MODES: ControlMode[] = [
  {
    id: 'app',
    title: 'App control',
    description: 'Control from anywhere using the Smartlife App.',
    image:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=600&auto=format&fit=crop',
    icon: Smartphone,
  },
  {
    id: 'voice',
    title: 'Voice control',
    description: 'Works with Alexa, Google Assistant & Siri.',
    image: '/images/home-automation/third-section/alexa.webp',
    icon: Mic2,
  },
  {
    id: 'touch',
    title: 'Touch panels',
    description: 'Elegant touch panels for smart control.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    icon: PanelTop,
  },
  {
    id: 'switches',
    title: 'Traditional switches',
    description: 'Works with regular switches & bell switches.',
    image: '/toggle/toggle-2.webp',
    icon: ToggleLeft,
  },
];

export const VOICE_INTEGRATIONS = [
  {
    id: 'alexa',
    title: 'Alexa',
    description: 'Amazon Alexa voice assistant',
    icon: '/integrations/alexa-icon.svg',
  },
  {
    id: 'google',
    title: 'Google Home',
    description: 'Google Assistant smart home',
    icon: '/integrations/google-icon.svg',
  },
  {
    id: 'siri',
    title: 'Siri Shortcuts',
    description: 'Apple Siri & Shortcuts app',
    icon: '/integrations/siri-icon.svg',
  },
] as const;

export const SMART_SOLUTIONS: SmartSolution[] = [
  {
    id: 'switches',
    title: 'Smart switches',
    subtitle: 'NOVA & VERO Series',
    image: '/toggle/toggle-2.webp',
    icon: Lightbulb,
    href: ROUTES.products,
  },
  {
    id: 'security',
    title: 'Smart security',
    subtitle: 'Locks, CCTV, alarm',
    image: '/images/home-automation/solutions/smart-lock.jpg',
    icon: Shield,
    href: ROUTES.products,
  },
  {
    id: 'lighting',
    title: 'Smart lights',
    subtitle: 'Tunable CCT & dimming',
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=600&auto=format&fit=crop',
    icon: Sun,
    href: ROUTES.smartLights,
  },
  {
    id: 'sensors',
    title: 'Smart sensors',
    subtitle: 'Motion & presence',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    icon: Radio,
    href: ROUTES.products,
  },
];

export const ECOSYSTEM_CYCLE_MS = 3200;

export const ECOSYSTEM_COPY = {
  title: 'Everything works beautifully together',
  body: 'All your smart devices and systems are designed to connect, communicate and create the perfect experience for you.',
} as const;

export const ECOSYSTEM_MESH_COPY = {
  eyebrow: 'Connected devices',
  title: 'Every device, one network',
  intro: 'Lights, locks, cameras and climate share one hub — so a single tap or voice command reaches every room.',
  body: 'Each device talks to the others, so scenes, schedules and sensors work together instead of in separate apps.',
} as const;

export const ECOSYSTEM_SPECTRUM_COPY = {
  eyebrow: 'Smart features',
  title: 'Nine systems, one seamless home',
  body: 'From curtains to climate, every system responds to the same scenes and schedules — no separate apps to juggle.',
  footnote: 'One continuous system connecting everything in your home.',
} as const;

export interface EcosystemPillar {
  id: string;
  label: string;
  cue: string;
  icon: LucideIcon;
}

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  { id: 'integration', label: 'Seamless integration', cue: 'One fabric', icon: Atom },
  { id: 'control', label: 'Centralised control', cue: 'One command', icon: Lightbulb },
  { id: 'energy', label: 'Energy efficiency', cue: 'Less wattage', icon: Zap },
  { id: 'scale', label: 'Scalable solutions', cue: 'Room to estate', icon: Fingerprint },
];

export interface EcosystemFeature {
  id: string;
  label: string;
  cue: string;
  icon: LucideIcon;
  /** Clockwise from top. 0° = right, 90° = bottom (CSS y-down). */
  angle: number;
}

export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  { id: 'curtains', label: 'Smart curtains', cue: 'Daylight harvested', icon: Blinds, angle: -90 },
  { id: 'locks', label: 'Smart locks', cue: 'Access granted', icon: Lock, angle: -50 },
  { id: 'cctv', label: 'CCTV cameras', cue: 'Perimeter live', icon: Cctv, angle: -10 },
  { id: 'alarm', label: 'Security alarm', cue: 'System armed', icon: Shield, angle: 30 },
  { id: 'energy', label: 'Energy management', cue: 'Load balanced', icon: Leaf, angle: 70 },
  { id: 'music', label: 'Music & entertainment', cue: 'Rooms linked', icon: Music2, angle: 110 },
  { id: 'climate', label: 'Climate control', cue: '24°C · quiet', icon: Thermometer, angle: 150 },
  { id: 'voice', label: 'Voice control', cue: 'Listening', icon: Mic, angle: 190 },
  { id: 'lighting', label: 'Smart lighting', cue: '2700–6000K', icon: Lightbulb, angle: 230 },
];
