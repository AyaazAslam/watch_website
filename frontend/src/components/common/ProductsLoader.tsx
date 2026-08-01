interface ProductsLoaderProps {
  label?: string;
  className?: string;
}

function ProductsLoader({
  label = 'Loading products…',
  className = '',
}: ProductsLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 sm:py-20 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="size-10 sm:size-12 rounded-full border-2 border-stone-200 border-t-[#AC7A37] animate-spin"
        aria-hidden
      />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        {label}
      </p>
    </div>
  );
}

export default ProductsLoader;
