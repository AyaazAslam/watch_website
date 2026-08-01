import { useState, useEffect } from 'react';
import CollectionHero from '../components/collection/CollectionHero';
import CollectionFilters from '../components/collection/CollectionFilters';
import CollectionToolbar from '../components/collection/CollectionToolbar';
import CollectionGrid from '../components/collection/CollectionGrid';
import { useCollectionFilters } from '../hooks/useCollectionFilters';
import { useProducts } from '../hooks/useProducts';

function Collection() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { products } = useProducts();
  const {
    filters,
    filteredProducts,
    updateFilters,
    toggleBrand,
    toggleGender,
    resetFilters,
    activeFilterCount,
    totalCount,
    priceBounds,
  } = useCollectionFilters(products);

  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFiltersOpen]);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/*
        Sidebar + content share one column wrapper.
        Sticky sidebar stays full-height while this block scrolls;
        when the block ends, the footer appears full-width below (not under the sidebar).
      */}
      <div className="flex items-start">
        <CollectionFilters
          filters={filters}
          priceBounds={priceBounds}
          onToggleBrand={toggleBrand}
          onToggleGender={toggleGender}
          onUpdate={updateFilters}
          onReset={resetFilters}
          activeFilterCount={activeFilterCount}
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <CollectionHero />

          <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <CollectionToolbar
              resultCount={filteredProducts.length}
              totalCount={totalCount}
              sort={filters.sort}
              onSortChange={(sort) => updateFilters({ sort })}
              onOpenFilters={() => setMobileFiltersOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            <CollectionGrid
              products={filteredProducts}
              onClearFilters={resetFilters}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Collection;
