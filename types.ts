export interface DimensionVariant {
  productCode: string;
  wattage: string;
  fixtureColor: string;
  cost?: number;
  cct: string;
  driverSupport: string;
  outerDiameter: string;
  height: string;
  cutOut: string;
}

export interface ProductFinish {
  id: string;
  label: string;
  swatch: string;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  /** Catalog family slug — used for product listing filters */
  family?: string;
  /** Series name from final naming list (e.g. Latch, Veil, Twin) */
  seriesName?: string;
  /** Section / subsection from final naming list (e.g. Front Removable Spotlight) */
  section?: string;
  /** SKU prefix from final naming list (e.g. SL-FR, DP-ND) */
  skuPrefix?: string;
  vendorCode?: string;
  shortSpec: string;
  description: string;
  price?: number;
  specs: Record<string, string>;
  dimensionVariants?: DimensionVariant[];
  images: string[];
  finishes?: ProductFinish[];
  isBestseller?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
  description: string;
  image: string;
  has3D: boolean;
  type: 'indoor' | 'outdoor';
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  category: 'RESIDENTIAL' | 'HOSPITALITY' | 'COMMERCIAL' | 'OFFICES' | 'RETAIL';
  image: string;
}
