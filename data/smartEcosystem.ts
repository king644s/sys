import type { LucideIcon } from 'lucide-react';
import {
  Smartphone,
  Mic2,
  PanelTop,
  ToggleLeft,
  Lightbulb,
  LayoutGrid,
  Shield,
  Sofa,
  Building2,
  Sun,
  Radio,
  TreePine,
  Zap,
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
    image:
      'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=600&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1565538810844-1e1194826736?q=80&w=600&auto=format&fit=crop',
    icon: Lightbulb,
    href: ROUTES.products,
  },
  {
    id: 'panels',
    title: 'Smart Panels',
    subtitle: 'AURIS LCD',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    icon: LayoutGrid,
    href: ROUTES.products,
  },
  {
    id: 'security',
    title: 'Smart Security',
    subtitle: 'Locks, CCTV, Alarm',
    image:
      'https://images.unsplash.com/photo-1558003409-0e6fcdeb5885?q=80&w=600&auto=format&fit=crop',
    icon: Shield,
    href: ROUTES.products,
  },
  {
    id: 'comfort',
    title: 'Smart Comfort',
    subtitle: 'Curtains, Aroma, Music',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
    icon: Sofa,
    href: ROUTES.products,
  },
  {
    id: 'hospitality',
    title: 'Smart Hospitality',
    subtitle: 'Hotel Automation',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
    icon: Building2,
    href: ROUTES.projects,
  },
  {
    id: 'lighting',
    title: 'Smart Lighting',
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
  {
    id: 'outdoor',
    title: 'Smart Outdoor',
    subtitle: 'Garden & Facade',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
    icon: TreePine,
    href: ROUTES.products,
  },
  {
    id: 'automation',
    title: 'Smart Automation',
    subtitle: 'Scenes & Routines',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop',
    icon: Zap,
    href: ROUTES.products,
  },
];
