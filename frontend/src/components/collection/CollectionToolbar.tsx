import { SlidersHorizontal } from 'lucide-react';
import type { CollectionFiltersState, SortOption } from '../../types';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

interface CollectionToolbarProps {
  resultCount: number;
  totalCount: number;
  sort: CollectionFiltersState['sort'];
  onSortChange: (sort: SortOption) => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

function CollectionToolbar({
  resultCount,
  totalCount,
  sort,
  onSortChange,
  onOpenFilters,
  activeFilterCount,
}: CollectionToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-stone-200">
      <p className="text-sm text-stone-600">
        Showing{' '}
        <span className="font-semibold text-[#0D0B0A]">{resultCount}</span>
        {resultCount !== totalCount && (
          <>
            {' '}
            of <span className="font-semibold text-[#0D0B0A]">{totalCount}</span>
          </>
        )}{' '}
        watches
      </p>

      <div className="flex items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={onOpenFilters}
          className="lg:hidden inline-flex items-center justify-center gap-2 flex-1 sm:flex-none min-h-11 px-4 py-2.5 rounded-lg border border-stone-200 bg-white text-xs font-bold uppercase tracking-wider text-[#0D0B0A] hover:border-[#AC7A37] transition-colors"
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="min-w-5 h-5 px-1 rounded-full bg-[#AC7A37] text-white text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <label className="inline-flex items-center gap-2 text-xs text-stone-500 flex-1 sm:flex-none min-w-0">
          <span className="hidden sm:inline uppercase tracking-wider font-semibold shrink-0">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full min-w-0 min-h-11 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs font-semibold text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default CollectionToolbar;
