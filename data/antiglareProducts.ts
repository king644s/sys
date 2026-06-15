import { Category, Product } from '../types';

const spl144Out = '/assets/Antiglare/SPL - 144/SPL 144 - 1-Photoroom out.png';
const spl144_2 = '/assets/Antiglare/SPL - 144/SPL 144 - 2-Photoroom.png';
const spl144_3 = '/assets/Antiglare/SPL - 144/SPL 144 - 3-Photoroom.png';

const spl212_1 = '/assets/Antiglare/SPL - 212/SPL 212 - 1-Photoroom.png';
const spl212_2 = '/assets/Antiglare/SPL - 212/SPL 212 - 2-Photoroom.png';
const spl212Out = '/assets/Antiglare/SPL - 212/SPL 212 - 3-Photoroom out.png';

const spl214_1 = '/assets/Antiglare/SPL - 214/SPL 214 - 1-Photoroom.png';
const spl214Out = '/assets/Antiglare/SPL - 214/SPL 214 - 2-Photoroom out.png';
const spl214_3 = '/assets/Antiglare/SPL - 214/SPL 214 - 3-Photoroom.png';

const spl227_1 = '/assets/Antiglare/SPL - 227/SPL 227 - 1-Photoroom.png';
const spl227_2 = '/assets/Antiglare/SPL - 227/SPL 227 - 2-Photoroom.png';
const spl227Out = '/assets/Antiglare/SPL - 227/SPL 227 - 3-Photoroom out.png';

export const ANTIGLARE_CATEGORY: Category = {
  slug: 'antiglare',
  name: 'Antiglare',
  count: 4,
  description:
    'Recessed antiglare downlights with deep black baffle optics for superior visual comfort and minimal glare in architectural interiors.',
  image: spl144Out,
  has3D: false,
  type: 'indoor',
};

export const ANTIGLARE_PRODUCTS: Product[] = [
  {
    id: 'spl-144',
    slug: 'spl-144',
    name: 'SPL-144',
    vendorCode: 'SPL-144',
    category: 'antiglare',
    subcategory: 'Antiglare Downlight',
    shortSpec: 'Recessed • Antiglare Baffle • COB LED • Deep Cutoff',
    description:
      'Architectural recessed antiglare downlight with a deep black baffle and clean white trim. Engineered for low-glare illumination in residential and commercial ceiling applications.',
    specs: {
      Type: 'Recessed Antiglare Downlight',
      Classification: 'Indoor Architectural',
      'Optics': 'Deep Black Antiglare Baffle',
      'CRI': '>90 Ra',
      'Mounting': 'Spring-clip recessed',
    },
    images: [spl144Out, spl144_2, spl144_3],
    isBestseller: false,
  },
  {
    id: 'spl-212',
    slug: 'spl-212',
    name: 'SPL-212',
    vendorCode: 'SPL-212',
    category: 'antiglare',
    subcategory: 'Antiglare Downlight',
    shortSpec: 'Recessed • Antiglare Baffle • COB LED • Deep Cutoff',
    description:
      'Precision-engineered antiglare recessed fixture with matte black interior cone and die-cast heatsink housing. Delivers comfortable, focused light with minimal ceiling glare.',
    specs: {
      Type: 'Recessed Antiglare Downlight',
      Classification: 'Indoor Architectural',
      'Optics': 'Deep Black Antiglare Baffle',
      'CRI': '>90 Ra',
      'Mounting': 'Spring-clip recessed',
    },
    images: [spl212Out, spl212_1, spl212_2],
    isBestseller: false,
  },
  {
    id: 'spl-214',
    slug: 'spl-214',
    name: 'SPL-214',
    vendorCode: 'SPL-214',
    category: 'antiglare',
    subcategory: 'Antiglare Downlight',
    shortSpec: 'Recessed • Antiglare Baffle • COB LED • Deep Cutoff',
    description:
      'Low-glare recessed downlight featuring a dark-light reflector system and finned aluminium heatsink. Ideal for luxury living spaces, hospitality, and gallery environments.',
    specs: {
      Type: 'Recessed Antiglare Downlight',
      Classification: 'Indoor Architectural',
      'Optics': 'Deep Black Antiglare Baffle',
      'CRI': '>90 Ra',
      'Mounting': 'Spring-clip recessed',
    },
    images: [spl214Out, spl214_1, spl214_3],
    isBestseller: false,
  },
  {
    id: 'spl-227',
    slug: 'spl-227',
    name: 'SPL-227',
    vendorCode: 'SPL-227',
    category: 'antiglare',
    subcategory: 'Antiglare Downlight',
    shortSpec: 'Recessed • Antiglare Baffle • COB LED • Deep Cutoff',
    description:
      'Premium antiglare recessed luminaire with white bezel trim and deep cutoff optics. Designed for architects seeking refined ceiling aesthetics with exceptional visual comfort.',
    specs: {
      Type: 'Recessed Antiglare Downlight',
      Classification: 'Indoor Architectural',
      'Optics': 'Deep Black Antiglare Baffle',
      'CRI': '>90 Ra',
      'Mounting': 'Spring-clip recessed',
    },
    images: [spl227Out, spl227_1, spl227_2],
    isBestseller: false,
  },
];
