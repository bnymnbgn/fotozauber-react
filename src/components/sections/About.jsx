import { useState } from 'react';
import { 
  Heart, 
  Award, 
  Users, 
  Camera, 
  Palette, 
  Sparkles,
  Play,
  Pause,
  Quote
} from 'lucide-react';

const About = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const achievements = [
    {
      icon: Camera,
      number: '500+',
      label: 'Transformierte Bilder',
      description: 'Jedes Bild eine einzigartige Geschichte'
    },
    {
      icon: Users,
      number: '150+',
      label: 'Glückliche Familien',
      description: 'Unvergessliche Erinnerungen geschaffen'
    },
    {
      icon: Award,
      number: '5+',
      label: 'Jahre Erfahrung',
      description: 'Perfektionierung der digitalen Kunstfertigkeit'
    },
    {
      icon: Heart,
      number: '100%',
      label: 'Leidenschaft',
      description: 'Für jedes einzelne Projekt'
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Die Transformation der Bilder unserer Tochter war einfach magisch. Sie sieht sich jetzt als echte Prinzessin!",
      author: "Sarah Martinez",
      role: "Mutter von Emma (5 Jahre)",
      rating: 5
    },
    {
      id: 2,
      text: "Professionell, kreativ und herzlich. Noha hat unsere Erwartungen bei weitem übertroffen. Absolute Empfehlung!",
      author: "Michael Weber",
      role: "Vater von Leon (7 Jahre)",
      rating: 5
    },
    {
      id: 3,
      text: "Die Qualität und Liebe zum Detail ist unglaublich. Unsere Kinder sind begeistert von ihren Superhelden-Fotos!",
      author: "Lisa Hoffmann",
      role: "Mutter von Tim & Anna",
      rating: 5
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>ÜBER NOHA STUDIO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Leidenschaft für
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              magische Momente
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hinter jedem verzauberten Bild steht die Vision, Kindheitsträume zum Leben zu erwecken 
            und unvergessliche Erinnerungen zu schaffen, die ein Leben lang Freude bereiten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Persönliche Story */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Hallo, ich bin Noha
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Als Mutter von zwei wundervollen Kindern weiß ich, wie schnell die magischen Momente 
                der Kindheit vergehen. Meine Leidenschaft liegt darin, diese kostbaren Augenblicke 
                nicht nur festzuhalten, sondern sie in märchenhafte Kunstwerke zu verwandeln.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mit über 5 Jahren Erfahrung in der digitalen Bildbearbeitung und einem Hintergrund 
                in Grafikdesign bringe ich sowohl technisches Know-how als auch künstlerische Vision 
                in jedes Projekt ein. Jede Transformation ist für mich eine neue Gelegenheit, 
                Kinderaugen zum Leuchten zu bringen.
              </p>
            </div>

            {/* Kernwerte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Kreativität</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Jede Idee wird individuell und liebevoll umgesetzt
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
                  Leidenschaft und Liebe zum Detail in jedem Projekt
                </p>
              </div>
            </div>
          </div>

          {/* Bild/Video Bereich */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-2xl">
              {/* Platzhalter für Profilbild oder Video */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-purple-700 font-medium">
                    Hier könnte Ihr Profilbild oder ein Video über das Studio stehen
                  </p>
                </div>
              </div>
              
              {/* Video Play Button (falls Video verfügbar) */}
              {false && (
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    {isVideoPlaying ? (
                      <Pause className="w-8 h-8 text-gray-800" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    )}
                  </div>
                </button>
              )}
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">500+ Transformationen</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">5⭐ Bewertung</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div 
                key={index}
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

        {/* Testimonials */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Was Familien über uns sagen
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Die Freude und das Staunen in den Augen der Kinder sind unser größter Lohn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-white/70 mr-3" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-white/20 pt-4">
                  <h5 className="font-semibold text-white mb-1">
                    {testimonial.author}
                  </h5>
                  <p className="text-sm text-white/70">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Bereit für Ihre magische Transformation?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam unvergessliche Erinnerungen schaffen, die Ihre Familie ein Leben lang begleiten werden.
          </p>
          
          <button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
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