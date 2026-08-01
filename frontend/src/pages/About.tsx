import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import AboutValues from '../components/about/AboutValues';
import AboutCta from '../components/about/AboutCta';

function About() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <AboutHero />
      <OurStory />
      <AboutValues />
      <AboutCta />
    </div>
  );
}

export default About;
