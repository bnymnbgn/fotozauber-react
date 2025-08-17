# FotoZauber React - Magische Kinderfotografie

Eine moderne React-Anwendung mit Tailwind CSS für professionelle Bildbearbeitung von Kinderfotografien.

## 🚀 Features

- **React 18** mit Vite als Build-Tool
- **Tailwind CSS** für modernes Styling
- **Framer Motion** für flüssige Animationen
- **Responsive Design** für alle Geräte
- **Component-basierte Architektur**
- **TypeScript-ready** (kann später aktiviert werden)

## 📦 Installierte Pakete

- `react` & `react-dom` - React Framework
- `vite` - Moderner Build-Tool
- `tailwindcss` - Utility-first CSS Framework
- `framer-motion` - Animationsbibliothek
- `swiper` - Touch Slider/Carousel
- `react-hook-form` - Formular-Management
- `axios` - HTTP Client
- `lucide-react` - Icon-Bibliothek
- `clsx` - Conditional CSS Classes

## 🛠 Development

```bash
# Development Server starten
npm run dev

# Build für Produktion
npm run build

# Preview der Build
npm run preview
```

## 📁 Projekt-Struktur

```
src/
├── components/
│   ├── ui/               # Wiederverwendbare UI-Komponenten
│   │   └── Button.jsx
│   ├── layout/           # Layout-Komponenten
│   │   └── Header.jsx
│   ├── sections/         # Seiten-Sektionen
│   │   └── Hero.jsx
│   └── features/         # Feature-spezifische Komponenten
├── hooks/               # Custom React Hooks
├── utils/               # Utility-Funktionen
├── contexts/           # React Context für State Management
├── data/               # Statische Daten und Content
└── App.jsx             # Haupt-App-Komponente
```

## 🎨 Tailwind Konfiguration

Das Projekt verwendet ein angepasstes Tailwind Theme mit:
- **Primary Colors**: Lila-Farbpalette (#a855f7)
- **Secondary Colors**: Pink-Farbpalette (#ec4899)
- **Accent Colors**: Amber-Farbpalette (#f59e0b)
- **Custom Animations**: fade-in, slide-up, float, etc.
- **Gradient Utilities**: Vordefinierte Verläufe

## 🔧 Komponenten-System

### Button Component
```jsx
import Button from './components/ui/Button';

<Button variant="primary" size="lg">
  Jetzt anfragen
</Button>
```

Verfügbare Varianten: `primary`, `secondary`, `outline`, `ghost`, `danger`
Verfügbare Größen: `sm`, `md`, `lg`, `xl`

### Header Component
- Responsive Navigation
- Smooth Scroll zu Sektionen
- Mobile Menu mit Animationen
- Scroll-basierte Hintergrund-Änderung

### Hero Component
- Animierte Hintergrund-Elemente
- Gradient-Text-Effekte
- Call-to-Action Buttons
- Statistiken mit Animationen

## 🔄 Migration Status

### ✅ Abgeschlossen
- React-Projekt Setup mit Vite
- Tailwind CSS Konfiguration
- Grundlegende Komponenten-Struktur
- Header mit Navigation
- Hero-Sektion mit Animationen
- Button-Komponente
- Assets-Integration

### 🔄 In Entwicklung
- Galerie-Komponente mit Filtering
- Services-Sektion
- Vergleichs-Slider (Vorher/Nachher)
- Kontaktformular mit File Upload
- FAQ-Sektion
- Footer-Komponente

### 📋 Geplant
- TypeScript Migration
- Testing Setup (Vitest + Testing Library)
- Storybook für Komponenten-Dokumentation
- PWA Features
- SEO Optimierung
- Performance Monitoring

## 🌐 Backend Integration

Das bestehende PHP-Backend bleibt erhalten und wird über API-Aufrufe integriert:
- `contact-process.php` für Kontaktformulare
- `upload-process.php` für Datei-Uploads

```jsx
// API Integration Beispiel
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // PHP Backend
});

// Kontaktformular senden
await api.post('/contact-process.php', formData);
```

## 🚀 Next Steps

1. **Galerie implementieren** - Mit Lightbox und Kategorien-Filter
2. **Services-Sektion** - Mit Icon-Integration und Hover-Effekten
3. **Comparison Slider** - Vorher/Nachher mit Swiper.js
4. **Kontaktformular** - Mit react-hook-form und Validierung
5. **Mobile Optimierung** - Touch-Gesten und Performance