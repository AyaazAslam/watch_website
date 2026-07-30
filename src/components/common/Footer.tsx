import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#262626] text-white pt-20 pb-10 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold tracking-widest text-white uppercase mb-6 inline-block">
              Chrono<span className="text-[#D6B16A]">Craft</span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              Crafting timeless elegance for the modern individual. Our pieces are more than watches; they are a statement of legacy and precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-gray-400 hover:text-[#D6B16A] hover:border-[#D6B16A] transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-gray-400 hover:text-[#D6B16A] hover:border-[#D6B16A] transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-gray-400 hover:text-[#D6B16A] hover:border-[#D6B16A] transition-all">
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#D6B16A] font-semibold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><a href="/#collection" className="text-gray-400 hover:text-white transition-colors">Collection</a></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D6B16A] font-semibold uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>123 Luxury Avenue, Suite 100</li>
              <li>Geneva, Switzerland 1204</li>
              <li>contact@chronocraft.com</li>
              <li>+41 22 123 4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#262626] text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ChronoCraft. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
