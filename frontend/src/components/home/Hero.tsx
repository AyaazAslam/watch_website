import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {   Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  const [isMobile, setIsMobile] = useState(false);

  const bannerImages = [
    {
      id: 1,
      key: "membershipPlan",
      alt: "Membership Plan Banner 1",
      desktopSrc: "/img/hero/sd1.png",
      mobileSrc: "/img/hero/im2.png",
    },
    {
      id: 2,
      key: "membershipPlan",
      alt: "Membership Plan Banner 2",
      desktopSrc: "/img/hero/sd4.png",
      mobileSrc: "/img/hero/im1.png",
    },
    {
      id: 3,
      key: "membershipPlan",
      alt: "Membership Plan Banner 3",
      desktopSrc: "/img/hero/sd2.png",
      mobileSrc: "/img/hero/im3.png",
    },
    {
      id: 4,
      key: "membershipPlan",
      alt: "Membership Plan Banner 3",
      desktopSrc: "/img/hero/sd5.png",
      mobileSrc: "/img/hero/im2.png",
    },
    {
      id: 5,
      key: "membershipPlan",
      alt: "Membership Plan Banner 3",
      desktopSrc: "/img/hero/sd6.png",
      mobileSrc: "/img/hero/im1.png",
    },
   
   
  ];

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        h-[50vh]
        sm:h-[58vh]
        md:h-[60vh]
        min-h-[260px]
        sm:min-h-[380px]
        [&_.swiper-pagination]:!bottom-4
        [&_.swiper-pagination-bullet]:bg-white/90
        [&_.swiper-pagination-bullet-active]:!bg-[#102A54]
      "
    >
      <Swiper
        modules={[  Autoplay]}
       
        
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        speed={800}
        className="w-full h-full"
      >
        {bannerImages.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={isMobile ? banner.mobileSrc : banner.desktopSrc}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

     

     
    </div>
  );
}