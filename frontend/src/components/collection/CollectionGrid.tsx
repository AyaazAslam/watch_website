import type { CatalogProduct } from '../../types';
import ProductCard from '../product/ProductCard';

interface CollectionGridProps {
  products: CatalogProduct[];
  onClearFilters?: () => void;
}

function CollectionGrid({ products, onClearFilters }: CollectionGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-stone-200 bg-white">
        <p className="text-lg font-bold text-[#0D0B0A] tracking-wide">
          No watches match your filters
        </p>
        <p className="text-sm text-stone-500 mt-2 max-w-sm">
          Try adjusting brand, price, or search to see more results.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 px-6 py-2.5 rounded-lg bg-[#0D0B0A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#AC7A37] transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CollectionGrid;
