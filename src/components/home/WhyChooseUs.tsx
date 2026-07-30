import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gem, ShieldCheck, Award, History, ArrowRight, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Gem className="w-6 h-6 text-[#D6B16A]" />,
      tag: "Craftsmanship",
      title: 'Master Precision',
      description: 'Hand-assembled in Switzerland using aerospace-grade grade-5 titanium, sapphire crystals, and hand-finished movements.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#D6B16A]" />,
      tag: "Guarantee",
      title: 'Lifetime Warranty',
      description: 'We stand resolutely behind every tick. Enjoy full global servicing and a comprehensive lifetime horological guarantee.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#D6B16A]" />,
      tag: "Provenance",
      title: 'NFT & Physical Certificate',
      description: 'Every timepiece features digital blockchain verification and tamper-proof documentation registered to your name.',
    },
    {
      icon: <History className="w-6 h-6 text-[#D6B16A]" />,
      tag: "Tradition",
      title: 'Centuries of Heritage',
      description: 'Rooted in classic horological mastery while pushing boundary-defying modern materials and silicon escapements.',
    },
  ];

  return (
    <section className="py-12 bg-[#121212] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D6B16A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D6B16A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Feature Cards + Right Narrative Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: 2x2 Feature Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative bg-[#1A1A1A]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-[#D6B16A]/50 transition-all duration-500 group overflow-hidden shadow-xl"
              >
                {/* Subtle Hover Gradient Fill */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D6B16A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Row: Icon & Category Tag */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-[#262626] border border-[#D6B16A]/30 flex items-center justify-center shadow-[0_0_15px_rgba(214,177,106,0.15)] group-hover:scale-110 group-hover:border-[#D6B16A] transition-all duration-300">
                    {reason.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6B16A]/80 bg-[#D6B16A]/10 px-3 py-1 rounded-full border border-[#D6B16A]/20">
                    {reason.tag}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl erif font-bold text-white mb-3 tracking-wide group-hover:text-[#D6B16A] transition-colors duration-300 relative z-10">
                  {reason.title}
                </h3>

                {/* Card Description */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light relative z-10">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Headline & Narrative */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 order-1 lg:order-2"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#222222] border border-[#D6B16A]/30 text-[#D6B16A] text-xs emibold tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(214,177,106,0.1)]">
              <Sparkles size={14} className="text-[#D6B16A]" />
              Why ChronoCraft
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl erif font-bold text-white leading-[1.15] tracking-tight">
              The Standard of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B16A] via-[#fcf6ba] to-[#B89248]">
                Horological Excellence
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              In a world of mass production, ChronoCraft stands apart. We blend timeless Swiss artistry with modern material engineering to deliver timepieces that transcend mere utility—becoming permanent markers of your legacy.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link 
                to="/#collection" 
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#D6B16A] via-[#c49e56] to-[#aa820a] hover:from-[#e4c483] hover:to-[#b89248] text-[#181818] font-bold text-xs sm:text-sm uppercase tracking-[0.18em] px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(214,177,106,0.25)] hover:shadow-[0_0_30px_rgba(214,177,106,0.45)] hover:scale-105 active:scale-95"
              >
                <span>Explore The Collection</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}