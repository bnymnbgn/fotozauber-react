import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* Weitere Sektionen werden hier hinzugefügt */}
        <div id="about" className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Über mich - Wird implementiert</h2>
            <p className="text-gray-600">Diese Sektion wird als nächstes entwickelt.</p>
          </div>
        </div>
        
        <Gallery />
        
        <div id="services" className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leistungen - Wird implementiert</h2>
            <p className="text-gray-600">Diese Sektion wird als nächstes entwickelt.</p>
          </div>
        </div>
        
        <div id="comparison" className="section-padding">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vorher/Nachher - Wird implementiert</h2>
            <p className="text-gray-600">Diese Sektion wird als nächstes entwickelt.</p>
          </div>
        </div>
        
        <div id="process" className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ablauf - Wird implementiert</h2>
            <p className="text-gray-600">Diese Sektion wird als nächstes entwickelt.</p>
          </div>
        </div>
        
        <div id="faq" className="section-padding">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQ - Wird implementiert</h2>
            <p className="text-gray-600">Diese Sektion wird als nächstes entwickelt.</p>
          </div>
        </div>
        
        <div id="contact" className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kontakt - Wird implementiert</h2>
            <p className="text-gray-600">Diese Sektion wird als nächstes entwickelt.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;