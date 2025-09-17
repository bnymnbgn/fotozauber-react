// src/components/sections/Services.jsx

import { useState, useEffect } from "react";
import { Wand2, Image, Sparkles, Zap, ArrowRight, Check } from "lucide-react";
import { services } from "../../data/content";
import CustomSwiper from "../ui/CustomSwiper";

const iconMapping = {
  "retusche-icon.svg": Image,
  "compositing-icon.svg": Wand2,
  "ki-magie-icon.svg": Sparkles,
  "upscaling-icon.svg": Zap,
};

// Desktop-Karte (unverändert)
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMapping[service.icon] || Wand2;

  return (
    <div
      className={`service-card group relative bg-white rounded-2xl p-8 transition-all duration-500 cursor-pointer border-2 h-full flex flex-col ${
        isHovered
          ? "border-purple-200 shadow-2xl transform -translate-y-2"
          : "border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="icon-container mb-6 relative">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
              : "bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200"
          }`}
        >
          <IconComponent
            className={`w-8 h-8 transition-colors duration-300 ${
              isHovered ? "text-white" : "text-purple-600"
            }`}
          />
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-md opacity-30 -z-10 animate-pulse"></div>
        )}
      </div>
      <div className="content flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
          {service.description}
        </p>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="action-area mt-auto">
          <div className="flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700">
            <span>Mehr erfahren</span>
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-pink-50 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-50" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

// NEU: Funktion, die nur den *Inhalt* für die mobile Slider-Karte rendert
const renderServiceCardContent = (service) => {
  const IconComponent = iconMapping[service.icon] || Wand2;
  return (
    // Diese div füllt die Höhe der Slide aus und ordnet den Inhalt an.
    <div className="p-6 flex flex-col h-full">
      <div className="icon-container mb-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
          <IconComponent className="w-8 h-8 text-purple-600" />
        </div>
      </div>
      <div className="content flex-grow flex flex-col text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
          {service.description}
        </p>
        <ul className="space-y-2 mb-4 text-left">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="action-area mt-auto">
          <div className="flex items-center justify-center text-purple-600 font-medium text-sm">
            <span>Mehr erfahren</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
const Services = () => {
  // useEffect für Pagination-Styles bleibt unverändert

  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Header (unverändert) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>UNSERE LEISTUNGEN</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professionelle
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent pb-2">
              Bildbearbeitung
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Von der ersten Retusche bis zur finalen Magie - wir verwandeln Ihre
            Fotos in unvergessliche Kunstwerke mit modernster Technologie und
            kreativer Vision.
          </p>
        </div>

        {/* NUR FÜR MOBILE GERÄTE: Swiper mit "cards"-Effekt */}
        <div className="md:hidden">
          <CustomSwiper
            items={services}
            renderSlide={renderServiceCardContent}
            effect="slide" // Effekt auf 'slide' geändert
            slideClassName="bg-white rounded-2xl shadow-xl overflow-hidden h-full"
            swiperProps={{
              slidesPerView: 1.2,
              spaceBetween: 16,
              centeredSlides: true,
              loop: true,
              style: {
                paddingBottom: "50px", // Platz für Pagination
              },
              breakpoints: {
                // Responsive Anpassungen für etwas größere mobile Geräte
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
              },
            }}
          />
        </div>

        {/* NUR FÜR DESKTOP: Das ursprüngliche Grid-Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Call to Action - JETZT MIT VOLLER BREITE */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 mt-16">
        <div className="container text-center">
          <div className="p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Starten Sie Ihre Transformation
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Laden Sie Ihr Bild hoch und erleben Sie die Magie unserer
                Bearbeitung
              </p>
              <button
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg touch-optimized touch-feedback prevent-zoom"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Jetzt unverbindlich anfragen
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;
