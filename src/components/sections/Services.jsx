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
    <div className="p-8 h-full flex flex-col">
      <div className="icon-container mb-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
          <IconComponent className="w-8 h-8 text-purple-600" />
        </div>
      </div>
      <div className="content flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
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
          <div className="flex items-center text-purple-600 font-medium text-sm">
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
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
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
            // Wir übergeben die Container-Styles an die Slide
            slideClassName="bg-white rounded-2xl shadow-xl"
            // und rendern nur noch den Inhalt
            renderSlide={renderServiceCardContent}
            effect="cards"
            className="w-full h-[520px]"
            swiperProps={{
              style: {
                paddingBottom: "50px",
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

        {/* Call to Action (unverändert) */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute top-8 right-12 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute bottom-6 left-16 w-6 h-6 border-2 border-white rotate-45"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Bereit für die Transformation?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam magische Momente erschaffen, die ein
                Leben lang in Erinnerung bleiben.
              </p>
              <button
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Jetzt Anfrage stellen
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
