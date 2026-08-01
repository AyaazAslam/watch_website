import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import type { CatalogProduct } from '../../types';
import { formatPkr, getWhatsAppLink } from '../../data/products';
import { mediaUrl } from '../../lib/media';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
  product: CatalogProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100,
        )
      : null;

  return (
    <>
      <div
        className="group flex flex-col h-full select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-xl bg-stone-50 aspect-[3/4] border border-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="block w-full h-full relative cursor-pointer text-left"
            aria-label={`View details for ${product.title}`}
          >
            <img
              src={mediaUrl(product.image)}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                product.image2 && isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            {product.image2 && (
              <img
                src={mediaUrl(product.image2)}
                alt={`${product.title} alternate view`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            )}
          </button>

          {discount && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
              -{discount}%
            </div>
          )}

          {product.inStock === false && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0D0B0A] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
              Sold Out
            </div>
          )}

          {product.inStock !== false && (
            <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 z-10 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <a
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full inline-flex items-center justify-center gap-1.5 min-h-10 bg-[#25D366] text-white hover:bg-[#1ebe57] py-2.5 px-2 rounded-lg shadow-lg transition-all duration-200 text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
              >
                <FaWhatsapp size={14} className="shrink-0" />
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Book On WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        <div className="mt-3 md:mt-4 flex flex-col flex-grow text-center items-center px-0.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#AC7A37] font-semibold mb-1">
            {product.brand}
          </p>
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="block group/title w-full cursor-pointer"
          >
            <h3 className="relative text-xs md:text-sm font-semibold text-stone-800 transition-colors duration-300 line-clamp-2 px-0.5 break-words">
              {product.title}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0D0B0A] transition-all duration-300 ease-out group-hover/title:w-full" />
            </h3>
          </button>

          <div className="mt-1.5 flex flex-col xs:flex-row items-center justify-center gap-0.5 sm:gap-2 flex-wrap">
            {product.comparePrice ? (
              <>
                <span className="text-[11px] md:text-sm text-stone-400 line-through font-normal">
                  {formatPkr(product.comparePrice)}
                </span>
                <span className="text-xs md:text-sm font-bold text-red-600">
                  {formatPkr(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xs md:text-sm font-bold text-stone-900">
                {formatPkr(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <ProductDetailModal
          product={product}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
}

export default ProductCard;
