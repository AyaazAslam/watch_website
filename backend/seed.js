import 'dotenv/config';
import { connectDB } from './config/db.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

const img = (file) => `https://skmei.com.pk/cdn/shop/files/${file}`;

/** Featured products — first home tab */
const featuredProducts = [
  {
    handle: 'skmei-1628-mens-watch',
    title: 'Skmei 1628 Men’s Watch',
    brand: 'Skmei',
    price: 499900,
    image: img('0da3800d-1628-3.jpg?v=1775814648'),
    image2: img('4a8f4ddc-1628-5.jpg?v=1775814648'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-9393-mens-watch',
    title: 'Skmei 9393 Men’s Watch',
    brand: 'Skmei',
    price: 549900,
    image: img('9393-3_1800x_785e3d32-f66b-4bbf-b554-5c72551e8bb4.webp?v=1785102159'),
    image2: img('9393-7_1800x_ddf260cc-e798-4971-84ae-b3e77d3adba1.webp?v=1785102164'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-2275-mens-watch',
    title: 'Skmei 2275 Men’s Watch',
    brand: 'Skmei',
    price: 459900,
    image: img('skmei_2275.jpg?v=1785149026'),
    image2: img('2e25c152-2275-4.jpg?v=1775814465'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-1260-mens-watch',
    title: 'Skmei 1260 Men’s Watch',
    brand: 'Skmei',
    price: 399900,
    image: img('6ceb2fc4-1260-6.webp?v=1775814464'),
    image2: img('19e5f285-1260-4.jpg?v=1775814464'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-2425-mens-watch',
    title: 'Skmei 2425 Men’s Watch',
    brand: 'Skmei',
    price: 529900,
    image: img('f44a40c1-2425-3.jpg?v=1775814557'),
    image2: img('c5fa7854-2425-2.jpg?v=1775814557'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-9353-mens-watch',
    title: 'Skmei 9353 Men’s Watch',
    brand: 'Skmei',
    price: 479900,
    image: img('9d6d9019-9353-3.jpg?v=1775814500'),
    image2: img('5d2ae7ca-9353-7.jpg?v=1775814500'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-2489-mens-watch',
    title: 'Skmei 2489 Men’s Watch',
    brand: 'Skmei',
    price: 569900,
    image: img('331c793f-2489-1.jpg?v=1775814653'),
    image2: img('310b91f9-2489-3.jpg?v=1775814653'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-2488-mens-watch',
    title: 'Skmei 2488 Men’s Watch',
    brand: 'Skmei',
    price: 589900,
    image: img('2488_6.webp?v=1780307617'),
    image2: img('2488_14.jpg?v=1780308120'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-2296-mens-watch',
    title: 'Skmei 2296 Men’s Watch',
    brand: 'Skmei',
    price: 519900,
    image: img('cab889a9-2296-5-1.jpg?v=1775814664'),
    image2: img('63f55849-2296-12.jpg?v=1775814664'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skmei-2259-mens-watch',
    title: 'Skmei 2259 Men’s Watch',
    brand: 'Skmei',
    price: 439900,
    image: img('16bb1de2-2259-15.jpg?v=1775814636'),
    image2: img('fadc5a18-2259-11.jpg?v=1775814637'),
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
];

/** Best sellers — second home tab */
const bestSellerProducts = [
  {
    handle: 'skmei-1848-mens-watch',
    title: 'Skmei 1848 Men’s Watch',
    brand: 'Skmei',
    price: 629900,
    image: img('77b0f9e5-1848-25.png?v=1775814453'),
    image2: img('449f1fdb-1848-20.png?v=1775814453'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-1894-mens-watch',
    title: 'Skmei 1894 Men’s Watch',
    brand: 'Skmei',
    price: 599900,
    image: img('1894_7.jpg?v=1782310703'),
    image2: img('385d2953-1894-6.png?v=1782310678'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-1894-classic-mens-watch',
    title: 'Skmei 1894 Classic Men’s Watch',
    brand: 'Skmei',
    price: 599900,
    image: img('1894_9.jpg?v=1782311326'),
    image2: img('a87784c7-1894-5.png?v=1782311250'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2559-mens-watch',
    title: 'Skmei 2559 Men’s Watch',
    brand: 'Skmei',
    price: 649900,
    image: img('78492769-2559-17.jpg?v=1775814644'),
    image2: img('b7fb5558-2559-14.jpg?v=1775814644'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2465-mens-watch',
    title: 'Skmei 2465 Men’s Watch',
    brand: 'Skmei',
    price: 469900,
    image: img('2465.webp?v=1780663384'),
    image2: '',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2307-mens-watch',
    title: 'Skmei 2307 Men’s Watch',
    brand: 'Skmei',
    price: 489900,
    image: img('2dbf09a9-2307-6.jpg?v=1775814636'),
    image2: img('daf24c0b-2307-10.jpg?v=1775814636'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2246-mens-watch',
    title: 'Skmei 2246 Men’s Watch',
    brand: 'Skmei',
    price: 559900,
    image: img('81950cbe-2246-6.jpg?v=1775814622'),
    image2: img('5869b852-2246-2.jpg?v=1775814621'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2246-sport-mens-watch',
    title: 'Skmei 2246 Sport Men’s Watch',
    brand: 'Skmei',
    price: 559900,
    image: img('f8da3242-2246-1.jpg?v=1775814621'),
    image2: img('016dbb84-2246-8.jpg?v=1775814621'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2460-mens-watch',
    title: 'Skmei 2460 Men’s Watch',
    brand: 'Skmei',
    price: 509900,
    image: img('2460_6.webp?v=1780683579'),
    image2: img('2460_3.webp?v=1780683579'),
    badge: 'Best Seller',
    inStock: true,
  },
  {
    handle: 'skmei-2150-mens-watch',
    title: 'Skmei 2150 Men’s Watch',
    brand: 'Skmei',
    price: 429900,
    image: img('33013ea1-2150-16.jpg?v=1775814621'),
    image2: img('c148d712-2150-12.jpg?v=1775814620'),
    badge: 'Best Seller',
    inStock: true,
  },
];

/** Original catalog — kept alongside Skmei products */
const classicProducts = [
  {
    handle: 'rolex-datejust-line-classic-style-watch-for-men',
    title: 'Rolex DateJust Line Classic Style Watch For Men',
    brand: 'Rolex',
    price: 379900,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/Rolextwotonewhite_a8fbabd1-e714-4b00-bbd9-cd9f059aeb5d.png?v=1782652767',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/Rolextwotoneblue_d677c807-6439-4344-a377-aef929d2b9bf.png?v=1782652767',
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'rolex-oyster-plain-with-timeless-style-for-mens',
    title: 'Rolex Oyster Plain With Timeless Style For Mens',
    brand: 'Rolex',
    price: 379900,
    image: 'https://www.rohishwatches.com/cdn/shop/files/Rolex_twotone_white.png?v=1782639806',
    image2: 'https://www.rohishwatches.com/cdn/shop/files/Rolex_twotone_black.png?v=1782639806',
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
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
    handle:
      'tissot-prx-doom-glass-shiny-stainless-steel-case-day-date-mens-analog-watch-premium-luxury-timepiece',
    title:
      "Tissot PRX Doom Glass Shiny Stainless Steel Case Day & Date Men's Analog Watch",
    brand: 'Tissot',
    price: 320000,
    image: 'https://www.rohishwatches.com/cdn/shop/files/TissotDGWhite.png?v=1782994878',
    image2: 'https://www.rohishwatches.com/cdn/shop/files/TissotDGBlack.png?v=1782994878',
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
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
    handle: 'tissot-prx-powermatic-80-automatic-timeless-collection-for-mens-watch',
    title: "Tissot PRX Powermatic 80 Automatic Timeless Collection For Men's Watch",
    brand: 'Tissot',
    price: 299900,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/TissotWhite_58570fd8-6e7d-4554-9793-99b78331f610.png?v=1782565108',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/TissotBlack_2d5c037b-8889-470a-8904-b016b79e02c5.png?v=1782565108',
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'patek-philippe-nautilus-style-silver-stainless-steel-mens-analog-watch',
    title: "Patek Philippe Nautilus Style Silver Stainless Steel Men's Analog Watch",
    brand: 'Patek Philippe',
    price: 299900,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/PatekWhite_8fec14cd-e452-442f-822f-29a0bb07b1e8.png?v=1782713589',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/PatekBlack_eb364214-df75-4575-89e2-9116dc1f6f29.png?v=1782713589',
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
    handle: 'skemi-black-alloy-wheel-design-mens-analog-watch-premium-stainless-steel-strap',
    title:
      "Skemi Black Alloy Wheel Design Men's Analog Watch – Premium Stainless Steel Strap",
    brand: 'Skemi',
    price: 280000,
    image: 'https://www.rohishwatches.com/cdn/shop/files/SkemiBlack.png?v=1782721961',
    image2:
      'https://www.rohishwatches.com/cdn/shop/files/preview_images/8887ad964962459b9b821c2a1c2e3bd4.thumbnail.0000000000.jpg?v=1782722204',
    badge: 'New',
    badgeType: 'new',
    inStock: true,
  },
  {
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
    handle: 'franck-muller-vanguard-style-luxury-watch',
    title: 'Franck Muller Vanguard Style Luxury Watch',
    brand: 'Franck Muller',
    price: 520000,
    image:
      'https://www.rohishwatches.com/cdn/shop/files/Gemini_Generated_Image_s1joats1joats1jo.png?v=1781823831',
    inStock: false,
  },
];

const FEMALE_HANDLES = new Set([
  'skmei-1260-mens-watch',
  'skmei-9353-mens-watch',
  'skmei-2259-mens-watch',
  'skmei-2465-mens-watch',
  'skmei-2460-mens-watch',
  'skmei-2150-mens-watch',
  'patek-philippe-nautilus-style-silver-stainless-steel-mens-analog-watch',
]);

const products = [
  ...classicProducts,
  ...featuredProducts,
  ...bestSellerProducts,
].map((product) => ({
  ...product,
  // Seed source values were in paisa — store as PKR rupees
  price: Math.round(product.price / 100),
  comparePrice: product.comparePrice
    ? Math.round(product.comparePrice / 100)
    : undefined,
  gender: FEMALE_HANDLES.has(product.handle) ? 'female' : 'male',
}));

const sampleOrders = [
  {
    orderId: 'ORD-1042',
    customer: 'Sara Ahmed',
    product: 'Skmei 1848 Men’s Watch',
    amount: 6299,
    status: 'confirmed',
    channel: 'whatsapp',
    date: new Date('2026-07-30'),
  },
  {
    orderId: 'ORD-1041',
    customer: 'Bilal Khan',
    product: 'Skmei 1894 Men’s Watch',
    amount: 5999,
    status: 'shipped',
    channel: 'whatsapp',
    date: new Date('2026-07-29'),
  },
  {
    orderId: 'ORD-1040',
    customer: 'Omar Siddiqui',
    product: 'Skmei 1628 Men’s Watch',
    amount: 4999,
    status: 'pending',
    channel: 'walk-in',
    date: new Date('2026-07-28'),
  },
];

async function seed() {
  try {
    await connectDB();

    // Products + orders only — no users are seeded by default
    await Promise.all([Product.deleteMany({}), Order.deleteMany({})]);

    await Product.insertMany(products);
    await Order.insertMany(sampleOrders);

    console.log('Seed complete');
    console.log('Users: none seeded (create admin via signup / DB)');
    console.log(
      `Products: ${products.length} (${classicProducts.length} classic, ${featuredProducts.length} skmei featured, ${bestSellerProducts.length} best sellers)`,
    );
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
