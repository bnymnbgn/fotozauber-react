// src/components/sections/FAQ.jsx (Finale, bereinigte Version)

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Clock,
  DollarSign,
  Camera,
  Download,
  Shield,
  Star,
} from "lucide-react";
// Nur noch die kategorisierten FAQs werden importiert
import { faqCategories } from "../../data/content";

// "Übersetzungstabelle" für Icons bleibt
const iconMapping = {
  Shield,
  Clock,
  Camera,
  DollarSign,
  Download,
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section
      id="faq"
      className="section-padding bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-pink-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>HÄUFIGE FRAGEN</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Alles was Sie
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              wissen möchten
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere
            Dienstleistungen. Haben Sie weitere Fragen? Kontaktieren Sie uns
            gerne direkt.
          </p>
        </div>

        {/* Kategorisierte FAQs */}
        <div className="max-w-4xl mx-auto mb-16">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = iconMapping[category.icon] || HelpCircle;

            return (
              <div key={category.id} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.questions.map((item, index) => {
                    const globalIndex = categoryIndex * 100 + index;
                    const isOpen = openItems.has(globalIndex);
                    return (
                      <div
                        key={globalIndex}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors duration-200"
                        >
                          <h4 className="text-lg font-semibold text-gray-900 pr-4">
                            {item.question}
                          </h4>
                          <div
                            className={`flex-shrink-0 transform transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          </div>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-96 pb-6" : "max-h-0"
                          }`}
                        >
                          <div className="px-6">
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Sektion */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl">
          <div className="container text-center py-8 md:py-12">
            <div className="max-w-3xl mx-auto text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ihre Frage war nicht dabei?
              </h3>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Kein Problem! Unser freundliches Team steht Ihnen gerne zur
                Verfügung. Wir antworten in der Regel innerhalb von 2 Stunden.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">Live Chat</h4>
                  <p className="text-sm text-white/80">Mo-Fr: 9-18 Uhr</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">E-Mail Support</h4>
                  <p className="text-sm text-white/80">24/7 verfügbar</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">Premium Support</h4>
                  <p className="text-sm text-white/80">Für Großkunden</p>
                </div>
              </div>
              <button
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Jetzt Kontakt aufnehmen
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FAQ;
