import Hero from '../components/home/Hero';
import ShopByBrands from '../components/home/ShopByBrands';
import ProductGrid from '../components/home/ProductGrid';
import Features from '../components/home/Features';
import ProductVideo from '../components/home/ProductVideo';
import Testimonials from '../components/home/Testimonials';

function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Hero />
      <ShopByBrands />
      <ProductGrid />
      <ProductVideo />
      <Features />
      <Testimonials />
    </div>
  );
}

export default Home;
