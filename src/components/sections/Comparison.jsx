import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Sparkles, Timer } from 'lucide-react';
import { comparisons } from '../../data/content';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ComparisonSlider = ({ beforeImage, afterImage, title, description }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    e.preventDefault();
    console.log('Mouse down on handle'); // Debug
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    console.log('Mouse moving'); // Debug
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    console.log('Mouse up'); // Debug
    setIsDragging(false);
  };

  // Touch Events  
  const handleTouchStart = (e) => {
    e.preventDefault();
    console.log('Touch start on handle'); // Debug
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length === 0) return;
    e.preventDefault();
    console.log('Touch moving'); // Debug
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    console.log('Touch end'); // Debug
    setIsDragging(false);
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      console.log('Adding global listeners'); // Debug
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        console.log('Removing global listeners'); // Debug
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div className="comparison-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden select-none"
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img 
            src={beforeImage} 
            alt="Vorher" 
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Vorher
          </div>
        </div>

        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          <img 
            src={afterImage} 
            alt="Nachher" 
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Nachher
          </div>
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-all duration-200 border-4 border-purple-500"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            draggable={false}
          >
            <div className="w-6 h-6 flex items-center justify-center space-x-1">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Comparison = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section id="comparison" className="section-padding bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Timer className="w-4 h-4" />
            <span>VORHER & NACHHER</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Die
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Erleben Sie die magische Verwandlung von gewöhnlichen Fotos zu außergewöhnlichen Kunstwerken. 
            Bewegen Sie den Schieberegler oder klicken Sie, um die Unterschiede zu erkunden.
          </p>
        </div>

        {/* Desktop Version - Manual Navigation */}
        <div className="hidden lg:block">
          <div className="max-w-4xl mx-auto">
            <ComparisonSlider
              beforeImage={comparisons[activeSlide].before}
              afterImage={comparisons[activeSlide].after}
              title={comparisons[activeSlide].title}
              description={comparisons[activeSlide].description}
            />
          </div>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button 
              onClick={() => setActiveSlide(prev => prev > 0 ? prev - 1 : comparisons.length - 1)}
              className="comparison-prev w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-purple-600 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {comparisons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'bg-purple-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setActiveSlide(prev => prev < comparisons.length - 1 ? prev + 1 : 0)}
              className="comparison-next w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-purple-600 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Version - Grid */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          {comparisons.map((comparison) => (
            <ComparisonSlider
              key={comparison.id}
              beforeImage={comparison.before}
              afterImage={comparison.after}
              title={comparison.title}
              description={comparison.description}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Transformierte Bilder</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Timer className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">3-7</h3>
            <p className="text-gray-600">Tage Bearbeitungszeit</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Zufriedene Kunden</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;