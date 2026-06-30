import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const DUO_SECTION = 'Dual';
const DUO_SERIES = 'Duo';
const DUO_SKU = 'SF-DO';

export const DUO_PRODUCTS: Product[] = [
  {
    id: 'do-diplex',
    slug: 'diplex',
    name: 'Diplex',
    vendorCode: 'SFDL-29',
    category: 'surface',
    family: 'surface',
    seriesName: DUO_SERIES,
    section: DUO_SECTION,
    skuPrefix: DUO_SKU,
    subcategory: DUO_SECTION,
    shortSpec: '15 x 2W • Dual Surface • W/BK • 96°',
    description:
      'Diplex is a dual-emitter surface downlight with twin 15W outputs for balanced paired accent lighting.',
    price: 800,
    specs: {
      Classification: 'Dual',
      'Additional Features': '96° Angle',
      'Fixture Color': 'W/BK',
      'Product Codes': 'SF-DO-DI-30',
    },
    dimensionVariants: [
      {
        productCode: 'SF-DO-DI-30',
        wattage: '15 x 2W',
        fixtureColor: 'W/BK',
        cost: 800,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '96',
        height: '38',
        cutOut: '147 x 76',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
  {
    id: 'do-binova',
    slug: 'binova',
    name: 'Binova',
    vendorCode: 'SFDL-40-D',
    category: 'surface',
    family: 'surface',
    seriesName: DUO_SERIES,
    section: DUO_SECTION,
    skuPrefix: DUO_SKU,
    subcategory: DUO_SECTION,
    shortSpec: '12 x 2W • Dual Surface • W/BK • 38°',
    description:
      'Binova is a rectangular dual surface downlight with twin 12W emitters for architectural paired lighting layouts.',
    specs: {
      Classification: 'Dual',
      'Additional Features': '38° Angle',
      'Fixture Color': 'W/BK',
      'Product Codes': 'SF-DO-BN-24',
    },
    dimensionVariants: [
      {
        productCode: 'SF-DO-BN-24',
        wattage: '12 x 2W',
        fixtureColor: 'W/BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '112 x 224',
        height: '55',
        cutOut: '',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
  {
    id: 'do-dival',
    slug: 'dival',
    name: 'Dival',
    vendorCode: 'SFDL-43-TWIN',
    category: 'surface',
    family: 'surface',
    seriesName: DUO_SERIES,
    section: DUO_SECTION,
    skuPrefix: DUO_SKU,
    subcategory: DUO_SECTION,
    shortSpec: '12 x 2W • Dual Surface • BK + GLD/RG • 35°',
    description:
      'Dival is a premium twin surface downlight with black and gold or rose-gold finish options for high-end interiors.',
    price: 1650,
    specs: {
      Classification: 'Dual',
      'Additional Features': '35° Angle',
      'Fixture Color': 'BK + GLD / RG',
      'Product Codes': 'SF-DO-DV-24',
    },
    dimensionVariants: [
      {
        productCode: 'SF-DO-DV-24',
        wattage: '12 x 2W',
        fixtureColor: 'BK + GLD / RG',
        cost: 1650,
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '35',
        height: '36',
        cutOut: '71 x 250',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
