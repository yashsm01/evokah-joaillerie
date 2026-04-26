export interface Product {
  id: number;
  name: string;
  category: string;
  style: ProductStyle;
  tag?: string;
  basePrice: number;
  metals: MetalType[];
  shapes: string[];
  img: string;
  metalImages?: Partial<Record<MetalType, string>>;  // per-metal image overrides
  priceGroup: PriceGroup;
  collection: 'engagement' | 'wedding';
  description?: string;
  slug?: string;
}

export type ProductStyle =
  | 'all'
  | 'solitaire'
  | 'halo'
  | 'pave'
  | 'knot'
  | 'cluster'
  | 'blossom'
  | 'eternity'
  | 'plain'
  | 'patterned'
  | 'contour';

export type MetalType =
  | 'yellow-gold'
  | 'white-gold'
  | 'rose-gold'
  | 'platinum';

export type PriceGroup =
  | 'under3000'
  | '3000-5000'
  | '5000-10000'
  | 'over10000';

export const METAL_LABELS: Record<MetalType, string> = {
  'yellow-gold': 'Yellow Gold',
  'white-gold':  'White Gold',
  'rose-gold':   'Rose Gold',
  'platinum':    'Platinum',
};

export interface ProductFilters {
  style: ProductStyle | 'all';
  metal: MetalType | 'all';
  priceGroup: PriceGroup | 'all';
  sort: SortOption;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export interface Review {
  author: string;
  text: string;
  date: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
