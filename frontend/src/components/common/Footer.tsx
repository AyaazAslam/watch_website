import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { BRAND, mailtoHref, telHref } from '../../data/brand';

const QUICK_LINKS = [
  { name: 'About Us', path: '/about' },
  { name: 'Featured Watches', path: '/collection' },
  { name: 'Services', path: '/services' },
  { name: 'Contact Support', path: '/contact' },
];

const CARE_LINKS = [
  { name: 'Shipping Policy', path: '/shipping-policy' },
  { name: 'Returns & Refunds', path: '/returns' },
  { name: 'Warranty Information', path: '/warranty' },
  { name: 'Track Your Order', path: '/track-order' },
  { name: 'FAQs', path: '/#faq' },
];

const SOCIALS = [
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaFacebookF, label: 'Facebook', href: '#' },
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
];

const FooterLink = ({ name, path }: { name: string; path: string }) => {
  const className =
    'inline-block relative group/link py-0.5 transition-colors hover:text-[#AC7A37]';

  const content = (
    <>
      <span>{name}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#AC7A37] transition-all duration-300 ease-out group-hover/link:w-full" />
    </>
  );

  if (path.startsWith('/#')) {
    return (
      <a href={path} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link to={path} className={className}>
      {content}
    </Link>
  );
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#0D0B0A] text-stone-100 pt-16 pb-8 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-stone-800/80">
          {/* Brand & Contacts */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="text-[#AC7A37] text-base font-black uppercase tracking-[0.12em]">
                {BRAND.name}
              </h3>
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Discover luxury craftsmanship and precision engineering. Exquisite
              timepieces curated for watch enthusiasts.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-stone-400">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#AC7A37]" />
                <span className="text-xs tracking-wide leading-relaxed text-stone-300">
                  {BRAND.addressFull}
                </span>
              </div>

              <div className="flex items-center gap-3 text-stone-400">
                <Mail size={16} className="flex-shrink-0 text-[#AC7A37]" />
                <a
                  href={mailtoHref()}
                  className="text-xs tracking-wide text-stone-300 hover:text-[#AC7A37] transition-colors break-all"
                >
                  {BRAND.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-stone-400">
                <Phone size={16} className="flex-shrink-0 text-[#AC7A37]" />
                <a
                  href={telHref()}
                  className="text-xs tracking-wide text-stone-300 hover:text-[#AC7A37] transition-colors"
                >
                  {BRAND.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-stone-200 text-xs font-bold uppercase tracking-[0.15em]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {QUICK_LINKS.map((item) => (
                <li key={item.name}>
                  <FooterLink name={item.name} path={item.path} />
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-stone-200 text-xs font-bold uppercase tracking-[0.15em]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {CARE_LINKS.map((item) => (
                <li key={item.name}>
                  <FooterLink name={item.name} path={item.path} />
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-stone-200 text-xs font-bold uppercase tracking-[0.15em]">
              Newsletter Signup
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Subscribe to get exclusive access to luxury releases, private
              offers, and new arrivals.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex flex-col sm:relative sm:flex-row sm:items-center gap-2 sm:gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-stone-900/80 border border-stone-800 rounded-full pl-4 pr-4 sm:pr-28 py-3 text-xs text-stone-100 focus:outline-none focus:border-[#AC7A37] transition-colors placeholder-stone-500 min-h-11"
                  required
                />
                <button
                  type="submit"
                  className="sm:absolute sm:right-1 sm:top-1 sm:bottom-1 bg-[#AC7A37] text-[#0D0B0A] px-4 py-3 sm:py-0 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-stone-100 transition-colors inline-flex items-center justify-center gap-1.5 min-h-11 sm:min-h-0"
                >
                  <span>Subscribe</span>
                  <Send size={11} />
                </button>
              </div>

              {subscribed && (
                <p className="text-[#AC7A37] text-xs pt-1 flex items-center gap-1 font-medium">
                  <ShieldCheck size={14} /> Thank you for subscribing!
                </p>
              )}
            </form>

            <div className="pt-2">
              <span className="text-[10px] text-stone-500 uppercase tracking-widest block mb-3 font-semibold">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="size-8 rounded-full bg-stone-900 border border-stone-800 hover:border-[#AC7A37] hover:bg-[#AC7A37] text-stone-400 hover:text-[#0D0B0A] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left text-[11px] font-medium tracking-wide">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-stone-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <CreditCard size={14} className="text-[#AC7A37]" /> Cash on Delivery
              Available
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#AC7A37]" /> 100% Authentic
              Timepieces
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
