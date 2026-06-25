import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const DRAPE_SECTION = 'Hanging';
const DRAPE_SERIES = 'Drape';
const DRAPE_SKU = 'SF-HG';

export const DRAPE_PRODUCTS: Product[] = [
  {
    id: 'hg-descent',
    slug: 'descent',
    name: 'Descent',
    vendorCode: 'SFDL-33',
    category: 'surface',
    family: 'surface',
    seriesName: DRAPE_SERIES,
    section: DRAPE_SECTION,
    skuPrefix: DRAPE_SKU,
    subcategory: DRAPE_SECTION,
    shortSpec: '3 + 5W • Hanging • Black Finish',
    description:
      'Descent is a hanging surface downlight with dual 3W and 5W output in a slim black housing for pendant-style accent lighting.',
    price: 1250,
    specs: {
      Classification: 'Hanging',
      'Fixture Color': 'BK',
      'Product Codes': 'SF-HG-DS-08',
    },
    dimensionVariants: [
      {
        productCode: 'SF-HG-DS-08',
        wattage: '3 + 5W',
        fixtureColor: 'BK',
        cost: 1250,
        cct: '',
        driverSupport: '',
        outerDiameter: '40',
        height: '185',
        cutOut: '',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
  {
    id: 'hg-pendulo',
    slug: 'pendulo',
    name: 'Pendulo',
    vendorCode: 'SFDL-37',
    category: 'surface',
    family: 'surface',
    seriesName: DRAPE_SERIES,
    section: DRAPE_SECTION,
    skuPrefix: DRAPE_SKU,
    subcategory: DRAPE_SECTION,
    shortSpec: '10W • Hanging • WH / BK / GMBK / RSGL',
    description:
      'Pendulo is a 10W hanging surface downlight with multiple premium finish options for decorative pendant applications.',
    price: 1350,
    specs: {
      Classification: 'Hanging',
      'Fixture Color': 'WH / BK / GMBK / RSGL',
      'Product Codes': 'SF-HG-PD-10',
    },
    dimensionVariants: [
      {
        productCode: 'SF-HG-PD-10',
        wattage: '10W',
        fixtureColor: 'WH / BK / GMBK / RSGL',
        cost: 1350,
        cct: '',
        driverSupport: '',
        outerDiameter: '80',
        height: '120',
        cutOut: '',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
