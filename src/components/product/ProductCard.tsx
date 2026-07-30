import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { FaWhatsapp } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  // Replace with actual WhatsApp number
  const whatsappNumber = '1234567890';
  const message = encodeURIComponent(
    `Hello! I'm interested in the "${product.name}" priced at $${product.price}. Could you provide more details?`
  );
  const waLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col"
    >
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#262626]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
          <span className="text-lg font-bold text-[#D6B16A] whitespace-nowrap ml-2">
            ${product.price}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 flex-grow">
          {product.description}
        </p>
        
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors duration-300 shadow-md hover:shadow-lg mt-auto"
        >
          <FaWhatsapp className="text-xl" />
          Buy on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
