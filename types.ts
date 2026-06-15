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

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  vendorCode?: string;
  shortSpec: string;
  description: string;
  price?: number;
  specs: Record<string, string>;
  dimensionVariants?: DimensionVariant[];
  images: string[];
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
