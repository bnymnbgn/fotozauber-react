import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Upload, 
  X, 
  Check, 
  Send,
  MessageCircle,
  Clock,
  Star
} from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/tiff', 'image/raw'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1),
      preview: URL.createObjectURL(file)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      
      // Füge Formular-Daten hinzu
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      // Füge Dateien hinzu
      uploadedFiles.forEach((fileObj, index) => {
        formData.append(`file_${index}`, fileObj.file);
      });

      // Sende an PHP Backend
      const response = await axios.post('/contact-process.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitStatus('success');
        reset();
        setUploadedFiles([]);
      } else {
        throw new Error(response.data.message || 'Fehler beim Senden');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>KONTAKT AUFNEHMEN</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Lassen Sie uns
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Magie erschaffen
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bereit für die Verwandlung? Senden Sie uns Ihre Bilder und Ihre Wünsche. 
            Wir machen aus gewöhnlichen Momenten unvergessliche Erinnerungen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Kontakt-Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Wie können wir helfen?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ob Einzelaufträge oder größere Projekte - wir freuen uns auf Ihre Anfrage. 
                Teilen Sie uns Ihre Wünsche mit und laden Sie gerne bereits Ihre Bilder hoch.
              </p>
            </div>

            {/* Kontakt-Karten */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Telefon</h4>
                  <p className="text-gray-600">+49 (0) 123 456789</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">E-Mail</h4>
                  <p className="text-gray-600">info@noha-studio.de</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Studio</h4>
                  <p className="text-gray-600">München, Deutschland</p>
                </div>
              </div>
            </div>

            {/* Arbeitszeiten */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5" />
                <h4 className="font-semibold">Arbeitszeiten</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span>Geschlossen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kontakt-Formular */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Nachricht erfolgreich gesendet!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Wir werden uns schnellstmöglich bei Ihnen melden.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2 text-red-700">
                  <X className="w-5 h-5" />
                  <span className="font-medium">Fehler beim Senden</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name und E-Mail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name ist erforderlich' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Ihr Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    {...register('email', {
                      required: 'E-Mail ist erforderlich',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Ungültige E-Mail-Adresse'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="ihre@email.de"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Telefon und Betreff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="+49 (0) 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Betreff *
                  </label>
                  <select
                    {...register('subject', { required: 'Betreff ist erforderlich' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="beratung">Beratung & Information</option>
                    <option value="auftrag">Neuer Auftrag</option>
                    <option value="nachbestellung">Nachbestellung</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              {/* Nachricht */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachricht *
                </label>
                <textarea
                  {...register('message', { required: 'Nachricht ist erforderlich' })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Beschreiben Sie Ihre Wünsche und Vorstellungen..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bilder hochladen
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-300">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Klicken Sie hier oder ziehen Sie Bilder hierher
                    </p>
                    <p className="text-sm text-gray-500">
                      JPEG, PNG, TIFF bis 10MB pro Datei
                    </p>
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">
                      Hochgeladene Dateien ({uploadedFiles.length})
                    </h5>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                          <img 
                            src={file.preview} 
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Nachricht senden</span>
                  </>
                )}
              </button>
            </form>

            {/* Bewertungen */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">5.0 aus 150+ Bewertungen</span>
              </div>
              <p className="text-sm text-gray-500 italic">
                "Fantastischer Service! Die Bilder sind absolut magisch geworden." - Sarah M.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;