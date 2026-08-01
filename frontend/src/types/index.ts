export type ProductBadge = 'sale' | 'new' | 'soldout';

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  comparePrice?: number;
  available: boolean;
  image?: string;
  color?: string;
}

export type ProductGender = 'male' | 'female' | 'unisex';

/** Storefront + admin catalog product (prices in paisa: 379900 → Rs.3,799) */
export interface CatalogProduct {
  id: string;
  handle: string;
  title: string;
  brand: string;
  gender?: ProductGender;
  price: number;
  comparePrice?: number;
  image: string;
  image2?: string;
  variants?: ProductVariant[];
  hasColors?: boolean;
  badge?: string;
  badgeType?: ProductBadge;
  discount?: number;
  inStock?: boolean;
}

/** @deprecated Use CatalogProduct */
export type Product = CatalogProduct;

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest';

export interface CollectionFiltersState {
  brands: string[];
  genders: ProductGender[];
  minPrice: number;
  maxPrice: number;
  onSaleOnly: boolean;
  inStockOnly: boolean;
  sort: SortOption;
  query: string;
}

export type UserRole = 'admin' | 'customer';
export type UserStatus = 'active' | 'inactive';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  orders: number;
  joinedAt: string;
  avatar?: string;
}

export interface AdminOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  channel: 'whatsapp' | 'walk-in' | 'web';
  date: string;
}
