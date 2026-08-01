import { MapPin, Phone, Mail, Clock, ArrowUpRight, Share2 } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { BRAND, mailtoHref, telHref, whatsappHref } from '../../data/brand';

const INFO_ITEMS = [
  {
    icon: Phone,
    title: 'Call Us',
    details: [{ label: BRAND.phoneDisplay, href: telHref() }],
    actionLabel: 'Call Now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      {
        label: BRAND.email,
        href: mailtoHref(),
      },
    ],
    actionLabel: 'Send Email',
  },
  {
    icon: MapPin,
    title: 'Visit Showroom',
    details: [
      {
        label: BRAND.addressLine,
        href: 'https://www.google.com/maps/search/?api=1&query=Bolton+Market+Karachi',
      },
      { label: BRAND.city, href: null },
    ],
    actionLabel: 'Directions',
  },
  {
    icon: Clock,
    title: 'Store Hours',
    details: [
      { label: 'Mon – Sat: 11:00 AM – 10:00 PM', href: null },
      { label: 'Sunday: Closed', href: null },
    ],
    actionLabel: 'Hours',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    href: whatsappHref(),
    hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
  },
  {
    name: 'Facebook',
    icon: FaFacebookF,
    href: '#',
    hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: '#',
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent',
  },
];

function ContactInfo() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INFO_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group relative bg-white p-5 sm:p-6 rounded-2xl flex flex-col justify-between gap-4 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#AC7A37]/40 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#AC7A37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="size-10 rounded-full bg-[#0D0B0A]/5 border border-stone-200 group-hover:border-[#AC7A37]/40 group-hover:bg-[#AC7A37]/10 flex items-center justify-center transition-all">
                    <Icon size={18} className="text-[#AC7A37]" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#AC7A37]">
                    {item.actionLabel}
                    <ArrowUpRight
                      size={12}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0D0B0A]">
                  {item.title}
                </h3>
              </div>

              <div className="space-y-1 border-t border-stone-100 pt-3">
                {item.details.map((detail, i) =>
                  detail.href ? (
                    <a
                      key={i}
                      href={detail.href}
                      target={detail.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="block text-sm text-stone-600 hover:text-[#AC7A37] font-medium transition-colors break-all"
                    >
                      {detail.label}
                    </a>
                  ) : (
                    <p key={i} className="text-sm text-stone-500">
                      {detail.label}
                    </p>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#0D0B0A]/5 border border-stone-200 flex items-center justify-center text-[#AC7A37] shrink-0">
            <Share2 size={16} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0D0B0A]">Follow {BRAND.shortName}</h4>
            <p className="text-xs text-stone-500">Latest watches & offers</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`size-10 rounded-full bg-stone-50 border border-stone-200 text-stone-600 flex items-center justify-center transition-all duration-300 hover:scale-105 ${social.hoverClass}`}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
