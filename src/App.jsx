import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import Services from './components/sections/Services';
import Comparison from './components/sections/Comparison';
import About from './components/sections/About';
import Process from './components/sections/Process';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        <About />
        
        <Gallery />
        
        <Services />
        
        <Comparison />
        
        <Process />
        
        <Pricing />
        
        <FAQ />
        
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;