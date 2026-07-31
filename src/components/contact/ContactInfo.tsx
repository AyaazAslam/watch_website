import { MapPin, Phone, Mail, Clock, ArrowUpRight, Share2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

function ContactInfo() {
  const INFO_ITEMS = [
  {
    icon: <Phone size={20} className="text-[#B88E39]" />,
    title: "Concierge & Hotline",
    details: [
      { label: "+92 306 6088830", href: "tel:+923066088830" },
      { label: "+92 318 6088730", href: "tel:+923186088730" },
    ],
    actionLabel: "Call Concierge",
  },
  {
    icon: <Mail size={20} className="text-[#B88E39]" />,
    title: "Email Us",
    details: [
      { label: "info@timezonewatches.com", href: "mailto:info@timezonewatches.com" },
      { label: "support@timezonewatches.com", href: "mailto:support@timezonewatches.com" },
    ],
    actionLabel: "Send Email",
  },
  {
    icon: <MapPin size={20} className="text-[#B88E39]" />,
    title: "Visit Our Showroom",
    details: [
      { 
        label: "TimeZone Flagship Store", 
        href: "https://www.google.com/maps/@31.7210989,72.9668165,16.97z?entry=ttu" 
      },
      { label: "Punjab, Pakistan", href: null },
    ],
    actionLabel: "Get Directions",
  },
  {
    icon: <Clock size={20} className="text-[#B88E39]" />,
    title: "Showroom Hours",
    details: [
      { label: "Mon - Sat: 11:00 AM - 10:00 PM", href: null },
      { label: "Sunday: Closed", href: null },
    ],
    actionLabel: "Opening Hours",
  },
];

  const SOCIAL_LINKS = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={16} />,
      href: "https://www.facebook.com/share/1HTLatnou7/",
      hoverColor: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={18} />,
      href: "https://www.facebook.com/share/1HTLatnou7/",
      hoverColor: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={16} />,
      href: "https://www.tiktok.com/@woodacjr6lj?_r=1&_t=ZS-98RPvRY4sv2",
      hoverColor: "hover:bg-black hover:text-white hover:border-black",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Main Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {INFO_ITEMS.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white hover:bg-white/90 p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#D6B16A]/50 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle Accent Glow Bar on Hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6B16A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Section: Icon & Header */}
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] group-hover:bg-[#D6B16A]/10 flex items-center justify-center border border-gray-200/60 group-hover:border-[#D6B16A]/30 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Action Label Badge */}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#B88E39] transition-colors">
                  {item.actionLabel}
                  {item.details.some(d => d.href) && (
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </span>
              </div>

              <div>
                <h3 className="text-lg  font-bold text-gray-900 tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-1 text-left border-t border-gray-100 pt-3">
              {item.details.map((detail, i) => (
                detail.href ? (
                  <a
                    key={i}
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base text-gray-700 hover:text-[#B88E39] font-medium transition-colors leading-relaxed truncate"
                  >
                    {detail.label}
                  </a>
                ) : (
                  <p key={i} className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
                    {detail.label}
                  </p>
                )
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Social Media Bar Below */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] flex items-center justify-center text-[#B88E39] shrink-0 border border-gray-200/60">
            <Share2 size={18} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-gray-900">Follow Our Work</h4>
            <p className="text-xs text-gray-500 font-light">Explore our latest creations & updates</p>
          </div>
        </div>

        {/* Social Icons List */}
        <div className="flex items-center gap-2.5">
          {SOCIAL_LINKS.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`w-10 h-10 rounded-xl bg-[#FAF9F6] border border-gray-200/80 text-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${social.hoverColor}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;