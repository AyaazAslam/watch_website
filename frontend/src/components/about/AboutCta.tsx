import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { MapPin, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { BRAND, whatsappGreeting, whatsappHref } from '../../data/brand';

function AboutCta() {
  return (
    <section className="relative py-12 bg-[#0D0B0A] border-t border-stone-800/80 overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#AC7A37]/10 blur-[120px] rounded-full pointer-events-none -z-0" 
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <SectionHeading
          light
          title="Visit Or Order Direct"
          subtitle="Browse our curated collection online or connect directly with our horological advisors to secure your timepiece."
          className="mb-10"
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
          {/* Collection CTA */}
          <Link
            to="/#collection"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#AC7A37] text-[#0D0B0A] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-[#AC7A37]/20 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
          >
            <span>Explore Collection</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* WhatsApp CTA */}
          <a
            href={whatsappHref(
              whatsappGreeting('I would like to know more about your watches.'),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
          >
            <FaWhatsapp size={18} className="transition-transform group-hover:scale-110" />
            <span>Book On WhatsApp</span>
          </a>
        </div>

        {/* Physical Store Location Badge */}
        <div className="mt-12 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-stone-900/80 border border-stone-800 text-stone-400">
          <MapPin size={14} className="text-[#AC7A37] shrink-0" />
          <span className="text-[11px] uppercase tracking-[0.16em] font-medium">
            {BRAND.addressLine} · {BRAND.city}
          </span>
        </div>

      </div>
    </section>
  );
}

export default AboutCta;