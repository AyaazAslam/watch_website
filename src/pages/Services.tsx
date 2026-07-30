import ServiceCard from '../components/services/ServiceCard';
import { FaWrench, FaShieldAlt, FaCertificate, FaGem, FaShippingFast, FaSyncAlt } from 'react-icons/fa';

function Services() {
  const services = [
    { icon: <FaWrench />, title: 'Expert Servicing', description: 'Comprehensive maintenance by master horologists to keep your timepiece running flawlessly.' },
    { icon: <FaShieldAlt />, title: 'Restoration', description: 'Careful and authentic restoration of vintage pieces, preserving their original character.' },
    { icon: <FaCertificate />, title: 'Authentication', description: 'Rigorous verification and certification of pre-owned luxury watches.' },
    { icon: <FaGem />, title: 'Customization', description: 'Bespoke engravings and custom strap fittings tailored to your personal taste.' },
    { icon: <FaShippingFast />, title: 'Insured Shipping', description: 'Secure, fully insured global delivery for all purchases and service items.' },
    { icon: <FaSyncAlt />, title: 'Trade-In Program', description: 'Upgrade your collection with our fair and transparent trade-in valuation services.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Services Header */}
      <div className="bg-[#262626] text-white pt-32 pb-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-6">Our <span className="text-[#D6B16A]">Services</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Beyond crafting exceptional timepieces, we provide a suite of premium services to ensure your watch remains a treasured heirloom.</p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
