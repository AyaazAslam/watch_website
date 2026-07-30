import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do your watches come with a warranty?',
      answer: 'Yes, every ChronoCraft timepiece comes with a comprehensive lifetime warranty covering manufacturing defects and internal mechanism failures.',
    },
    {
      question: 'Are the watches water-resistant?',
      answer: 'Water resistance varies by model. Our Diver collection is resistant up to 300m, while our Dress watches are typically resistant up to 50m. Please check the specific product details.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'We offer complimentary insured express shipping globally. Delivery typically takes 2-5 business days depending on your location and customs processing.',
    },
    {
      question: 'Can I return or exchange my watch?',
      answer: 'We offer a 30-day return policy for unworn watches in their original packaging with all documentation intact.',
    },
    {
      question: 'Do you offer watch servicing?',
      answer: 'Absolutely. We recommend servicing your watch every 3-5 years. Our master horologists provide comprehensive maintenance to ensure peak performance.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#D6B16A]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl h-[420px] sm:h-[520px] group">
              <img
                src="https://i.pinimg.com/1200x/98/af/70/98af702fcbaec73b80cf82758399b8ee.jpg"
                alt="Horology Excellence"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D6B16A]/40 flex items-center justify-center text-[#B88E39] shrink-0">
                    <FaQuestionCircle className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#B88E39] uppercase tracking-wider">24/7 Concierge</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">Need custom assistance?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title & FAQ Accordion */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            
            {/* Header */}
            <div>
              <span className="inline-block bg-[#FAF8F5] border border-[#D6B16A]/40 text-[#B88E39] font-semibold tracking-[0.2em] uppercase text-xs px-4 py-1.5 rounded-full mb-4 shadow-sm">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-gray-900 leading-tight">
                Frequently Asked <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88E39] via-[#D6B16A] to-[#8C661D]">
                  Questions
                </span>
              </h2>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-[#D6B16A] shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    <button
                      className="w-full px-5 py-2 text-left flex justify-between items-center focus:outline-none gap-4"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className={`font-semibold text-base sm:text-lg transition-colors ${
                        isOpen ? 'text-[#B88E39]' : 'text-gray-900'
                      }`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`shrink-0 text-sm ${isOpen ? 'text-[#B88E39]' : 'text-gray-400'}`}
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-5 text-gray-600 text-sm sm:text-base font-light leading-relaxed border-t border-gray-100 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}