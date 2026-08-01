import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import ProductCard from '../product/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import type { CatalogProduct } from '../../types';

type TabKey = 'featured' | 'bestsellers';

interface FeaturedProductsProps {
  products?: CatalogProduct[];
  title?: string;
  subtitle?: string;
  collectionUrl?: string;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'bestsellers', label: 'Best Sellers' },
];

function filterByTab(products: CatalogProduct[], tab: TabKey) {
  if (tab === 'bestsellers') {
    const best = products.filter((p) => p.badge === 'Best Seller');
    return best.length ? best : products.slice(0, 8);
  }
  // Featured: previous catalog + new items (everything except best sellers)
  const featured = products.filter((p) => p.badge !== 'Best Seller');
  return featured.length ? featured : products.slice(0, 8);
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products: productsProp,
  title = 'OUR PRODUCTS',
  subtitle = 'Featured picks & best sellers',
  collectionUrl = '/collection',
}) => {
  const { products: storeProducts } = useProducts();
  const allProducts = productsProp ?? storeProducts;
  const [tab, setTab] = useState<TabKey>('featured');
  const products = filterByTab(allProducts, tab);

  return (
    <section
      className="w-full px-4 py-10 md:py-16 bg-white"
      style={{ marginBottom: '60px' }}
      id="collection"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 md:mb-10">
          {TABS.map((item) => {
            const active = tab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all ${
                  active
                    ? 'bg-[#0D0B0A] text-[#AC7A37]'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {collectionUrl && (
          <div className="mt-12 text-center">
            <Link
              to={collectionUrl}
              className="inline-flex items-center gap-2 group relative py-1 text-sm font-bold tracking-widest text-[#0D0B0A] uppercase transition-colors"
            >
              <span>View All Collection</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0D0B0A] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
