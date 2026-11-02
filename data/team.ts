export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  /** Portrait path under /public (4:5 crop). Leave empty to show the placeholder. */
  image?: string;
}

// Placeholder entries — replace name, role, credentials and image with real team data.
export const TEAM_MEMBERS: TeamMember[] = Array.from({ length: 12 }, (_, i) => ({
  id: `member-${i + 1}`,
  name: 'Full name',
  role: 'Designation',
  credentials: 'Qualification · Institute',
}));

export const TEAM_COPY = {
  eyebrow: 'Our team',
  title: 'The people behind the light',
  lead: 'An in-house team of lighting designers, engineers and project specialists who share one commitment — better light, designed with intent.',
  body: 'From the first layout to the final fixture on site, the same people who engineer our products help you specify them, so every project is backed by real technical depth.',
} as const;
