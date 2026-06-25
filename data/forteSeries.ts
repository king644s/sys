import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const FORTE_SECTION = 'Commercial / High Wattage';
const FORTE_SERIES = 'Forte';
const FORTE_SKU = 'SL-HW';

export const FORTE_PRODUCTS: Product[] = [
  {
    id: 'hw-surge',
    slug: 'surge',
    name: 'Surge',
    vendorCode: 'SPL-216',
    category: 'cob-spotlight',
    family: 'cob-spotlight',
    seriesName: FORTE_SERIES,
    section: FORTE_SECTION,
    skuPrefix: FORTE_SKU,
    subcategory: FORTE_SECTION,
    shortSpec: '32W • Commercial • Warm White • Both Driver',
    description:
      'Surge is a high-wattage commercial showroom spotlight delivering 32W warm white output for display and retail applications.',
    price: 750,
    specs: {
      Type: 'Commercial Fittings',
      Classification: 'Commercial / High Wattage',
      'Additional Features': 'Showroom Type',
      'CCT Options': 'Warm White',
      'Driver Support': 'Both',
      'Fixture Color': 'WH',
      'Product Codes': 'SL-HW-SR-32',
    },
    dimensionVariants: [
      {
        productCode: 'SL-HW-SR-32',
        wattage: '32W',
        fixtureColor: 'WH',
        cost: 750,
        cct: 'Warm White',
        driverSupport: 'Both',
        outerDiameter: '88',
        height: '140',
        cutOut: '80',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
  {
    id: 'hw-titan',
    slug: 'titan',
    name: 'Titan',
    vendorCode: 'SPL-217',
    category: 'cob-spotlight',
    family: 'cob-spotlight',
    seriesName: FORTE_SERIES,
    section: FORTE_SECTION,
    skuPrefix: FORTE_SKU,
    subcategory: FORTE_SECTION,
    shortSpec: '30W • Commercial • Neutral White • Both Driver',
    description:
      'Titan is a 30W commercial showroom spotlight with neutral white output for high-impact retail and exhibition lighting.',
    price: 700,
    specs: {
      Type: 'Commercial Fittings',
      Classification: 'Commercial / High Wattage',
      'Additional Features': 'Showroom Type',
      'CCT Options': 'Neutral White',
      'Driver Support': 'Both',
      'Fixture Color': 'WH',
      'Product Codes': 'SL-HW-TT-30',
    },
    dimensionVariants: [
      {
        productCode: 'SL-HW-TT-30',
        wattage: '30W',
        fixtureColor: 'WH',
        cost: 700,
        cct: 'Neutral White',
        driverSupport: 'Both',
        outerDiameter: '110',
        height: '120',
        cutOut: '100',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
