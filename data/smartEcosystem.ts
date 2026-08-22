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
    title: 'App Control',
    description: 'Control from anywhere using the Smartlife App.',
    image:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=600&auto=format&fit=crop',
    icon: Smartphone,
  },
  {
    id: 'voice',
    title: 'Voice Control',
    description: 'Works with Alexa, Google Assistant & Siri.',
    image: '/images/home-automation/third-section/alexa.webp',
    icon: Mic2,
  },
  {
    id: 'touch',
    title: 'Touch Panels',
    description: 'Elegant touch panels for smart control.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    icon: PanelTop,
  },
  {
    id: 'switches',
    title: 'Traditional Switches',
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
    title: 'Smart Switches',
    subtitle: 'NOVA & VERO Series',
    image: '/toggle/toggle-2.webp',
    icon: Lightbulb,
    href: ROUTES.products,
  },
  {
    id: 'security',
    title: 'Smart Security',
    subtitle: 'Locks, CCTV, Alarm',
    image: '/images/home-automation/solutions/smart-lock.jpg',
    icon: Shield,
    href: ROUTES.products,
  },
  {
    id: 'lighting',
    title: 'Smart Lights',
    subtitle: 'Tunable CCT & Dimming',
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=600&auto=format&fit=crop',
    icon: Sun,
    href: ROUTES.smartLights,
  },
  {
    id: 'sensors',
    title: 'Smart Sensors',
    subtitle: 'Motion & Presence',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    icon: Radio,
    href: ROUTES.products,
  },
];

export const ECOSYSTEM_CYCLE_MS = 3200;

export const ECOSYSTEM_COPY = {
  title: 'Everything Works Beautifully Together',
  body: 'All your smart devices and systems are designed to connect, communicate and create the perfect experience for you.',
} as const;

export interface EcosystemPillar {
  id: string;
  label: string;
  cue: string;
  icon: LucideIcon;
}

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  { id: 'integration', label: 'Seamless Integration', cue: 'One fabric', icon: Atom },
  { id: 'control', label: 'Centralized Control', cue: 'One command', icon: Lightbulb },
  { id: 'energy', label: 'Energy Efficiency', cue: 'Less wattage', icon: Zap },
  { id: 'scale', label: 'Scalable Solutions', cue: 'Room to estate', icon: Fingerprint },
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
  { id: 'curtains', label: 'Smart Curtains', cue: 'Daylight harvested', icon: Blinds, angle: -90 },
  { id: 'locks', label: 'Smart Locks', cue: 'Access granted', icon: Lock, angle: -50 },
  { id: 'cctv', label: 'CCTV Cameras', cue: 'Perimeter live', icon: Cctv, angle: -10 },
  { id: 'alarm', label: 'Security Alarm', cue: 'System armed', icon: Shield, angle: 30 },
  { id: 'energy', label: 'Energy Management', cue: 'Load balanced', icon: Leaf, angle: 70 },
  { id: 'music', label: 'Music & Entertainment', cue: 'Rooms linked', icon: Music2, angle: 110 },
  { id: 'climate', label: 'Climate Control', cue: '24°C · quiet', icon: Thermometer, angle: 150 },
  { id: 'voice', label: 'Voice Control', cue: 'Listening', icon: Mic, angle: 190 },
  { id: 'lighting', label: 'Smart Lighting', cue: '2700–6000K', icon: Lightbulb, angle: 230 },
];
