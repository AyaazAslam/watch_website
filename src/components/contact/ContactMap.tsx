import { MapPin, Navigation, Clock, Phone, Sparkles, ExternalLink, Store } from "lucide-react";

function ContactMap() {
  // Exact coordinates from client link
  const EXACT_LAT = "31.7210989";
  const EXACT_LNG = "72.9668165";

  const SHOWROOM = {
    name: "TimeZone Flagship Store",
    city: "Punjab, Pakistan",
    address: "Vicky Hardware Store Building, Main Market",
    phone: "+92 306 6088830",
    secondPhone: "+92 318 6088730",
    hours: "Mon - Sat: 11:00 AM - 10:00 PM",
    // Exact short link provided
    directMapUrl: "https://www.google.com/maps/@31.7210989,72.9668165,16.97z?entry=ttu",
    // Embed map using precise coordinates
    mapEmbedUrl: `https://maps.google.com/maps?q=${EXACT_LAT},${EXACT_LNG}&t=&z=17&ie=UTF8&iwloc=&output=embed`,
  };

  return (
    <section className="bg-[#FAF9F6] py-12 px-4 sm:px-12 lg:px-16 border-t border-gray-200/80 relative overflow-hidden text-left">
      
      {/* Ambient Gold Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D6B16A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D6B16A]/30 text-[#B88E39] text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles size={13} />
            Visit Our Boutique
          </span>

          <h2 className="text-3xl sm:text-4xl  font-bold text-gray-900 tracking-tight">
            Find Us on the Map
          </h2>

          <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed">
            Visit <strong className="font-semibold text-gray-900">{SHOWROOM.name}</strong> to explore our full collection of luxury timepieces, try on models, and speak with our horology specialists in person.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-sm border border-gray-200/80 bg-white">
          
          {/* Embedded Google Map with exact coordinates */}
          <iframe
            src={SHOWROOM.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${SHOWROOM.name} Location`}
            className="w-full h-full filter contrast-[1.02] saturate-[0.9]"
          ></iframe>

          {/* Floating Info Overlay Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xl max-w-xs sm:max-w-sm space-y-4">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#181818] text-[#D6B16A] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className=" font-bold text-gray-900 text-base">{SHOWROOM.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {SHOWROOM.address}
                </p>
              </div>
            </div>

            {/* Store Tag Badge */}
            <div className="flex items-center gap-2 bg-[#FAF9F6] px-3 py-2 rounded-xl text-xs font-medium text-[#B88E39] border border-[#D6B16A]/20">
              <Store size={15} />
              <span>Flagship Boutique & Service Desk</span>
            </div>

            <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#B88E39] shrink-0" />
                <span>{SHOWROOM.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#B88E39] shrink-0" />
                <span>{SHOWROOM.phone}</span>
              </div>
            </div>

            {/* Direct Navigation Button */}
            <a
              href={SHOWROOM.directMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#181818] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-all duration-300 group"
            >
              <Navigation size={14} className="text-[#D6B16A]" />
              <span>Open Exact Location</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform opacity-70" />
            </a>

          </div>
        </div>

        {/* Action Pills Below Map */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gray-800">
          <a
            href={SHOWROOM.directMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200/80 shadow-xs hover:border-[#D6B16A] hover:text-[#B88E39] transition-all"
          >
            <Navigation size={14} className="text-[#B88E39]" /> Get Directions
          </a>

          <a
            href={`tel:${SHOWROOM.phone}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-gray-200/80 shadow-xs hover:border-[#D6B16A] hover:text-[#B88E39] transition-all"
          >
            <Phone size={14} className="text-[#B88E39]" /> Call Showroom Desk
          </a>
        </div>

      </div>
    </section>
  );
}

export default ContactMap;