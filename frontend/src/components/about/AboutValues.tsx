import { ShieldCheck, Truck, HeadphonesIcon, Gem } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { BRAND } from '../../data/brand';

const VALUES = [
  {
    icon: Gem,
    title: 'Curated Quality',
    description:
      'Every timepiece undergoes detailed inspection for finish, weight, and movement reliability before dispatch.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Buying',
    description:
      'Transparent pricing, damage-proof packaging, and guaranteed authentic customer support from order to delivery.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description:
      'Express courier delivery across Pakistan, ensuring your watch arrives safely and ready to wear.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Direct Assistance',
    description:
      'Connect via WhatsApp for instant advice, live product video previews, and dedicated after-sales care.',
  },
];

function AboutValues() {
  return (
    <section className="py-12 bg-gradient-to-b from-[#FAF8F5] via-[#F8F9FB] to-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          title="Our Core Values"
          subtitle={`What guides every ${BRAND.name} experience`}
        />

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col items-center text-center p-6 sm:p-8 bg-white border border-stone-200/80 rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#AC7A37]/50 hover:shadow-xl hover:shadow-[#AC7A37]/5 h-full"
              >
                {/* Icon Container with Dual Glow Effect */}
                <div className="relative mb-6">
                  <div className="size-16 rounded-2xl bg-[#0D0B0A]/[0.03] border border-stone-200/80 flex items-center justify-center transition-all duration-300 group-hover:bg-[#AC7A37] group-hover:border-[#AC7A37] group-hover:scale-110 shadow-xs">
                    <Icon
                      size={24}
                      className="text-[#AC7A37] group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0D0B0A] mb-3">
                  {item.title}
                </h3>

                {/* Animated Gold Line */}
                <div className="w-8 group-hover:w-16 h-0.5 bg-[#AC7A37] mb-4 rounded-full transition-all duration-300 ease-out opacity-80" />

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default AboutValues;