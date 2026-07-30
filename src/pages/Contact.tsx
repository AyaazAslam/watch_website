import ContactForm from '../components/contact/ContactForm';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Header */}
      <div className="bg-[url('https://images.unsplash.com/photo-1549488344-c65075d9e504?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative pt-40 pb-32 text-center px-4">
        <div className="absolute inset-0 bg-[#262626]/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-4">Get in <span className="text-[#D6B16A]">Touch</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">We are here to assist you with any inquiries regarding our collection, services, or your recent order.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Visit our boutique to experience the craftsmanship of ChronoCraft in person, or reach out to our dedicated concierge team for personalized assistance.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D6B16A]/10 rounded-full flex items-center justify-center text-[#D6B16A] text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Our Boutique</h4>
                  <p className="text-gray-600">123 Luxury Avenue, Suite 100<br/>Geneva, Switzerland 1204</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D6B16A]/10 rounded-full flex items-center justify-center text-[#D6B16A] text-xl flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Phone</h4>
                  <p className="text-gray-600">+41 22 123 4567<br/>Mon-Fri, 9am - 6pm CET</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D6B16A]/10 rounded-full flex items-center justify-center text-[#D6B16A] text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Email</h4>
                  <p className="text-gray-600">contact@chronocraft.com<br/>support@chronocraft.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Component */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
