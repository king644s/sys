import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const MURAL_SECTION = 'Wall Washer';
const MURAL_SERIES = 'Mural';
const MURAL_SKU = 'SF-SW';

export const MURAL_PRODUCTS: Product[] = [
  {
    id: 'sw-sweep',
    slug: 'sweep',
    name: 'Sweep',
    vendorCode: 'SFDL-44',
    category: 'surface',
    family: 'surface',
    seriesName: MURAL_SERIES,
    section: MURAL_SECTION,
    skuPrefix: MURAL_SKU,
    subcategory: MURAL_SECTION,
    shortSpec: '9W • Surface Wall Washer • WH/BK',
    description:
      'Sweep is a 9W surface-mounted wall washer for smooth vertical illumination on feature walls and architectural surfaces.',
    price: 375,
    specs: {
      Classification: 'Wall Washer',
      'Fixture Color': 'WH/BK',
      'Product Codes': 'SF-SW-SW-09',
    },
    dimensionVariants: [
      {
        productCode: 'SF-SW-SW-09',
        wattage: '9W',
        fixtureColor: 'WH/BK',
        cost: 375,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '40',
        height: '90',
        cutOut: '',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
