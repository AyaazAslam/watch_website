import Hero from '../components/home/Hero';
import HomeAbout from '../components/home/HomeAbout';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HomeServices from '../components/home/HomeServices';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';

function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <HomeAbout />
      <WhyChooseUs />
      
      

      <HomeServices />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Home;
