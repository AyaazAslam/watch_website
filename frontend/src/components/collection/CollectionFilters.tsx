import { X } from 'lucide-react';
import type { CollectionFiltersState, ProductGender } from '../../types';
import { BRANDS, formatPkr } from '../../data/products';
import type { PriceBounds } from '../../hooks/useCollectionFilters';

type GenderFilterValue = ProductGender | 'all';

const GENDER_FILTERS: { value: GenderFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

interface CollectionFiltersProps {
  filters: CollectionFiltersState;
  priceBounds: PriceBounds;
  onToggleBrand: (brand: string) => void;
  onToggleGender: (gender: GenderFilterValue) => void;
  onUpdate: (patch: Partial<CollectionFiltersState>) => void;
  onReset: () => void;
  activeFilterCount: number;
  /** Mobile drawer mode */
  isOpen?: boolean;
  onClose?: () => void;
}

function FilterFields({
  filters,
  priceBounds,
  onToggleBrand,
  onToggleGender,
  onUpdate,
}: Pick<
  CollectionFiltersProps,
  'filters' | 'priceBounds' | 'onToggleBrand' | 'onToggleGender' | 'onUpdate'
>) {
  return (
    <div className="space-y-7">
      <div>
        <label
          htmlFor="collection-search"
          className="block text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 mb-3"
        >
          Search
        </label>
        <input
          id="collection-search"
          type="search"
          value={filters.query}
          onChange={(e) => onUpdate({ query: e.target.value })}
          placeholder="Watch name or brand…"
          className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40 transition"
        />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 mb-3">
          Brand
        </p>
        <ul className="space-y-2.5">
          {BRANDS.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <li key={brand}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleBrand(brand)}
                    className="size-4 rounded border-stone-300 text-[#AC7A37] focus:ring-[#AC7A37]/40 accent-[#AC7A37]"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      checked
                        ? 'text-[#0D0B0A] font-semibold'
                        : 'text-stone-600 group-hover:text-[#0D0B0A]'
                    }`}
                  >
                    {brand}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 mb-3">
          Gender
        </p>
        <ul className="space-y-2.5">
          {GENDER_FILTERS.map(({ value, label }) => {
            const selected = filters.genders[0] ?? 'all';
            const checked = selected === value;
            return (
              <li key={value}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="collection-gender"
                    checked={checked}
                    onChange={() => onToggleGender(value)}
                    className="size-4 border-stone-300 text-[#AC7A37] focus:ring-[#AC7A37]/40 accent-[#AC7A37]"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      checked
                        ? 'text-[#0D0B0A] font-semibold'
                        : 'text-stone-600 group-hover:text-[#0D0B0A]'
                    }`}
                  >
                    {label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 mb-3">
          Price Range
        </p>
        <div className="flex items-center justify-between text-xs text-stone-600 mb-3">
          <span>{formatPkr(filters.minPrice)}</span>
          <span>{formatPkr(filters.maxPrice)}</span>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="sr-only">Minimum price</span>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={100}
              value={Math.min(
                Math.max(filters.minPrice, priceBounds.min),
                priceBounds.max,
              )}
              onChange={(e) => {
                const value = Number(e.target.value);
                onUpdate({ minPrice: Math.min(value, filters.maxPrice) });
              }}
              className="w-full accent-[#AC7A37]"
            />
          </label>
          <label className="block">
            <span className="sr-only">Maximum price</span>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={100}
              value={Math.min(
                Math.max(filters.maxPrice, priceBounds.min),
                priceBounds.max,
              )}
              onChange={(e) => {
                const value = Number(e.target.value);
                onUpdate({ maxPrice: Math.max(value, filters.minPrice) });
              }}
              className="w-full accent-[#AC7A37]"
            />
          </label>
        </div>
      </div>

    </div>
  );
}

function FilterHeader({
  activeFilterCount,
  onReset,
}: {
  activeFilterCount: number;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#0D0B0A]">
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#AC7A37] text-white text-[10px]">
            {activeFilterCount}
          </span>
        )}
      </h2>
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-semibold uppercase tracking-wider text-[#AC7A37] hover:text-[#0D0B0A] transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

function CollectionFilters({
  filters,
  priceBounds,
  onToggleBrand,
  onToggleGender,
  onUpdate,
  onReset,
  activeFilterCount,
  isOpen = false,
  onClose,
}: CollectionFiltersProps) {
  return (
    <>
      {/*
        Desktop: sticky full-height sidebar under the fixed navbar.
        self-start is required — flex stretch makes sticky a no-op.
        Releases before the footer so the footer stays full-width.
      */}
      <aside
        className="
          hidden lg:flex flex-col shrink-0 self-start
          sticky top-16 sm:top-20
          w-64 xl:w-72
          h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)]
          border-r border-stone-200 bg-white
          shadow-[4px_0_24px_-12px_rgba(0,0,0,0.12)]
        "
      >
        <div className="shrink-0 px-5 pt-5 pb-4 border-b border-stone-100">
          <FilterHeader
            activeFilterCount={activeFilterCount}
            onReset={onReset}
          />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-5 [scrollbar-width:thin] [scrollbar-color:#c4c0bc_transparent]">
          <FilterFields
            filters={filters}
            priceBounds={priceBounds}
            onToggleBrand={onToggleBrand}
            onToggleGender={onToggleGender}
            onUpdate={onUpdate}
          />
        </div>
      </aside>

      {/* Mobile drawer — sits below the fixed navbar */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden top-16 sm:top-20">
          <button
            type="button"
            className="absolute inset-0 bg-[#0D0B0A]/50 backdrop-blur-sm"
            aria-label="Close filters"
            onClick={onClose}
          />
          <div className="absolute inset-y-0 left-0 w-[min(100%,20rem)] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 shrink-0">
              <span className="text-sm font-black uppercase tracking-[0.18em]">
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#AC7A37] text-white text-[10px]">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="size-9 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-5 overscroll-contain">
              {activeFilterCount > 0 && (
                <div className="mb-5 flex justify-end">
                  <button
                    type="button"
                    onClick={onReset}
                    className="text-[11px] font-semibold uppercase tracking-wider text-[#AC7A37]"
                  >
                    Clear all
                  </button>
                </div>
              )}
              <FilterFields
                filters={filters}
                priceBounds={priceBounds}
                onToggleBrand={onToggleBrand}
                onToggleGender={onToggleGender}
                onUpdate={onUpdate}
              />
            </div>
            <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-stone-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-11 py-3 rounded-lg bg-[#0D0B0A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#AC7A37] transition-colors"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CollectionFilters;
