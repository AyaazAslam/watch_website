import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { BRAND, telHref } from '../../data/brand';

function ShowroomCard({
  name,
  address,
  phone,
  hours,
  directMapUrl,
}: {
  name: string;
  address: string;
  phone: string;
  hours: string;
  directMapUrl: string;
}) {
  return (
    <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200 shadow-lg space-y-4">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-full bg-[#0D0B0A] text-[#AC7A37] flex items-center justify-center shrink-0">
          <MapPin size={18} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-[#0D0B0A] text-sm uppercase tracking-wider break-words">
            {name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">{address}</p>
        </div>
      </div>

      <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-[#AC7A37] shrink-0" />
          <span>{hours}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-[#AC7A37] shrink-0" />
          <a href={telHref()} className="hover:text-[#AC7A37] transition-colors">
            {phone}
          </a>
        </div>
      </div>

      <a
        href={directMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full min-h-11 px-4 py-3 bg-[#0D0B0A] hover:bg-[#AC7A37] hover:text-[#0D0B0A] text-white text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors group"
      >
        <Navigation size={14} />
        <span>Open Location</span>
        <ExternalLink
          size={12}
          className="opacity-70 group-hover:translate-x-0.5 transition-transform"
        />
      </a>
    </div>
  );
}

function ContactMap() {
  const SHOWROOM = {
    name: BRAND.name,
    address: BRAND.addressFull,
    phone: BRAND.phoneDisplay,
    hours: 'Mon – Sat: 11:00 AM – 10:00 PM',
    directMapUrl:
      'https://www.google.com/maps/search/?api=1&query=Bolton+Market+M.A+Jinnah+Road+Karachi',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Bolton+Market+Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed',
  };

  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        <SectionHeading
          title="Find Us"
          subtitle={`Visit our showroom at ${BRAND.addressLine}, ${BRAND.city}`}
        />

        {/* Mobile: info below map so map stays usable */}
        <div className="sm:hidden space-y-4">
          <div className="relative w-full h-[280px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
            <iframe
              src={SHOWROOM.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${SHOWROOM.name} Location`}
              className="w-full h-full"
            />
          </div>
          <ShowroomCard {...SHOWROOM} />
        </div>

        {/* Desktop / tablet: floating card on map */}
        <div className="relative hidden sm:block w-full h-[480px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
          <iframe
            src={SHOWROOM.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${SHOWROOM.name} Location`}
            className="w-full h-full"
          />
          <div className="absolute top-6 left-6 z-20 max-w-sm">
            <ShowroomCard {...SHOWROOM} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={SHOWROOM.directMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 bg-white rounded-full border border-stone-200 text-xs font-semibold text-[#0D0B0A] hover:border-[#AC7A37] hover:text-[#AC7A37] transition-all"
          >
            <Navigation size={14} className="text-[#AC7A37]" /> Get Directions
          </a>
          <a
            href={telHref()}
            className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 bg-white rounded-full border border-stone-200 text-xs font-semibold text-[#0D0B0A] hover:border-[#AC7A37] hover:text-[#AC7A37] transition-all"
          >
            <Phone size={14} className="text-[#AC7A37]" /> Call Showroom
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
