import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, ShieldCheck } from 'lucide-react';

export default function HomeAbout() {
  return (
    <section className="py-12 bg-white text-gray-900 relative overflow-hidden">
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#D6B16A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 border border-[#D6B16A]/30 text-[#B89248] text-xs emibold tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B16A]" />
              Our Heritage
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl erif font-bold text-gray-900 leading-[1.15] tracking-tight">
              A Legacy of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89248] via-[#D6B16A] to-[#8C6820]">
                Uncompromising
              </span> Precision
            </h2>

            {/* Description Paragraph */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-light">
              Since our inception, ChronoCraft has been dedicated to the relentless pursuit of horological perfection. We merge centuries-old Swiss watchmaking traditions with modern precision engineering to create timepieces that are not merely instruments of time, but treasured heirlooms for generations.
            </p>

            {/* Trust Markers */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 my-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gray-50 text-[#B89248] border border-gray-200 shadow-sm">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Certified</h4>
                  <p className="text-xs text-gray-500">Swiss Chronometer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gray-50 text-[#B89248] border border-gray-200 shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Lifetime</h4>
                  <p className="text-xs text-gray-500">Master Warranty</p>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-2">
              <Link 
                to="/about" 
                className="group inline-flex items-center gap-3 bg-[#181818] hover:bg-[#D6B16A] text-white hover:text-[#181818] font-bold text-xs sm:text-sm uppercase tracking-[0.18em] px-5 py-2 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <span>Discover Our Story</span>
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
          
          {/* Right Column - Multi-Image Showcase Grid */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              
              {/* Main Photo (Left) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="col-span-7 relative z-10"
              >
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl group">
                  <img 
                    src="https://i.pinimg.com/1200x/92/9d/5d/929d5dd91d9c1b4c72b956228598147a.jpg" 
                    alt="Master watchmaker assembly" 
                    className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Stacked Images Column (Right) */}
              <div className="col-span-5 space-y-4 relative z-20">
                {/* Image 2: Gear Movement Close-up */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="rounded-xl overflow-hidden border border-gray-200 shadow-lg group"
                >
                  <img 
                    src="https://i.pinimg.com/1200x/1f/39/eb/1f39eb4788b706aac543ceddcb39de04.jpg" 
                    alt="Watch movement precision gears" 
                    className="w-full h-[170px] sm:h-[210px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Image 3: Finished Timepiece Detail */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="rounded-xl overflow-hidden border border-gray-200 shadow-lg group"
                >
                  <img 
                    src="https://i.pinimg.com/736x/36/20/96/3620966f9bc95103ab07931ed35fa12d.jpg" 
                    alt="ChronoCraft luxury watch dial" 
                    className="w-full h-[170px] sm:h-[210px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

            </div>

            {/* Floating Heritage Badge Overlay */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 left-6 sm:left-12 z-30 bg-white/95 backdrop-blur-xl border border-gray-200 p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs"
            >
              <div className="text-3xl sm:text-4xl erif font-bold text-[#B89248]">
                120<span className="text-xs text-gray-500 uppercase ans tracking-widest block">+ Years</span>
              </div>
              <div className="h-8 w-[1px] bg-gray-200" />
              <p className="text-xs text-gray-600 font-medium leading-tight">
                Continuous Swiss Horological Mastery
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}