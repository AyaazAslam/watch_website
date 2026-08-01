import type { CatalogProduct } from '../types';
import { BRAND } from './brand';

export const BRANDS = [
  'Skmei',
  'Skemi',
  'Rolex',
  'Omega',
  'Tissot',
  'Patek Philippe',
  'Hublot',
  'Franck Muller',
  'Richard Mille',
] as const;

export type BrandName = (typeof BRANDS)[number];

/** Static catalog fallback — source values historically in paisa, normalized to PKR below. */
const RAW_CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: '10163421446434',
    handle: 'rolex-datejust-line-classic-style-watch-for-men',
    title: 'Rolex DateJust Line Classic Style Watch For Men',
    brand: 'Rolex',
    price: 379900,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/Rolextwotonewhite_a8fbabd1-e714-4b00-bbd9-cd9f059aeb5d.png?v=1782652767',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/Rolextwotoneblue_d677c807-6439-4344-a377-aef929d2b9bf.png?v=1782652767',
    inStock: true,
  },
  {
    id: '10163399917858',
    handle: 'rolex-oyster-plain-with-timeless-style-for-mens',
    title: 'Rolex Oyster Plain With Timeless Style For Mens',
    brand: 'Rolex',
    price: 379900,
    image: 'https://www.rohishwatches.com/cdn/shop/files/Rolex_twotone_white.png?v=1782639806',
    image2: 'https://www.rohishwatches.com/cdn/shop/files/Rolex_twotone_black.png?v=1782639806',
    inStock: true,
  },
  {
    id: '10163276316962',
    handle: 'patek-philippe-nautilus-strap-luxury-watches-for-sale',
    title: 'Patek Philippe Nautilus Strap Luxury Watches for Sale',
    brand: 'Patek Philippe',
    price: 310000,
    comparePrice: 500000,
    badge: 'Sale',
    badgeType: 'sale',
    image: 'https://www.rohishwatches.com/cdn/shop/files/PatekWhite.png?v=1782626876',
    image2: 'https://www.rohishwatches.com/cdn/shop/files/Patekblack.png?v=1782626876',
    inStock: true,
  },
  {
    id: '10255399616802',
    handle:
      'tissot-prx-doom-glass-shiny-stainless-steel-case-day-date-mens-analog-watch-premium-luxury-timepiece',
    title:
      "Tissot PRX Doom Glass Shiny Stainless Steel Case Day & Date Men's Analog Watch",
    brand: 'Tissot',
    price: 320000,
    image: 'https://www.rohishwatches.com/cdn/shop/files/TissotDGWhite.png?v=1782994878',
    image2: 'https://www.rohishwatches.com/cdn/shop/files/TissotDGBlack.png?v=1782994878',
    inStock: true,
  },
  {
    id: '10221620658466',
    handle: 'omega-x-swatch-moonswatch-mission-to-neptune-chronograph-watch',
    title: 'Omega x Swatch MoonSwatch Mission to Neptune Chronograph Watch',
    brand: 'Omega',
    price: 440000,
    badge: 'New',
    badgeType: 'new',
    image: 'https://www.rohishwatches.com/cdn/shop/files/Omegablack.png?v=1782564063',
    image2: 'https://www.rohishwatches.com/cdn/shop/files/OmegaBlue.png?v=1782564063',
    inStock: true,
  },
  {
    id: '10220500484386',
    handle: 'tissot-prx-powermatic-80-automatic-timeless-collection-for-mens-watch',
    title: "Tissot PRX Powermatic 80 Automatic Timeless Collection For Men's Watch",
    brand: 'Tissot',
    price: 299900,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/TissotWhite_58570fd8-6e7d-4554-9793-99b78331f610.png?v=1782565108',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/TissotBlack_2d5c037b-8889-470a-8904-b016b79e02c5.png?v=1782565108',
    inStock: true,
  },
  {
    id: '10212686790946',
    handle: 'patek-philippe-nautilus-style-silver-stainless-steel-mens-analog-watch',
    title: "Patek Philippe Nautilus Style Silver Stainless Steel Men's Analog Watch",
    brand: 'Patek Philippe',
    price: 299900,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/PatekWhite_8fec14cd-e452-442f-822f-29a0bb07b1e8.png?v=1782713589',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/PatekBlack_eb364214-df75-4575-89e2-9116dc1f6f29.png?v=1782713589',
    inStock: true,
  },
  {
    id: '10212667097378',
    handle: 'skemi-black-alloy-wheel-design-mens-analog-watch-premium-stainless-steel-strap',
    title: "Skemi Black Alloy Wheel Design Men's Analog Watch – Premium Stainless Steel Strap",
    brand: 'Skemi',
    price: 280000,
    image: 'https://www.rohishwatches.com/cdn/shop/files/SkemiBlack.png?v=1782721961',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/preview_images/8887ad964962459b9b821c2a1c2e3bd4.thumbnail.0000000000.jpg?v=1782722204',
    inStock: true,
  },
  {
    id: '10212667097379',
    handle: 'hublot-classic-fusion-titanium-style-mens-watch',
    title: 'Hublot Classic Fusion Titanium Style Mens Watch',
    brand: 'Hublot',
    price: 450000,
    comparePrice: 520000,
    badge: 'Sale',
    badgeType: 'sale',
    image: 'https://www.rohishwatches.com/cdn/shop/files/Hublot_Shop.png?v=1781592617',
    inStock: true,
  },
  {
    id: '10212667097380',
    handle: 'franck-muller-vanguard-style-luxury-watch',
    title: 'Franck Muller Vanguard Style Luxury Watch',
    brand: 'Franck Muller',
    price: 520000,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/Gemini_Generated_Image_s1joats1joats1jo.png?v=1781823831',
    inStock: false,
  },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = RAW_CATALOG_PRODUCTS.map(
  (product) => ({
    ...product,
    price: Math.round(product.price / 100),
    comparePrice: product.comparePrice
      ? Math.round(product.comparePrice / 100)
      : undefined,
  }),
);

export const PRICE_BOUNDS = (() => {
  const prices = CATALOG_PRODUCTS.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
})();

export function brandToSlug(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, '-');
}

export function slugToBrand(slug: string): string | undefined {
  const normalized = slug.toLowerCase().replace(/\s+/g, '-');
  return BRANDS.find((b) => brandToSlug(b) === normalized);
}

export function formatPkr(priceInPkr: number): string {
  return `Rs.${Number(priceInPkr || 0).toLocaleString('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function getWhatsAppLink(product: { title: string; price: number }): string {
  const price = formatPkr(product.price);
  const message = `Hello! I am interested in purchasing the *${product.title}* listed for *${price}*. Please share more details.`;
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
