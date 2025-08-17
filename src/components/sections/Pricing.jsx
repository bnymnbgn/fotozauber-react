import { useState } from 'react';
import { 
  Check, 
  X, 
  Star, 
  Clock, 
  Palette, 
  Wand2, 
  Crown, 
  Users,
  Euro,
  ArrowRight,
  Zap,
  Gift,
  Shield
} from 'lucide-react';
import { pricingPlans, pricingAddOns } from '../../data/content';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('creative');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [billingCycle, setBillingCycle] = useState('single'); // single or package

  const iconMapping = {
    'palette': Palette,
    'wand': Wand2,
    'crown': Crown,
    'users': Users
  };

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    const addOnsCost = selectedAddOns.reduce((total, addOnId) => {
      const addOn = pricingAddOns.find(a => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    
    return plan ? plan.price + addOnsCost : 0;
  };

  const calculateSavings = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    return plan ? plan.originalPrice - plan.price : 0;
  };

  return (
    <section id="pricing" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Euro className="w-4 h-4" />
            <span>BEARBEITUNGSPAKETE</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Unsere
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Preispakete
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Transparente Preise ohne versteckte Kosten. Wählen Sie das perfekte Paket für Ihre Bedürfnisse 
            und verwandeln Sie Ihre Fotos in magische Kunstwerke.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setBillingCycle('single')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === 'single' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Einzelbild
            </button>
            <button
              onClick={() => setBillingCycle('package')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                billingCycle === 'package' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mehrfach-Pakete
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan, index) => {
            const IconComponent = iconMapping[plan.icon];
            const isSelected = selectedPlan === plan.id;
            const discountedPrice = billingCycle === 'package' ? Math.round(plan.price * 0.75) : plan.price;
            
            return (
              <div 
                key={plan.id}
                className={`relative pricing-card cursor-pointer transition-all duration-500 transform hover:-translate-y-2 ${
                  plan.popular ? 'lg:-mt-4 lg:mb-4' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-2 right-4 z-10">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Star className="w-3 h-3 inline mr-1 fill-current" />
                        BELIEBT
                      </div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-md blur-sm opacity-30 -z-10"></div>
                    </div>
                  </div>
                )}

                <div 
                  className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                    plan.popular && !isSelected ? 'ring-2 ring-purple-200' : ''
                  } ${
                    !isSelected ? 'shadow-lg hover:shadow-xl' : ''
                  }`}
                  style={{
                    minHeight: '600px',
                    ...(isSelected ? {
                      background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
                      boxShadow: '0 20px 40px -12px rgba(168, 85, 247, 0.25), 0 0 25px rgba(168, 85, 247, 0.15), 0 0 50px rgba(168, 85, 247, 0.1)',
                      transform: 'scale(1.02) translateY(-4px)'
                    } : {})
                  }}
                >
                  
                  {/* Card Header */}
                  <div className={`p-6 text-center ${plan.bgColor} border-b ${plan.borderColor}`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center ${
                      isSelected ? 'ring-4 ring-purple-200 ring-opacity-50' : ''
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="price-display">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-3xl font-bold text-gray-900">
                          {discountedPrice}€
                        </span>
                        {billingCycle === 'package' && (
                          <span className="text-lg text-gray-500 line-through">
                            {plan.price}€
                          </span>
                        )}
                      </div>
                      {plan.originalPrice > plan.price && (
                        <div className="text-sm text-gray-500 mt-1">
                          Statt {plan.originalPrice}€
                          <span className="ml-2 text-green-600 font-medium">
                            ({Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}% sparen)
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Duration */}
                    <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{plan.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                      Inklusive:
                    </h4>
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="border-t border-gray-100 pt-4 mt-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                          Nicht enthalten:
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Select Button */}
                  <div className="p-6 pt-0">
                    <button
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                          : plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600'
                      }`}
                    >
                      {isSelected ? 'Ausgewählt' : 'Auswählen'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-Ons Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Zusatzoptionen
            </h3>
            <p className="text-gray-600">
              Erweitern Sie Ihr gewähltes Paket mit diesen professionellen Zusatzleistungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingAddOns.map((addOn) => {
              const isSelected = selectedAddOns.includes(addOn.id);
              
              return (
                <div
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`addon-card p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'border-purple-400 bg-purple-50 shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{addOn.name}</h4>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{addOn.description}</p>
                  
                  <div className="text-lg font-bold text-purple-600">
                    +{addOn.price}€
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary & CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Summary */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Ihr gewähltes Paket
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg">
                    {pricingPlans.find(p => p.id === selectedPlan)?.name}
                  </span>
                  <span className="text-lg font-semibold">
                    {billingCycle === 'package' 
                      ? Math.round((pricingPlans.find(p => p.id === selectedPlan)?.price || 0) * 0.75)
                      : pricingPlans.find(p => p.id === selectedPlan)?.price
                    }€
                  </span>
                </div>
                
                {selectedAddOns.map(addOnId => {
                  const addOn = pricingAddOns.find(a => a.id === addOnId);
                  return addOn ? (
                    <div key={addOnId} className="flex justify-between items-center text-white/90">
                      <span>{addOn.name}</span>
                      <span>+{addOn.price}€</span>
                    </div>
                  ) : null;
                })}
                
                {billingCycle === 'package' && (
                  <div className="flex justify-between items-center text-green-300">
                    <span>Mehrfach-Rabatt (25%)</span>
                    <span>-{Math.round((pricingPlans.find(p => p.id === selectedPlan)?.price || 0) * 0.25)}€</span>
                  </div>
                )}
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Gesamt</span>
                    <span>{calculateTotal()}€</span>
                  </div>
                  {calculateSavings() > 0 && (
                    <div className="text-green-300 text-sm mt-1">
                      Sie sparen {calculateSavings()}€ gegenüber dem Normalpreis!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <Shield className="w-8 h-8 text-green-300" />
                  <span className="text-lg">100% Zufriedenheitsgarantie</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <Gift className="w-8 h-8 text-yellow-300" />
                  <span>Kostenlose Korrekturschleifen inklusive</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <Zap className="w-8 h-8 text-blue-300" />
                  <span>Express-Service verfügbar</span>
                </div>
              </div>
              
              <button 
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Jetzt Bilder hochladen
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              
              <p className="text-white/80 text-sm">
                Kostenlose Beratung • Keine Vorabkosten
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;