import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const BARREL_SECTION = 'Niche / Bullet Spotlight';
const BARREL_SERIES = 'Barrel';
const BARREL_SKU = 'SL-BL';

export const BARREL_PRODUCTS: Product[] = [
  {
    id: 'bl-bolt',
    slug: 'bl-bolt',
    name: 'Bolt',
    vendorCode: 'SMSPL-28',
    category: 'cob-spotlight',
    family: 'cob-spotlight',
    seriesName: BARREL_SERIES,
    section: BARREL_SECTION,
    skuPrefix: BARREL_SKU,
    subcategory: BARREL_SECTION,
    shortSpec: '3W / 5W • Niche Bullet • WH / BK / GMBK',
    description:
      'Bolt is a compact niche bullet spotlight for tight cutouts, available in 3W and 5W with multiple finish options.',
    price: 285,
    specs: {
      Classification: 'Niche / Bullet Spotlight',
      'Driver Support': 'None',
      'Fixture Color': 'WH / BK / GMBK',
      'Product Codes': 'SL-BL-BT-03 / SL-BL-BT-05',
    },
    dimensionVariants: [
      {
        productCode: 'SL-BL-BT-03',
        wattage: '3W',
        fixtureColor: 'WH / BK / GMBK',
        cost: 285,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: 'None',
        outerDiameter: '20',
        height: '56',
        cutOut: '18',
      },
      {
        productCode: 'SL-BL-BT-03',
        wattage: '3W',
        fixtureColor: 'WH / BK / GMBK',
        cost: 310,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: 'None',
        outerDiameter: '28',
        height: '56',
        cutOut: '25',
      },
      {
        productCode: 'SL-BL-BT-05',
        wattage: '5W',
        fixtureColor: 'WH / BK / GMBK',
        cost: 385,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: 'None',
        outerDiameter: '',
        height: '',
        cutOut: '',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
  {
    id: 'bl-spire',
    slug: 'spire',
    name: 'Spire',
    vendorCode: 'SMSPL-29',
    category: 'cob-spotlight',
    family: 'cob-spotlight',
    seriesName: BARREL_SERIES,
    section: BARREL_SECTION,
    skuPrefix: BARREL_SKU,
    subcategory: BARREL_SECTION,
    shortSpec: '3W • Niche Bullet • WH / BK / GMBK',
    description:
      'Spire is a tall-profile niche bullet spotlight for micro cutout applications with a compact 3W output.',
    price: 415,
    specs: {
      Classification: 'Niche / Bullet Spotlight',
      'Driver Support': 'None',
      'Fixture Color': 'WH / BK / GMBK',
      'Product Codes': 'SL-BL-SP-03',
    },
    dimensionVariants: [
      {
        productCode: 'SL-BL-SP-03',
        wattage: '3W',
        fixtureColor: 'WH / BK / GMBK',
        cost: 415,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: 'None',
        outerDiameter: '20',
        height: '62',
        cutOut: '18',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
