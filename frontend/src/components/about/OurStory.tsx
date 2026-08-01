import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Headphones } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { BRAND } from '../../data/brand';

const STATS = [
  { 
    value: '100%', 
    label: 'Quality Checked', 
    icon: ShieldCheck 
  },
  { 
    value: '13-Day', 
    label: 'Easy Returns', 
    icon: Clock 
  },
  { 
    value: '24/7', 
    label: 'WhatsApp Support', 
    icon: Headphones 
  },
];

function OurStory() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          title="Our Story"
          subtitle="Craftsmanship, trust, and timeless style"
        />

        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AC7A37]/10 text-[#AC7A37] text-xs font-semibold uppercase tracking-widest">
              <span>Established in Karachi</span>
            </div>

            <h3 className="text-2xl sm:text-4xl  font-bold text-[#0D0B0A] leading-tight">
              Redefining affordable luxury for watch enthusiasts across Pakistan.
            </h3>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                <span className="float-left text-4xl leading-none font-bold text-[#AC7A37] pr-2 pt-1">
                  W
                </span>
                atch World by Azdadkhan brings premium timepieces to enthusiasts who appreciate
                horological art. From classic luxury-inspired silhouettes to modern sporting dials,
                every watch in our catalog is hand-selected for pristine weight, finish, and everyday
                reliability.
              </p>
              <p>
                Operating directly from our showroom at {BRAND.addressLine}, {BRAND.city}, we bridge
                the gap between luxury aesthetics and honest, transparent pricing—backed by fast
                local shipping and direct WhatsApp assistance at {BRAND.phoneDisplay}.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-stone-100">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label} 
                    className="p-3 sm:p-4 rounded-xl bg-stone-50/80 border border-stone-100 text-center sm:text-left transition-transform hover:-translate-y-0.5"
                  >
                    <Icon size={18} className="text-[#AC7A37] mb-1.5 hidden sm:block" />
                    <p className="text-lg sm:text-2xl font-black text-[#0D0B0A] tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-semibold mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#0D0B0A] hover:text-[#AC7A37] group transition-colors"
              >
                <span>Read Full Brand Journey</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-6 relative">
              
              {/* Background Accent Backdrop */}
              <div className="absolute -inset-4 bg-stone-100/60 rounded-3xl -z-10 rotate-1 scale-95" />

              {/* Image 1: Main Feature */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-sm">
                <img
                  src="https://www.rohishwatches.com/cdn/shop/files/Rolextwotonewhite_a8fbabd1-e714-4b00-bbd9-cd9f059aeb5d.png?v=1782652767"
                  alt="Two-tone luxury watch"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200/60 shadow-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-800">Two-Tone Dial</span>
                </div>
              </div>

              {/* Image 2: Secondary Offset Feature */}
              <div className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-sm mt-8 sm:mt-12">
                <img
                  src="https://www.rohishwatches.com/cdn/shop/files/PatekWhite.png?v=1782626876"
                  alt="Premium Patek style watch"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200/60 shadow-xs">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-800">Precision Dial</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default OurStory;