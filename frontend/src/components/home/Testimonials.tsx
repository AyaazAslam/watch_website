import React, { useEffect, useRef, useState } from 'react';
import SectionHeading from '../common/SectionHeading';

interface Testimonial {
  id: string;
  productName: string;
  productPrice: string;
  productImage: string;
  rating: number;
  text: string;
  authorName: string;
  authorRole: string;
  authorInitial?: string;
  isVerified?: boolean;
}

interface TestimonialScrollProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  speed?: number;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    productName: 'Luxe Vantage Diamond Frost',
    productPrice: 'Rs.3,300',
    productImage:
      'https://www.rohishwatches.com/cdn/shop/files/30f27ccf-9a80-4ba8-9eae-003f635202b0copy.webp?v=1776504321&width=100',
    rating: 5,
    text: 'شاندار گھڑی! کوالٹی بہترین ہے اور ڈیزائن بہت خوبصورت ہے۔ یہ میری پسندیدہ گھڑی بن گئی ہے۔',
    authorName: 'فاطمہ خان',
    authorRole: 'کراچی، پاکستان',
    authorInitial: 'ف',
    isVerified: true,
  },
  {
    id: '2',
    productName: 'Luxe Vantage Diamond Royale',
    productPrice: 'Rs.3,300',
    productImage:
      'https://www.rohishwatches.com/cdn/shop/files/30f27ccf-9a80-4ba8-9eae-003f635202b0copy.webp?v=1776504321&width=100',
    rating: 5,
    text: 'Excellent watch! The quality is superb and it looks exactly like the pictures. Very happy with my purchase.',
    authorName: 'Ahmed Ali',
    authorRole: 'Lahore, Pakistan',
    authorInitial: 'A',
    isVerified: true,
  },
  {
    id: '3',
    productName: 'Luxe Vantage Emerald',
    productPrice: 'Rs.3,300',
    productImage:
      'https://www.rohishwatches.com/cdn/shop/files/f0c3c651-27b4-4aa0-8f84-58f6138b4e20copy.webp?v=1775135235&width=100',
    rating: 5,
    text: 'بہت خوبصورت گھڑی! اسٹیل کی کوالٹی اعلیٰ ہے اور ڈائل کا رنگ بہت پسند آیا۔ قیمت کے لحاظ سے بہترین۔',
    authorName: 'عائشہ ملک',
    authorRole: 'اسلام آباد، پاکستان',
    authorInitial: 'ع',
    isVerified: true,
  },
  {
    id: '4',
    productName: 'PP Limited Edition Premium Dial',
    productPrice: 'Rs.2,800',
    productImage:
      'https://www.rohishwatches.com/cdn/shop/files/02_304f12bf-774e-412f-a922-0a075d457ca6.webp?v=1776671591&width=100',
    rating: 5,
    text: 'Premium quality watch! The finish is flawless and it feels very luxurious. Highly recommend this brand.',
    authorName: 'Hassan Raza',
    authorRole: 'Faisalabad, Pakistan',
    authorInitial: 'H',
    isVerified: true,
  },
  {
    id: '5',
    productName: 'Patek Limited Edition Premium Dial - Green',
    productPrice: 'Rs.2,800',
    productImage:
      'https://www.rohishwatches.com/cdn/shop/files/03copy.webp?v=1775136178&width=100',
    rating: 5,
    text: 'لاجواب گھڑی! ڈائمنڈ فنش بہت شاندار ہے۔ ہر کسی کو تجویز کرتا ہوں جو لگژری گھڑی چاہتے ہیں۔',
    authorName: 'زینب حسین',
    authorRole: 'ملتان، پاکستان',
    authorInitial: 'ز',
    isVerified: true,
  },
  {
    id: '6',
    productName: 'TS PRX Silver Stainless Steel Black Dial',
    productPrice: 'Rs.2,799',
    productImage:
      'https://www.rohishwatches.com/cdn/shop/files/0873bce6-4001-4d0e-831d-499c3d1b5f9ecopy.webp?v=1775136229&width=100',
    rating: 5,
    text: 'Beautiful emerald dial! The color is stunning and the watch feels very premium. Worth every rupee.',
    authorName: 'Bilal Ahmed',
    authorRole: 'Rawalpindi, Pakistan',
    authorInitial: 'B',
    isVerified: true,
  },
];

const TestimonialScroll: React.FC<TestimonialScrollProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  title = 'WHAT OUR CUSTOMERS SAY',
  subtitle = 'Real stories from verified watch enthusiasts',
  speed = 25,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const [duplicatedItems, setDuplicatedItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (testimonials.length > 0) {
      setDuplicatedItems([...testimonials, ...testimonials, ...testimonials]);
    }
  }, [testimonials]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || duplicatedItems.length === 0) return;

    let position = 0;
    const itemWidth = track.children[0]?.getBoundingClientRect().width || 300;
    const totalWidth = duplicatedItems.length * (itemWidth + 16);

    const animate = () => {
      if (!isPaused) {
        position -= speed / 60;
        if (Math.abs(position) >= totalWidth / 3) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duplicatedItems, isPaused, speed]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className="w-3.5 h-3.5 text-[#AC7A37] flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? 'currentColor' : 'none'}
        stroke={i < rating ? 'none' : 'currentColor'}
        strokeWidth="1"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  if (testimonials.length === 0) return null;

  return (
    <section
      className="w-full py-12 md:py-16 overflow-hidden bg-white text-[#0D0B0A]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={title} subtitle={subtitle} />

        {/* Smooth Scrolling Container */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {duplicatedItems.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-72 md:w-80 bg-white rounded-xl border border-stone-200/80 p-4 md:p-5 shadow-sm hover:shadow-md hover:border-[#AC7A37]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Compact Product Info Header */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-stone-100">
                    <img
                      src={testimonial.productImage}
                      alt={testimonial.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-[#0D0B0A] truncate">
                        {testimonial.productName}
                      </h3>
                      <p className="text-xs font-semibold text-[#AC7A37]">
                        {testimonial.productPrice}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Minimal Author Footer */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-stone-100">
                  <div className="w-8 h-8 rounded-full bg-[#0D0B0A] text-[#AC7A37] flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {testimonial.authorInitial ||
                      testimonial.authorName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-[#0D0B0A] truncate">
                        {testimonial.authorName}
                      </p>
                      {testimonial.isVerified && (
                        <span className="text-[9px] bg-[#AC7A37]/10 text-[#AC7A37] font-semibold px-1.5 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      {testimonial.authorRole}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialScroll;