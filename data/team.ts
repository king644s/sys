export interface TeamMember {
  id: string;
  name: string;
  /** Short title shown as the eyebrow above the name. */
  role: string;
  /** Portrait path under /public (1080×1350, 4:5). */
  image: string;
}

/** Tier 1 — shown largest. */
export const FOUNDERS: TeamMember[] = [
  {
    id: 'shobhan-savai',
    name: 'Shobhan Savai',
    role: 'Founder',
    image: '/about-us/team/shobhanSavai.webp',
  },
  {
    id: 'sunil-sanghvi',
    name: 'Sunil Sanghvi',
    role: 'Founder',
    image: '/about-us/team/sunilSanghvi.webp',
  },
];

/** Tier 2 — shown below the founders, at a smaller size. */
export const PARTNERS: TeamMember[] = [
  {
    id: 'heena-sanghvi',
    name: 'Heena Sanghvi',
    role: 'Partner',
    image: '/about-us/team/heenaSanghvi.webp',
  },
  {
    id: 'ninad-sanghvi',
    name: 'Ninad Sanghvi',
    role: 'Partner',
    image: '/about-us/team/ninadSanghvi.webp',
  },
];

/** Group photo (1350×1080 with black letterbox bars — cropped in CSS). */
export const TEAM_PHOTO = {
  src: '/about-us/team/entireTeam.webp',
  alt: 'The SYSlight team standing together at the experience centre reception',
  width: 1350,
  height: 1080,
  caption: 'At the experience centre, Goregaon West',
} as const;

export const TEAM_COPY = {
  eyebrow: 'Our team',
  title: 'The people behind the light',
  lead: 'An in-house team of lighting designers, engineers and project specialists who share one commitment — better light, designed with intent.',
  body: 'From the first layout to the final fixture on site, the same people who engineer our products help you specify them, so every project is backed by real technical depth.',
  teamLabel: 'The whole team',
} as const;
