import { useState } from "react";
import {
  Heart,
  Award,
  Users,
  Camera,
  Palette,
  Sparkles,
  Quote,
  Shield,
} from "lucide-react";
import profilBild from "../../assets/about.webp";
import CustomSwiper from "../ui/CustomSwiper"; // Die wiederverwendbare Komponente

const achievements = [
  {
    id: 1, // IDs hinzugefügt für konsistente Keys
    icon: Camera,
    number: "500+",
    label: "Transformierte Bilder",
    description: "Jedes Bild eine einzigartige Geschichte",
  },
  {
    id: 2,
    icon: Users,
    number: "150+",
    label: "Glückliche Familien",
    description: "Unvergessliche Erinnerungen geschaffen",
  },
  {
    id: 3,
    icon: Palette,
    number: "15+",
    label: "Jahre Erfahrung",
    description: "Perfektionierung der digitalen Kunstfertigkeit",
  },
  {
    id: 4,
    icon: Sparkles,
    number: "100%",
    label: "Leidenschaft",
    description: "Für jedes einzelne Projekt",
  },
];

const testimonials = [
  {
    id: 1,
    text: "Die Transformation der Bilder unserer Tochter war einfach magisch. Sie sieht sich jetzt als echte Prinzessin!",
    author: "Sarah Martinez",
    role: "Mutter von Emma (5 Jahre)",
    rating: 5,
  },
  {
    id: 2,
    text: "Professionell, kreativ und herzlich. Noha hat unsere Erwartungen bei weitem übertroffen. Absolute Empfehlung!",
    author: "Michael Weber",
    role: "Vater von Leon (7 Jahre)",
    rating: 5,
  },
  {
    id: 3,
    text: "Die Qualität und Liebe zum Detail ist unglaublich. Unsere Kinder sind begeistert von ihren Superhelden-Fotos!",
    author: "Lisa Hoffmann",
    role: "Mutter von Tim & Anna",
    rating: 5,
  },
];

// Render-Funktion für eine Achievement-Karte
const renderAchievementCard = (achievement) => {
  const IconComponent = achievement.icon;
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">
        {achievement.number}
      </h3>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">
        {achievement.label}
      </h4>
      <p className="text-sm text-gray-600">{achievement.description}</p>
    </div>
  );
};

// Render-Funktion für eine Testimonial-Karte
const renderTestimonialCard = (testimonial) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col justify-between">
    <div>
      <div className="flex items-center mb-4">
        <Quote className="w-8 h-8 text-white/70 mr-3" />
        <div className="flex space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          ))}
        </div>
      </div>
      <p className="text-white/90 mb-6 leading-relaxed">"{testimonial.text}"</p>
    </div>
    <div className="border-t border-white/20 pt-4">
      <h5 className="font-semibold text-white mb-1">{testimonial.author}</h5>
      <p className="text-sm text-white/70">{testimonial.role}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
    >
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>ÜBER NOHA STUDIO</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Leidenschaft für
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent pb-2">
              magische Momente
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hinter jedem verzauberten Bild steht die Vision, Kindheitsträume zum
            Leben zu erwecken und unvergessliche Erinnerungen zu schaffen, die
            ein Leben lang Freude bereiten.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Guten Tag, wir sind Noha.
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Als Eltern eines wundervollen Kindes kennen wir aus eigener
                Erfahrung, wie flüchtig die magischen Momente der Kindheit sind.
                Unsere Leidenschaft gilt der Aufgabe, diese kostbaren
                Augenblicke nicht nur festzuhalten, sondern sie in zauberhafte
                Kunstwerke zu verwandeln.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mit mehr als 15 Jahren Expertise in der digitalen
                Bildbearbeitung und einem fundierten IT-Hintergrund verbinden
                wir technisches Know-how mit künstlerischer Vision in jedem
                Projekt. Jede Bearbeitung ist für uns eine Chance, Kinderaugen
                zum Strahlen zu bringen und bleibende Erinnerungen zu schaffen.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium bg-purple-50 p-4 rounded-lg border border-purple-100">
                Dabei verstehen wir, dass die Fotos Ihrer Kinder Ihr
                wertvollstes Gut sind. Deshalb garantieren wir Ihnen zweierlei:
                Jedes Bild ist ein{" "}
                <strong className="text-purple-700">
                  handgefertigtes Unikat
                </strong>
                , das individuell auf Ihre Wünsche zugeschnitten wird, und Ihre
                Privatsphäre wird{" "}
                <strong className="text-purple-700">zu 100% geschützt</strong>.
                Eine Veröffentlichung erfolgt niemals ohne Ihre ausdrückliche,
                separate Zustimmung.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Kreativität</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Jede Idee wird individuell und liebevoll umgesetzt.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Herzblut</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Leidenschaft und Liebe zum Detail in jedem Projekt.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Sicherheit</h4>
                </div>
                <p className="text-sm text-gray-600">
                  100% Anonymität und Schutz Ihrer privaten Aufnahmen.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={profilBild}
                alt="Ein Porträt von Noha, der Gründerin des Studios"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">
                  500+ Transformationen
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">
                  5⭐ Bewertung
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <div className="md:hidden px-4">
            <div className="relative w-full max-w-[320px] mx-auto">
              <CustomSwiper
                variant="cards"
                items={achievements}
                renderSlide={renderAchievementCard}
                effect="cards"
                slideClassName="flex items-center justify-center rounded-2xl bg-white shadow-xl"
                className="w-full pb-2"
                swiperProps={{
                  style: {
                    paddingBottom: "50px",
                  },
                }}
              />
            </div>
          </div>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {achievement.number}
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.label}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl py-12 md:py-20 text-white">
          <div className="text-center mb-12 px-4">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Was Familien über uns sagen
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Die Freude und das Staunen in den Augen der Kinder sind unser
              größter Lohn
            </p>
          </div>
          <CustomSwiper
            variant="testimonials"
            items={testimonials}
            renderSlide={renderTestimonialCard}
            effect="coverflow"
            swiperProps={{
              style: {
                paddingBottom: "80px",
              },
            }}
          />
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Bereit für Ihre magische Transformation?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam unvergessliche Erinnerungen schaffen, die
            Ihre Familie ein Leben lang begleiten werden.
          </p>
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Jetzt Anfrage stellen
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
