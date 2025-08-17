import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Button from '../ui/Button';

const Hero = () => {
  const imageStackRef = useRef(null);

  const handleScrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Kein 3D Parallax mehr - einfach nur Hover-Scale

  return (
    <section id="home" className="hero perspective-hero relative min-h-screen overflow-hidden">
      {/* Hintergrund-Gradient wie im Original */}
      <div className="hero-background absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
      
      {/* Professioneller Hauptcontainer */}
      <div 
        className="hero-container relative h-screen"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}
      >
        
        {/* Professionelle Textsektion */}
        <div 
          className="hero-text-section"
          style={{
            flex: '1',
            maxWidth: '600px',
            paddingRight: '4rem'
          }}
        >
          <div style={{ width: '100%' }}>
            
            {/* Professionelles Badge */}
            <div className="hero-badge inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>NOHA STUDIO PRÄSENTIERT</span>
            </div>
            
            {/* Professioneller Titel */}
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              <span className="block mb-2">Lebendige</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-3 glow-text">
                Magie
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-normal text-white/95">
                in jedem Bild
              </span>
            </h1>
            
            {/* Professionelle Beschreibung */}
            <p className="hero-description text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
              Verwandeln Sie Kinderfotografien in kunstvolle Fantasiewelten, die Erinnerungen bewahren und Emotionen für die Ewigkeit festhalten.
            </p>
            
            {/* Professionelle Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleScrollToGallery}
                className="btn-primary bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <span>Galerie entdecken</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleScrollToContact}
                className="btn-secondary border-white/30 text-white hover:bg-white hover:text-gray-900"
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </div>
        
        {/* Professionelle Bildsektion */}
        <div 
          className="hero-image-section"
          style={{
            flex: '1',
            maxWidth: '650px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            className="image-stack relative h-[600px] lg:h-[700px]"
            style={{ 
              width: '100%',
              maxWidth: '700px'
            }}
          >
            
            {/* Hinteres Bild - wie im Original */}
            <div className="image-container back absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer border-4 border-white"
                 style={{
                   width: '88%',
                   height: '88%',
                   top: 0,
                   right: '-5%',
                   transform: 'rotate(8deg) translateZ(-80px)',
                   zIndex: 1
                 }}>
              <img 
                src="/assets/img/TIGER Kopie2.jpg" 
                alt="Kreatives Kinderfoto" 
                className="hero-image w-full h-full object-cover"
              />
            </div>
            
            {/* Mittleres Bild - wie im Original */}
            <div className="image-container middle absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer border-4 border-white"
                 style={{
                   width: '88%',
                   height: '88%',
                   bottom: 0,
                   right: '30%',
                   transform: 'rotate(-4deg) translateZ(0)',
                   zIndex: 2
                 }}>
              <img 
                src="/assets/img/randombebe Kopie.jpg" 
                alt="Magische Kinderportraits" 
                className="hero-image w-full h-full object-cover"
              />
            </div>
            
            {/* Vorderes Bild - wie im Original */}
            <div className="image-container front absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer border-4 border-white"
                 style={{
                   width: '92%',
                   height: '92%',
                   top: '12%',
                   left: '5%',
                   transform: 'rotate(-10deg) translateZ(80px)',
                   zIndex: 3
                 }}>
              <img 
                src="/assets/img/Halid 1.jpg" 
                alt="Fantasiewelt für Kinder" 
                className="hero-image w-full h-full object-cover"
              />
            </div>
            
            {/* Dekorationselemente wie im Original */}
            <div className="decoration-element star absolute top-4 right-4 text-yellow-400 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="decoration-element magic absolute bottom-8 left-8 text-pink-400 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll-Indikator wie im Original */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer animate-bounce z-10"
           onClick={handleScrollToGallery}>
        <span className="text-white/70 text-sm mb-2 block">Entdecke mehr</span>
        <div className="scroll-icon w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto mb-2 relative">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
        <ChevronDown className="w-4 h-4 text-white/70 mx-auto animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;