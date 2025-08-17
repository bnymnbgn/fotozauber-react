import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  ArrowUp,
  Sparkles,
  Camera,
  Palette,
  Shield,
  Clock
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Über uns', href: '#about' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Leistungen', href: '#services' },
    { name: 'Ablauf', href: '#process' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontakt', href: '#contact' }
  ];

  const services = [
    { name: 'Professionelle Retusche', icon: Palette },
    { name: 'Kreatives Compositing', icon: Camera },
    { name: 'KI-Magie', icon: Sparkles },
    { name: 'Upscaling', icon: ArrowUp }
  ];

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Hauptbereich Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Über NOHA Studio */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">NOHA STUDIO</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Wir verwandeln gewöhnliche Kinderfotos in magische Kunstwerke, die ein Leben lang 
                Freude bereiten. Mit Liebe zum Detail und modernster Technologie erschaffen wir 
                unvergessliche Erinnerungen.
              </p>
            </div>

            {/* Leistungen */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4 text-white">Unsere Leistungen</h4>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                      <IconComponent className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{service.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Folgen Sie uns</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/noha.studio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/noha.studio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-left hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    München, Deutschland<br />
                    Termine nach Vereinbarung
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a 
                  href="tel:+491234567890" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  +49 (0) 123 456789
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a 
                  href="mailto:info@noha-studio.de" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  info@noha-studio.de
                </a>
              </div>

              <div className="flex items-start space-x-3 mt-6">
                <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Beratungszeiten:</strong><br />
                    Mo-Fr: 9:00 - 18:00<br />
                    Sa: 10:00 - 16:00<br />
                    So: Geschlossen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trennlinie */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} NOHA STUDIO. Alle Rechte vorbehalten.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Impressum
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Datenschutz
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                AGB
              </button>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg"
              aria-label="Nach oben scrollen"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Zusätzliche Info */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center">
            
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">100% sichere Datenübertragung</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm">Made with Love in München</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-300">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">500+ magische Transformationen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button für Kontakt */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => handleLinkClick('#contact')}
          className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Kontakt"
        >
          <Mail className="w-6 h-6 text-white" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;