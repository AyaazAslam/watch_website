import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function ContactHero() {
  return (
    <div className="relative bg-[#181818] py-20 sm:py-28 overflow-hidden border-b border-gray-800">
      {/* Background Image & Soft Gold Glow Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./img/slide2.png"
          alt="Contact Us"
          className="w-full h-full object-cover opacity-25 scale-105 transform transition-transform duration-1000"
        />
        {/* Dark Vignette & Gold Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/80 to-[#181818]/60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#D6B16A]/10 blur-[120px] pointer-events-none rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#D6B16A]/30 text-[#D6B16A] text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-md shadow-xs mx-auto">
          <Sparkles size={12} className="text-[#D6B16A]" />
          Concierge & Support
        </div>

        {/* Main Title with Serif Accent */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl  font-bold text-white tracking-tight">
          Contact <span className="text-[#D6B16A]">Us</span>
        </h1>

        {/* Description Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          Have questions or want to discuss a bespoke timepiece or custom project? Our concierge team is here to assist you every step of the way.
        </p>

        {/* Elegant Breadcrumbs */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md mt-4">
          <Link to="/" className="hover:text-[#D6B16A] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="text-white font-semibold">Contact Us</span>
        </div>

      </div>
    </div>
  );
}

export default ContactHero;