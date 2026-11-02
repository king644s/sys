import { PROJECTS } from '@/data';
import type { Project } from '@/types';

/*
 * Project case-study content. Every project page is built from `blocks`, in order,
 * so blocks can be added, removed or reordered per project.
 *
 * Media orientation:
 *   horizontal → landscape frame (16:10)
 *   vertical   → portrait frame (4:5 for images, 4:5 or 9:16 for video)
 *
 * Everything below is SAMPLE content shared by all projects. To give a project its
 * real content, add an entry to PROJECT_DETAIL_OVERRIDES keyed by its slug.
 */

export interface ProjectMedia {
  kind: 'image' | 'video';
  src: string;
  /** Still frame shown before a video plays. */
  poster?: string;
  alt: string;
  caption?: string;
  /** Short technical note shown under the caption, e.g. "Snap · 2700K · 24°". */
  meta?: string;
}

export interface ProjectFact {
  label: string;
  value: string;
}

export type ProjectBlock =
  | {
      /** One landscape and one portrait image side by side, with text and facts. */
      type: 'image-pair';
      eyebrow: string;
      title: string;
      body: string;
      horizontal: ProjectMedia;
      vertical: ProjectMedia;
      facts?: ProjectFact[];
    }
  | {
      /** One portrait and one landscape video, with text beside them. */
      type: 'video-pair';
      eyebrow: string;
      title: string;
      body: string;
      horizontal: ProjectMedia;
      vertical: ProjectMedia;
      facts?: ProjectFact[];
    }
  | {
      /** Landscape + portrait images and landscape + portrait videos together, with text and facts. */
      type: 'mixed-gallery';
      eyebrow: string;
      title: string;
      body: string;
      horizontalImage: ProjectMedia;
      verticalImage: ProjectMedia;
      horizontalVideo: ProjectMedia;
      verticalVideo: ProjectMedia;
      facts?: ProjectFact[];
    };

export interface ProjectDetail {
  summary: string;
  heroImage: string;
  facts: ProjectFact[];
  /** Product slugs used in the project, shown as product cards. */
  productSlugs: string[];
  blocks: ProjectBlock[];
}

const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&h=${h}&auto=format&fit=crop`;

const SAMPLE_VIDEO = {
  horizontal: { src: '/projects/sample/sample-horizontal.mp4', poster: '/projects/sample/sample-horizontal-poster.jpg' },
  vertical: { src: '/projects/sample/sample-vertical.mp4', poster: '/projects/sample/sample-vertical-poster.jpg' },
};

function sampleDetail(project: Project): ProjectDetail {
  return {
    summary:
      'Sample overview — describe the brief, the space and what the lighting needed to achieve. Two or three sentences work best here.',
    heroImage: project.image.replace(/w=\d+/, 'w=2000'),
    facts: [
      { label: 'Location', value: project.location },
      { label: 'Sector', value: project.category.charAt(0) + project.category.slice(1).toLowerCase() },
      { label: 'Year', value: '2025' },
      { label: 'Area', value: '12,000 sq ft' },
      { label: 'Fixtures', value: '240+' },
      { label: 'Design partner', value: 'Studio name' },
    ],
    productSlugs: ['snap', 'crest', 'axis', 'glide'],
    blocks: [
      {
        type: 'image-pair',
        eyebrow: 'The space',
        title: 'Sample heading for the first story',
        body: 'Sample text — explain the design intent for this area: what mood the client wanted, how the fixtures were placed and why. Keep it to a short paragraph.',
        horizontal: {
          kind: 'image',
          src: unsplash('photo-1600210492486-724fe5c67fb0', 1600, 1000),
          alt: 'Sample landscape photo of a lit living area',
          caption: 'Living area at dusk',
          meta: 'Sample · 2700K · 36° beam',
        },
        vertical: {
          kind: 'image',
          src: unsplash('photo-1600585154340-be6161a56a0c', 960, 1200),
          alt: 'Sample portrait photo of an accent-lit wall',
          caption: 'Accent wall detail',
          meta: 'Sample · 3000K · 24° beam',
        },
        facts: [
          { label: 'Fixtures', value: 'Snap, Crest' },
          { label: 'Colour temperature', value: '2700K – 3000K' },
          { label: 'Control', value: 'DALI dimming' },
        ],
      },
      {
        type: 'video-pair',
        eyebrow: 'In motion',
        title: 'Sample heading for the video story',
        body: 'Sample text — describe what the videos show, for example a scene change from day to evening, or how the light moves through the space as you walk in.',
        horizontal: {
          kind: 'video',
          ...SAMPLE_VIDEO.horizontal,
          alt: 'Sample landscape video walkthrough',
          caption: 'Lobby walkthrough',
          meta: 'Sample · evening scene',
        },
        vertical: {
          kind: 'video',
          ...SAMPLE_VIDEO.vertical,
          alt: 'Sample portrait video of the residence',
          caption: 'Living room scene change',
          meta: 'Sample · 4000K → 2700K',
        },
        facts: [
          { label: 'Scenes', value: '6 programmed' },
          { label: 'Dimming', value: '0.1 – 100%' },
        ],
      },
      {
        type: 'mixed-gallery',
        eyebrow: 'Details',
        title: 'Sample heading for the gallery',
        body: 'Sample text — use this block for a mix of photos and clips with their technical details, such as fixture codes, beam angles and mounting.',
        horizontalImage: {
          kind: 'image',
          src: unsplash('photo-1616594039964-ae9021a400a0', 1600, 1000),
          alt: 'Sample landscape photo of a bedroom',
          caption: 'Master bedroom',
          meta: 'Sample · Glide wall washer',
        },
        verticalVideo: {
          kind: 'video',
          ...SAMPLE_VIDEO.vertical,
          alt: 'Sample portrait video detail',
          caption: 'Staircase reveal',
          meta: 'Sample · linear profile',
        },
        verticalImage: {
          kind: 'image',
          src: unsplash('photo-1618221195710-dd6b41faaea6', 960, 1200),
          alt: 'Sample portrait photo of a dining area',
          caption: 'Dining pendant',
          meta: 'Sample · 2700K · CRI 92+',
        },
        horizontalVideo: {
          kind: 'video',
          ...SAMPLE_VIDEO.horizontal,
          alt: 'Sample landscape video detail',
          caption: 'Corridor sequence',
          meta: 'Sample · Axis spotlights',
        },
        facts: [
          { label: 'Mounting', value: 'Recessed & surface' },
          { label: 'Beam angles', value: '15° – 60°' },
          { label: 'CRI', value: '92+' },
          { label: 'Warranty', value: '3 years' },
        ],
      },
    ],
  };
}

export const PROJECT_DETAIL_OVERRIDES: Partial<Record<string, Partial<ProjectDetail>>> = {};

export function getProjectDetail(slug: string): { project: Project; detail: ProjectDetail } | null {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  return { project, detail: { ...sampleDetail(project), ...PROJECT_DETAIL_OVERRIDES[slug] } };
}
