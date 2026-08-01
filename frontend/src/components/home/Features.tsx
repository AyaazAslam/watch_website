import React from 'react';
import { Truck, HeadphonesIcon, RefreshCw } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <Truck size={24} className="text-[#AC7A37] transition-transform duration-300 group-hover:scale-110" />,
    title: 'FAST SHIPPING',
    description: 'Fast shipping on all orders or orders above Rs. 5000',
  },
  {
    icon: <HeadphonesIcon size={24} className="text-[#AC7A37] transition-transform duration-300 group-hover:scale-110" />,
    title: 'SUPPORT 24/7',
    description: 'Contact us 24 hours a day, 7 days a week',
  },
  {
    icon: <RefreshCw size={24} className="text-[#AC7A37] transition-transform duration-300 group-hover:scale-110" />,
    title: '13 DAYS RETURN',
    description: 'Simply return it within 13 days for an exchange.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-[#0D0B0A] text-stone-100 border-t border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center p-6 md:p-8 rounded-2xl bg-stone-900/40 border border-stone-800/80 hover:border-[#AC7A37]/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_rgba(172,122,55,0.15)]"
            >
              {/* Icon Container with Gold Glow Effect */}
              <div className="w-16 h-16 rounded-full bg-[#0D0B0A] border border-[#AC7A37]/40 flex items-center justify-center mb-6 shadow-md group-hover:border-[#AC7A37] group-hover:bg-[#AC7A37]/10 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Feature Title with Animated Underline */}
              <h3 className="relative text-xs font-bold text-stone-200 uppercase tracking-[0.2em] mb-3 transition-colors duration-300 group-hover:text-[#AC7A37]">
                {feature.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#AC7A37] transition-all duration-300 ease-out group-hover:w-full" />
              </h3>

              {/* Feature Description */}
              <p className="text-xs text-stone-400 font-medium leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;