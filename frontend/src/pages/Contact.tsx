import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import SectionHeading from '../components/common/SectionHeading';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappGreeting, whatsappHref } from '../data/brand';

function Contact() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <ContactHero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeading
          title="Get In Touch"
          subtitle="Call, email, or message us on WhatsApp"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-12 text-center">
          <a
            href={whatsappHref(
              whatsappGreeting('I would like to inquire about a watch.'),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1ebe57] transition-colors shadow-sm"
          >
            <FaWhatsapp size={18} />
            Book On WhatsApp
          </a>
        </div>
      </section>

      <ContactMap />
    </div>
  );
}

export default Contact;
