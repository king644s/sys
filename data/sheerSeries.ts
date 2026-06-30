import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';

const SHEER_SECTION = 'Rimless';
const SHEER_SERIES = 'Sheer';
const SHEER_SKU = 'SF-RM';

export const SHEER_PRODUCTS: Product[] = [
  {
    id: 'rm-rimless-round',
    slug: 'rimless-round',
    name: 'Rimless Round',
    vendorCode: 'SFDL-RIMLESS',
    category: 'surface',
    family: 'surface',
    seriesName: SHEER_SERIES,
    section: SHEER_SECTION,
    skuPrefix: SHEER_SKU,
    subcategory: SHEER_SECTION,
    shortSpec: '8W / 15W / 18W • Rimless Round • WH / BK',
    description:
      'Rimless Round is a surface-mounted rimless downlight in round format, available in 8W, 15W, and 18W with white or black finish.',
    specs: {
      Classification: 'Rimless',
      'Fixture Color': 'WH / BK',
      'Product Codes': 'SF-RM-RD-08 / SF-RM-RD-15 / SF-RM-RD-18',
    },
    dimensionVariants: [
      {
        productCode: 'SF-RM-RD-08',
        wattage: '8W',
        fixtureColor: 'WH / BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '102',
        height: '-',
        cutOut: '-',
      },
      {
        productCode: 'SF-RM-RD-15',
        wattage: '15W',
        fixtureColor: 'WH / BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '127',
        height: '-',
        cutOut: '-',
      },
      {
        productCode: 'SF-RM-RD-18',
        wattage: '18W',
        fixtureColor: 'WH / BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '152',
        height: '-',
        cutOut: '-',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
  {
    id: 'rm-rimless-square',
    slug: 'rimless-square',
    name: 'Rimless Square',
    vendorCode: 'SFDL-RIMLESS',
    category: 'surface',
    family: 'surface',
    seriesName: SHEER_SERIES,
    section: SHEER_SECTION,
    skuPrefix: SHEER_SKU,
    subcategory: SHEER_SECTION,
    shortSpec: '8W / 15W / 18W • Rimless Square • WH / BK',
    description:
      'Rimless Square is a surface-mounted rimless downlight in square format, available in 8W, 15W, and 18W with white or black finish.',
    specs: {
      Classification: 'Rimless',
      'Fixture Color': 'WH / BK',
      'Product Codes': 'SF-RM-SQ-08 / SF-RM-SQ-15 / SF-RM-SQ-18',
    },
    dimensionVariants: [
      {
        productCode: 'SF-RM-SQ-08',
        wattage: '8W',
        fixtureColor: 'WH / BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '102',
        height: '-',
        cutOut: '-',
      },
      {
        productCode: 'SF-RM-SQ-15',
        wattage: '15W',
        fixtureColor: 'WH / BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '127',
        height: '-',
        cutOut: '-',
      },
      {
        productCode: 'SF-RM-SQ-18',
        wattage: '18W',
        fixtureColor: 'WH / BK',
        cct: '3K/4K/5K/6K/Tuneable',
        driverSupport: '',
        outerDiameter: '152',
        height: '-',
        cutOut: '-',
      },
    ],
    images: PRODUCT_IMAGE_URIS['fr-snap'],
    isBestseller: false,
  },
];
