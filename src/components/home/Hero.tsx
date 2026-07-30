import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slide {
  id: number;
  subtitle: string;
  title: string;
  highlightText?: string;
  description: string;
  image: string;
  cta: string;
  link: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: "The 2026 Grand Horizon Edition",
    title: "Timeless Precision &",
    highlightText: "Mastery",
    description:
      "Swiss-engineered mechanical art crafted for leaders who measure time in defining moments.",
    image:
      "./img/slide2.png",
    cta: "Explore Collection",
    link: "/#collection",
  },
  {
    id: 2,
    subtitle: "Centuries of Craftsmanship",
    title: "A Legacy of Pure",
    highlightText: "Excellence",
    description:
      "Rooted in classic horological traditions, seamlessly merged with aerospace-grade modern innovation.",
    image:
      "./img/slide1.png",
    cta: "Our Heritage",
    link: "/about",
  },
  {
    id: 3,
    subtitle: "Bespoke Horology",
    title: "Tailored to Your",
    highlightText: "Signature Style",
    description:
      "Custom hand engravings, bespoke dial configurations, and rare alligator leather strap options.",
    image:
      "./img/slide3.png",
    cta: "Custom Atelier",
    link: "/services",
  },
];

const Hero = () => {
  const [, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-[88vh] sm:h-[92vh] md:h-screen bg-[#181818] relative text-white overflow-hidden group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        speed={1200}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
        }}
        navigation={{
          nextEl: ".hero-swiper-next",
          prevEl: ".hero-swiper-prev",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
      >
        {SLIDES.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Layered Vignette Gradient */}
            <div className="absolute inset-0 z-0 bg-[#181818]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover hero-zoom-animation brightness-[0.75] contrast-[1.05]"
                loading={idx === 0 ? "eager" : "lazy"}
              />
              {/* Left-heavy gradient overlay to guarantee maximum legibility on text side */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/95 via-[#181818]/65 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/80 via-transparent to-[#181818]/50" />
            </div>

            {/* Left-Aligned Slide Content Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-start">
              <div className="max-w-7xl mx-auto px-6 sm:px-16 md:px-24 lg:px-32 w-full text-left">
                <div className="max-w-2xl space-y-5 sm:space-y-6 flex flex-col items-start justify-start">
                  
                  {/* Category Pill Tag */}
                  <div className="hero-fade-in" style={{ animationDelay: "0.1s" }}>
                    <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#181818]/60 border border-[#D6B16A]/40 text-[#D6B16A] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(214,177,106,0.15)]">
                      <Clock size={14} className="text-[#D6B16A]" />
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Editorial Main Title */}
                  <h1
                    className="text-3xl sm:text-5xl md:text-6xl  font-bold text-white leading-[1.1] tracking-tight hero-fade-in drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.title}{" "}
                    {slide.highlightText && (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B16A] via-[#fcf6ba] to-[#B89248]">
                        {slide.highlightText}
                      </span>
                    )}
                  </h1>

                  {/* Subtitle Description */}
                  <p
                    className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed hero-fade-in font-light max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-wide"
                    style={{ animationDelay: "0.5s" }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <div
                    className="pt-4 sm:pt-6 hero-fade-in flex justify-start w-full"
                    style={{ animationDelay: "0.7s" }}
                  >
                    <Link
                      to={slide.link}
                      className="group/btn inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#D6B16A] via-[#c49e56] to-[#aa820a] hover:from-[#e4c483] hover:to-[#b89248] text-[#181818] text-xs sm:text-sm font-bold uppercase tracking-[0.18em] rounded-full border border-[#fcf6ba]/30 transition-all duration-300 shadow-[0_0_20px_rgba(214,177,106,0.3)] hover:shadow-[0_0_30px_rgba(214,177,106,0.5)] hover:scale-105 active:scale-95"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <button
        aria-label="Previous slide"
        className="hero-swiper-prev absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181818]/50 border border-[#D6B16A]/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#D6B16A] hover:border-[#D6B16A] hover:text-[#181818] transition-all duration-300 backdrop-blur-md shadow-lg"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        aria-label="Next slide"
        className="hero-swiper-next absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181818]/50 border border-[#D6B16A]/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#D6B16A] hover:border-[#D6B16A] hover:text-[#181818] transition-all duration-300 backdrop-blur-md shadow-lg"
      >
        <ChevronRight size={22} />
      </button>

      {/* Embedded Swiper Custom CSS */}
      <style>{`
        /* Swiper Bullet Styles Aligned to Left */
        .swiper-pagination {
          bottom: 36px !important;
          left: 24px !important;
          text-align: left !important;
        }

        @media (min-width: 640px) {
          .swiper-pagination {
            left: 64px !important;
          }
        }

        @media (min-width: 768px) {
          .swiper-pagination {
            left: 96px !important;
          }
        }

        @media (min-width: 1024px) {
          .swiper-pagination {
            left: 128px !important;
          }
        }

        .custom-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
          width: 8px !important;
          height: 8px !important;
          margin-right: 8px !important;
          margin-left: 0 !important;
          border-radius: 9999px !important;
          display: inline-block;
          cursor: pointer;
        }

        .swiper-pagination-bullet-active.custom-bullet {
          background: #D6B16A !important;
          width: 36px !important;
          border: 1px solid #fcf6ba;
          box-shadow: 0 0 12px rgba(214, 177, 106, 0.6) !important;
        }

        /* Hero Animation Sequence */
        .hero-fade-in {
          opacity: 0;
          transform: translateY(24px);
        }

        .swiper-slide-active .hero-fade-in {
          animation: fadeInUpHero 0.9s cubic-bezier(0.15, 0.9, 0.25, 1) forwards;
        }

        .swiper-slide:not(.swiper-slide-active) .hero-fade-in {
          opacity: 0;
          animation: none;
        }

        .swiper-slide-active .hero-zoom-animation {
          animation: zoomOutHero 14s cubic-bezier(0.25, 0.95, 0.4, 1) forwards;
        }

        @keyframes fadeInUpHero {
          from {
            opacity: 0;
            transform: translateY(28px);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes zoomOutHero {
          from {
            transform: scale(1.12);
          }
          to {
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          .swiper-pagination {
            bottom: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;