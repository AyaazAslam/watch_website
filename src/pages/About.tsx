import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHero />
      <OurStory />
      
      {/* Values Section */}
      <section className="py-20 bg-[#262626] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-[#262626] rounded-xl hover:border-[#D6B16A] transition-colors duration-300">
              <h3 className="text-xl font-semibold text-[#D6B16A] mb-4">Precision</h3>
              <p className="text-gray-400">Every micro-component is crafted to absolute perfection, ensuring lifelong accuracy.</p>
            </div>
            <div className="p-6 border border-[#262626] rounded-xl hover:border-[#D6B16A] transition-colors duration-300">
              <h3 className="text-xl font-semibold text-[#D6B16A] mb-4">Elegance</h3>
              <p className="text-gray-400">Our designs transcend time, combining classic aesthetics with modern sensibilities.</p>
            </div>
            <div className="p-6 border border-[#262626] rounded-xl hover:border-[#D6B16A] transition-colors duration-300">
              <h3 className="text-xl font-semibold text-[#D6B16A] mb-4">Heritage</h3>
              <p className="text-gray-400">Rooted in centuries of horological mastery, passed down through generations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
