import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CollectionHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

function CollectionHero({
  title = 'Our Collection',
  subtitle = 'Browse premium timepieces by brand, price, and availability.',
  backgroundImage = '/img/hero/sd1.png',
}: CollectionHeroProps) {
  const titleWords = title.trim().split(' ');
  const firstWord = titleWords[0];
  const remainingTitle = titleWords.slice(1).join(' ');

  return (
    <section className="relative min-h-[34vh] sm:min-h-[40vh] flex items-center py-14 sm:py-16 overflow-hidden bg-[#0D0B0A] text-stone-100 border-b border-stone-800/80">
      <div className="absolute inset-y-0 right-0 w-full md:w-2/3 z-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt="Watch World by Azdadkhan collection"
          className="w-full h-full object-cover object-right md:object-center opacity-40 md:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0A] via-[#0D0B0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-[#0D0B0A]/40" />
      </div>

      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#AC7A37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400 mb-6 backdrop-blur-md">
          <Link to="/" className="hover:text-[#AC7A37] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-stone-600" />
          <span className="text-stone-100">Collection</span>
        </nav>

        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.1em] sm:tracking-[0.18em] uppercase text-stone-100 break-words">
            <span className="text-[#AC7A37]">{firstWord}</span>
            {remainingTitle && ` ${remainingTitle}`}
          </h1>
          <div className="w-16 h-1 bg-[#AC7A37] mt-4 rounded-full" />
          <p className="text-xs md:text-sm lg:text-base mt-4 font-medium leading-relaxed tracking-wide text-stone-300">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CollectionHero;
