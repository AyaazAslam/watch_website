import React, { useRef, useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

interface VideoItem {
  id: string;
  videoUrl: string;
  posterImage: string;
  productName: string;
  price: string;
  productImage?: string;
}

interface ProductVideoSectionProps {
  videos?: VideoItem[];
  title?: string;
  backgroundColor?: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    videoUrl:
      'https://www.rohishwatches.com/cdn/shop/videos/c/vp/1f249d0b9fce462d892081d92a8d7245/1f249d0b9fce462d892081d92a8d7245.HD-720p-1.6Mbps-82662341.mp4?v=0',
    posterImage:
      'https://www.rohishwatches.com/cdn/shop/files/preview_images/1f249d0b9fce462d892081d92a8d7245.thumbnail.0000000000_1500x.jpg?v=1777125373',
    productName: 'Rolex DateJust',
    price: 'Rs. 379,900',
  },
  {
    id: 'video-2',
    videoUrl:
      'https://www.rohishwatches.com/cdn/shop/videos/c/vp/51e1b696082f47c88024116621db4067/51e1b696082f47c88024116621db4067.HD-720p-1.6Mbps-82662337.mp4?v=0',
    posterImage:
      'https://www.rohishwatches.com/cdn/shop/files/preview_images/51e1b696082f47c88024116621db4067.thumbnail.0000000000_1500x.jpg?v=1777125369',
    productName: 'Omega MoonSwatch',
    price: 'Rs. 440,000',
  },
  {
    id: 'video-3',
    videoUrl:
      'https://www.rohishwatches.com/cdn/shop/videos/c/vp/6e2db2d682a94fedb4dd2af8baf8e4ca/6e2db2d682a94fedb4dd2af8baf8e4ca.HD-720p-1.6Mbps-82662340.mp4?v=0',
    posterImage:
      'https://www.rohishwatches.com/cdn/shop/files/preview_images/6e2db2d682a94fedb4dd2af8baf8e4ca.thumbnail.0000000000_1500x.jpg?v=1777125366',
    productName: 'Tissot PRX',
    price: 'Rs. 320,000',
  },
  {
    id: 'video-4',
    videoUrl:
      'https://www.rohishwatches.com/cdn/shop/videos/c/vp/dab7c22c2d834434a1ba19410b646fd2/dab7c22c2d834434a1ba19410b646fd2.HD-720p-1.6Mbps-82662334.mp4?v=0',
    posterImage:
      'https://www.rohishwatches.com/cdn/shop/files/preview_images/dab7c22c2d834434a1ba19410b646fd2.thumbnail.0000000000_1500x.jpg?v=1777125370',
    productName: 'Patek Philippe',
    price: 'Rs. 310,000',
  },
  {
    id: 'video-5',
    videoUrl:
      'https://skmei.com.pk/cdn/shop/videos/c/vp/c1506b5ca7b04f038e49edd1a036e803/c1506b5ca7b04f038e49edd1a036e803.HD-1080p-2.5Mbps-81062283.mp4?v=0',
    posterImage: '',
    productName: 'Skmei Sport Watch',
    price: 'Watch World',
  },
  {
    id: 'video-6',
    videoUrl:
      'https://skmei.com.pk/cdn/shop/videos/c/vp/3fd102ceb3eb4786a8324ff5e5a85594/3fd102ceb3eb4786a8324ff5e5a85594.HD-1080p-2.5Mbps-81062530.mp4?v=0',
    posterImage: '',
    productName: 'Skmei Classic',
    price: 'Watch World',
  },
  {
    id: 'video-7',
    videoUrl:
      'https://skmei.com.pk/cdn/shop/videos/c/vp/b553da03fafe42bca3738414915987bd/b553da03fafe42bca3738414915987bd.HD-1080p-2.5Mbps-81062531.mp4?v=0',
    posterImage: '',
    productName: 'Skmei Premium',
    price: 'Watch World',
  },
  {
    id: 'video-8',
    videoUrl:
      'https://skmei.com.pk/cdn/shop/videos/c/vp/afa88dcef4e74236b34b74a8d83a87e2/afa88dcef4e74236b34b74a8d83a87e2.HD-1080p-2.5Mbps-81062529.mp4?v=0',
    posterImage: '',
    productName: 'Skmei Exclusive',
    price: 'Watch World',
  },
];

const VideoPlayer: React.FC<{ video: VideoItem }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <video
      ref={videoRef}
      playsInline
      muted
      loop
      preload="metadata"
      {...(video.posterImage ? { poster: video.posterImage } : {})}
      className="w-full h-full object-cover aspect-[9/16]"
    >
      <source src={video.videoUrl} type="video/mp4" />
    </video>
  );
};

const ProductVideoSection: React.FC<ProductVideoSectionProps> = ({
  videos = DEFAULT_VIDEOS,
  title = 'PRODUCT VIDEOS',
  backgroundColor = '#FFFFFF',
}) => {
  return (
    <section
      className="w-full px-4 py-12 md:py-20 text-[#0D0B0A] border-t border-b border-stone-200"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={title} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {videos.map((video) => (
            <div key={video.id} className="min-w-0">
              <div className="flex flex-col h-full rounded-xl sm:rounded-2xl bg-stone-50 p-2 sm:p-3 border border-stone-200 hover:border-[#AC7A37] transition-all duration-500 shadow-sm hover:shadow-xl group">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-black border border-stone-200">
                  <VideoPlayer video={video} />
                </div>

                <div className="flex items-center w-full mt-2 sm:mt-3 pt-2 border-t border-stone-200 gap-1">
                  {(video.productImage || video.posterImage) && (
                    <div className="flex-shrink-0 hidden sm:block">
                      <img
                        src={video.productImage || video.posterImage}
                        alt={video.productName}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover border border-stone-300 group-hover:border-[#AC7A37] transition-colors"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 sm:px-3">
                    <div className="text-[11px] md:text-sm font-bold text-[#0D0B0A] truncate group-hover:text-[#AC7A37] transition-colors">
                      {video.productName || 'Luxury Timepiece'}
                    </div>
                    <div className="text-[11px] md:text-sm font-extrabold text-[#AC7A37] mt-0.5 truncate">
                      {video.price}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex-shrink-0 size-10 rounded-full bg-[#0D0B0A] text-[#AC7A37] border border-[#0D0B0A] flex items-center justify-center hover:bg-[#AC7A37] hover:text-[#0D0B0A] hover:border-[#AC7A37] transition-all duration-300 shadow-md"
                    aria-label="View Product"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductVideoSection;
