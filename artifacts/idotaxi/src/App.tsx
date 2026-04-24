import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import Fleet from "./components/Fleet";
import AppFeatures from "./components/AppFeatures";
import ServiceAreas from "./components/ServiceAreas";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-[#0a1736] min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-[#d4af37] selection:text-[#0a1736]">
      <Navbar />
      <Hero />
      <WhyUs />
      <Services />
      <Fleet />
      <AppFeatures />
      <ServiceAreas />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;