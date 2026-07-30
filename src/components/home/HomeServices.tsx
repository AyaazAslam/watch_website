import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, RefreshCw, Layers, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number;
  image?: string;
  imageUrl?: string;
  tag?: string;
  reference?: string;
  description?: string;
}

interface HomeServicesProps {
  products?: Product[];
  whatsappNumber?: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Chronograph',
    category: 'Chronograph',
    price: 4850,
    image: 'https://i.pinimg.com/736x/1f/49/4d/1f494de22b86452b509ac08aa7be64b9.jpg',
    tag: 'Bestseller',
    reference: 'Ref. MC-2024-BLK',
    description: 'Crafted with a sleek matte black dial, triple chronograph sub-dials, and a high-beat automatic movement.',
  },
  {
    id: '2',
    name: 'Minimalist Gold Edition',
    category: 'Dress Watch',
    price: 3200,
    image: 'https://i.pinimg.com/1200x/6d/85/ad/6d85ad6b1c99acc85529ec058dbde15b.jpg',
    tag: 'Limited',
    reference: 'Ref. MG-18K-GLD',
    description: '18K rose gold casing with a minimal champagne dial and a genuine hand-stitched leather strap.',
  },
  {
    id: '3',
    name: 'Ocean Diver Pro 300M',
    category: 'Diver',
    price: 5400,
    image: 'https://i.pinimg.com/736x/17/ea/c9/17eac9b82786b1a63e2643d8071ceb96.jpg',
    tag: 'Pro Series',
    reference: 'Ref. OD-300-NAV',
    description: 'Engineered for deep-sea exploration featuring a ceramic unidirectional bezel and luminous hour markers.',
  },
];

export default function HomeServices({
  products = SAMPLE_PRODUCTS,
  whatsappNumber = '923000000000',
}: HomeServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const safeProducts = Array.isArray(products) ? products : SAMPLE_PRODUCTS;
  const categories = ['All', ...Array.from(new Set(safeProducts.map((p) => p?.category).filter(Boolean)))];

  const filteredProducts = safeProducts.filter((product) => {
    if (!product) return false;
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.reference || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getWhatsAppLink = (product: Product) => {
    const productName = product.name || 'Timepiece';
    const productRef = product.reference ? ` (${product.reference})` : '';
    const productPrice = typeof product.price === 'number' ? `$${product.price.toLocaleString()}` : '';

    const message = `Hello! I am interested in purchasing the *${productName}*${productRef} listed for *${productPrice}*. Please share more details.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="services" className="py-16 bg-[#FAFAFA] text-gray-900 relative overflow-hidden">
      {/* Background Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D6B16A]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D6B16A]/30 text-[#B88E39] text-xs font-semibold tracking-[0.2em] uppercase shadow-xs"
          >
            <Sparkles size={13} className="text-[#B88E39]" />
            Curated Collection
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl  font-bold text-gray-900 tracking-tight"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88E39] via-[#D6B16A] to-[#8C661D]">Timepieces</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed"
          >
            Explore our handcrafted luxury selection. Select a timepiece to inquire directly with our concierge.
          </motion.p>
        </div>

        {/* Filter Controls Bar */}
        {safeProducts.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-gray-200/80 shadow-xs">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search timepiece or ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50/50 text-gray-900 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/80 focus:border-[#D6B16A] focus:bg-white focus:outline-none transition-all placeholder-gray-400"
              />
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-3xl border border-gray-200/80 p-12 max-w-md mx-auto shadow-xs"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#D6B16A]/30 flex items-center justify-center mx-auto mb-4 text-[#B88E39]">
              <Layers className="w-6 h-6 opacity-80" />
            </div>
            <h3 className="text-lg  font-bold text-gray-900 mb-1">No Timepieces Found</h3>
            <p className="text-gray-500 text-xs font-normal leading-relaxed mb-6">
              {safeProducts.length === 0
                ? "No products available at the moment."
                : `No matching timepieces found under "${selectedCategory}".`}
            </p>

            {safeProducts.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all"
              >
                <RefreshCw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                if (!product) return null;

                const imageUrl =
                  product.image ||
                  product.imageUrl ||
                  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop';
                const name = product.name || 'Untitled Timepiece';
                const price = typeof product.price === 'number' ? product.price : 0;
                const category = product.category || 'Luxury Watch';

                return (
                  <motion.div
                    key={product.id || index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative bg-white rounded-3xl border border-gray-200/80 overflow-hidden hover:border-[#D6B16A]/60 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                  >
                    {/* Image Section */}
                    <div className="relative h-72 sm:h-80 bg-[#F4F4F5] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      
                      {/* Dark gradient overlay for visual depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Glass Tags */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/80 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full shadow-xs border border-white/40">
                          {category}
                        </span>

                        {product.tag && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D6B16A] text-white px-3 py-1 rounded-full shadow-xs">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      {/* Floating Reference Tag on Hover */}
                      <div className="absolute bottom-3.5 left-3.5 z-10">
                        <span className="text-[10px] font-mono bg-black/40 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-lg border border-white/10">
                          {product.reference || 'Ref. Horology Spec'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl  font-bold text-gray-900 group-hover:text-[#B88E39] transition-colors leading-tight line-clamp-1">
                          {name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-gray-500 font-normal mt-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">
                            Price
                          </span>
                          <span className="text-lg  font-bold text-gray-900">
                            ${price.toLocaleString()}
                          </span>
                        </div>

                        {/* Buy Button */}
                        <a
                          href={getWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-wide bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md transition-all duration-200 group/btn"
                        >
                          <FaWhatsapp size={14} className="fill-current" />
                          <span>Book On WhatsApp</span>
                          <ArrowUpRight size={13} className="text-white/70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}