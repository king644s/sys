import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const BLADE_SECTION = 'Laser';
const BLADE_SERIES = 'Blade';
const BLADE_SKU = 'SF-LZ';

export const BLADE_PRODUCTS: Product[] = [
  {
    id: 'lz-tine',
    slug: 'tine',
    name: 'Tine',
    vendorCode: 'SFDL-39',
    category: 'surface',
    family: 'surface',
    seriesName: BLADE_SERIES,
    section: BLADE_SECTION,
    skuPrefix: BLADE_SKU,
    subcategory: BLADE_SECTION,
    shortSpec: '12–15W • Surface Laser • WH/BK',
    description:
      'Tine is a surface-mounted linear laser downlight available in 12W to 15W with white or black finish.',
    price: 490,
    specs: {
      Classification: 'Laser',
      'Fixture Color': 'WH/BK',
      'Product Codes': 'SF-LZ-TN-12',
    },
    dimensionVariants: [
      {
        productCode: 'SF-LZ-TN-12',
        wattage: '12–15W',
        fixtureColor: 'WH/BK',
        cost: 490,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '81',
        height: '30',
        cutOut: '155 x 32.5',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
