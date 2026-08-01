import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

export default function ServiceCard({ icon, title, description, delay }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 text-center group"
    >
      <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-[#D6B16A] text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
