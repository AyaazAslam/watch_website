export default function ContactForm() {
  return (
    <form className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D6B16A] focus:border-transparent outline-none transition-all" placeholder="John" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D6B16A] focus:border-transparent outline-none transition-all" placeholder="Doe" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D6B16A] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D6B16A] focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
      </div>
      <button type="button" className="w-full bg-[#262626] text-white font-semibold py-4 rounded-lg hover:bg-[#D6B16A] transition-colors duration-300">
        Send Inquiry
      </button>
    </form>
  );
}
