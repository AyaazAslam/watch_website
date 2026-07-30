import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'James L.',
      role: 'Watch Collector',
      text: 'The attention to detail on the Midnight Chronograph is simply breathtaking. It rivals pieces in my collection that cost five times as much.',
      rating: 5,
      image: 'https://i.pinimg.com/1200x/7b/11/41/7b11418426aaf8278e8389a88902f85d.jpg',
    },
    {
      name: 'Sarah M.',
      role: 'Business Executive',
      text: 'I wear my Minimalist Gold every day. It transitions perfectly from the boardroom to evening galas. Exceptional customer service as well.',
      rating: 5,
      image: 'https://i.pinimg.com/1200x/33/ed/a9/33eda92bdcba34fb3f94a7d8ab86db51.jpg',
    },
    {
      name: 'David R.',
      role: 'Diving Enthusiast',
      text: 'The Ocean Diver Pro accompanied me on my recent deep-sea expedition. Flawless performance and it looks incredible. Highly recommended.',
      rating: 5,
      image: 'https://i.pinimg.com/736x/82/b6/9f/82b69f4fae244ecd8ca6059076148326.jpg',
    },
  ];

  return (
    <section className="py-12 px-12 bg-gray-50 text-gray-900 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D6B16A]/10 blur-[140px] pointer-events-none rounded-full" />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
    
    {/* Left Column: Title & Testimonial Content */}
    <div className="lg:col-span-7 order-1 space-y-6">
      
      {/* Header */}
      <div>
        <span className="inline-block bg-[#FAF8F5] border border-[#D6B16A]/40 text-[#B88E39] font-semibold tracking-[0.2em] uppercase text-xs px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          What Our Clients <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88E39] via-[#D6B16A] to-[#8C661D]">
            Say About Us
          </span>
        </h2>
      </div>

      {/* Swiper Content */}
      <div className="relative pt-4">
        <FaQuoteLeft className="text-5xl text-[#D6B16A]/20 absolute -top-4 -left-2 pointer-events-none" />

        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{ 
            clickable: true, 
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#D6B16A] !w-8 transition-all duration-300' 
          }}
          className="pb-14"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="space-y-3">
                {/* Rating */}
                <div className="flex text-[#D6B16A]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="mr-1 text-lg" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-xl text-gray-700 font-light italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Meta */}
                <div>
                  <h3 className="font-bold text-gray-900 text-xl tracking-wide">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#B88E39] font-medium text-xs sm:text-sm uppercase tracking-widest mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>

    {/* Right Column: Testimonial Image Showcase */}
    <div className="lg:col-span-5 order-2">
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl h-[420px] ">
        <img
          src={testimonials[activeIndex].image}
          alt={testimonials[activeIndex].name}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Floating Badge on Image */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
          <p className="text-xs uppercase font-bold text-[#B88E39] tracking-widest">Verified Collector</p>
          <h4 className="font-bold text-gray-900 text-base mt-0.5">{testimonials[activeIndex].name}</h4>
        </div>
      </div>
    </div>

  </div>
</div>
    </section>
  );
}