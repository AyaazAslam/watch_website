import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

interface Collection {
  id: string;
  title: string;
  handle: string;
  image: string;
  productCount: number;
  aspectRatio?: number;
}

interface CollectionsSliderProps {
  collections?: Collection[];
  title?: string;
}

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'skmei',
    title: 'Skmei',
    handle: 'skmei',
    image: 'https://skmei.com.pk/cdn/shop/files/skmei_2275.jpg?v=1785149026',
    productCount: 20,
  },
  {
    id: 'omega',
    title: 'Omega',
    handle: 'omega',
    image: 'https://www.rohishwatches.com/cdn/shop/files/ChatGPT_Image_Jun_25_2026_03_03_35_PM.png?v=1782382020',
    productCount: 1,
  },
  {
    id: 'tissot',
    title: 'Tissot',
    handle: 'tissot',
    image: 'https://www.rohishwatches.com/cdn/shop/files/ChatGPT_Image_Jun_25_2026_02_52_55_PM.png?v=1782381394',
    productCount: 2,
  },
  {
    id: 'rolex',
    title: 'Rolex',
    handle: 'rolex',
    image: 'https://www.rohishwatches.com/cdn/shop/files/Rolex_shop.png?v=1781591550',
    productCount: 3,
  },
  {
    id: 'patek-philippe',
    title: 'Patek Philippe',
    handle: 'patek-philippe',
    image: 'https://www.rohishwatches.com/cdn/shop/files/Patek_Philippe_Nautilus_Shop_db13f4e4-8275-4cd9-b1f2-f8c41b7d12e3.png?v=1781592218',
    productCount: 2,
  },
  {
    id: 'hublot',
    title: 'Hublot',
    handle: 'hublot',
    image: 'https://www.rohishwatches.com/cdn/shop/files/Hublot_Shop.png?v=1781592617',
    productCount: 2,
  },
  {
    id: 'franck-muller',
    title: 'Franck Muller',
    handle: 'franck-muller',
    image: 'https://www.rohishwatches.com/cdn/shop/files/Gemini_Generated_Image_s1joats1joats1jo.png?v=1781823831',
    productCount: 1,
  },
  {
    id: 'richard-mille',
    title: 'Richard Mille',
    handle: 'richard-mille',
    image: 'https://www.rohishwatches.com/cdn/shop/files/richard_mille_Shop.png?v=1781592858',
    productCount: 0,
  },
];

const CollectionsSlider: React.FC<CollectionsSliderProps> = ({
  collections = DEFAULT_COLLECTIONS,
  title = 'SHOP BY BRANDS',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const touchStartX = useRef<number | null>(null);

  // Responsive Breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleItems(5);
      else if (width >= 1024) setVisibleItems(4);
      else if (width >= 640) setVisibleItems(3);
      else setVisibleItems(2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = collections.length;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused || totalItems <= visibleItems) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, totalItems, visibleItems, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section className="w-full px-4 py-10 md:py-16 select-none bg-white">
      <div className="max-w-7xl mx-auto">
       <SectionHeading title={title} />

        {/* Carousel Container */}
        <div
          className="relative group/slider px-2 md:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          {totalItems > visibleItems && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-2 lg:-translate-x-4 z-20 size-10 rounded-full bg-white/95 shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-110 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-2 lg:translate-x-4 z-20 size-10 rounded-full bg-white/95 shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-110 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Slider Window */}
          <div className="overflow-hidden py-4">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
              }}
            >
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex-shrink-0 px-3 md:px-4"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <CollectionCard collection={collection} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators */}
          {totalItems > visibleItems && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-7 bg-[#1b2234]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <Link
      to={`/collection?brand=${collection.handle}`}
      className="group flex flex-col items-center text-center block focus:outline-none"
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 ease-out group-hover:shadow-xl group-hover:border-gray-200">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${collection.image})` }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 rounded-full" />
      </div>

      <div className="mt-4 flex flex-col items-center space-y-1">
        <span className="relative text-sm md:text-base font-semibold tracking-wide text-gray-800 transition-colors duration-300 group-hover:text-[#0D0B0A]">
          {collection.title}
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0D0B0A] transition-all duration-300 ease-out group-hover:w-full" />
        </span>
        <span className="text-xs md:text-sm text-gray-400 font-medium transition-colors duration-300 group-hover:text-gray-600">
          {collection.productCount}{' '}
          {collection.productCount === 1 ? 'Product' : 'Products'}
        </span>
      </div>
    </Link>
  );
};

export default CollectionsSlider;