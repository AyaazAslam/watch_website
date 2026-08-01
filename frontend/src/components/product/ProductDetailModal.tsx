import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import type { CatalogProduct } from '../../types';
import { formatPkr, getWhatsAppLink } from '../../data/products';
import { mediaUrl } from '../../lib/media';

interface ProductDetailModalProps {
  product: CatalogProduct;
  onClose: () => void;
}

function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const images = [product.image, product.image2].filter(Boolean) as string[];
  const [activeImage, setActiveImage] = useState(0);

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100,
        )
      : null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-[#0D0B0A]/55 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 size-9 rounded-full bg-white/95 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-[#0D0B0A] transition-colors shadow-sm"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative bg-stone-50 border-b md:border-b-0 md:border-r border-stone-100">
            <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden">
              <img
                src={mediaUrl(images[activeImage] || product.image)}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {discount && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              {product.inStock === false && (
                <span className="absolute top-3 left-3 bg-[#0D0B0A] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative size-16 sm:size-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === index
                        ? 'border-[#AC7A37]'
                        : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={mediaUrl(src)}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col p-5 sm:p-7 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#AC7A37] font-semibold">
              {product.brand}
            </p>
            <h2
              id="product-detail-title"
              className="mt-2 text-xl sm:text-2xl font-bold text-[#0D0B0A] leading-snug"
            >
              {product.title}
            </h2>

            {product.badge && (
              <span className="mt-3 inline-flex self-start rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                {product.badge}
              </span>
            )}

            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              {product.comparePrice ? (
                <>
                  <span className="text-sm text-stone-400 line-through">
                    {formatPkr(product.comparePrice)}
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {formatPkr(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-[#0D0B0A]">
                  {formatPkr(product.price)}
                </span>
              )}
            </div>

            <dl className="mt-6 space-y-3 text-sm border-t border-stone-100 pt-5">
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Brand</dt>
                <dd className="font-medium text-[#0D0B0A]">{product.brand}</dd>
              </div>
              {product.gender && (
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Gender</dt>
                  <dd className="font-medium text-[#0D0B0A] capitalize">
                    {product.gender}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Availability</dt>
                <dd
                  className={`font-medium ${
                    product.inStock === false ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {product.inStock === false ? 'Sold out' : 'In stock'}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-sm text-stone-600 leading-relaxed">
              Authentic {product.brand} timepiece from Watch World by Azdadkhan.
              Message us on WhatsApp for availability, sizing, and delivery details.
            </p>

            <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
              {product.inStock !== false && (
                <a
                  href={getWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 min-h-11 rounded-lg bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1ebe57] transition-colors"
                >
                  <FaWhatsapp size={16} />
                  Book on WhatsApp
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center min-h-11 px-5 rounded-lg border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-700 hover:border-[#AC7A37] hover:text-[#AC7A37] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
