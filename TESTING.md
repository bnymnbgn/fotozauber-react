# Testing Guide

Dieses Projekt verwendet **Vitest** und **React Testing Library** für Unit- und Integrationstests.

## 🚀 Schnellstart

```bash
# Alle Tests ausführen
npm run test

# Tests im Watch-Mode
npm run test:watch

# Tests einmalig ausführen (CI/CD)
npm run test:run

# Coverage Report generieren
npm run test:coverage

# Tests mit UI (falls @vitest/ui installiert)
npm run test:ui
```

## 📁 Test-Struktur

```
src/
├── test/
│   ├── setup.js          # Test-Setup und Mocks
│   └── utils.jsx         # Test-Utilities und Helper
├── components/
│   ├── ui/
│   │   └── Button.test.jsx
│   ├── layout/
│   │   └── Header.test.jsx
│   └── sections/
│       ├── FAQ.test.jsx
│       └── Contact.test.jsx
└── App.test.jsx
```

## 🛠 Konfiguration

### Vitest Config (`vitest.config.js`)
- **Environment**: jsdom für DOM-Tests
- **Globals**: Vitest globals aktiviert
- **Setup**: Automatisches Setup mit `src/test/setup.js`
- **Coverage**: V8 Provider mit HTML/JSON Reports
- **Thresholds**: 70% Coverage für branches, functions, lines, statements

### Test Setup (`src/test/setup.js`)
- **@testing-library/jest-dom**: Erweiterte Matcher
- **GSAP Mock**: Für Animationen
- **IntersectionObserver Mock**: Für Scroll-Animationen
- **matchMedia Mock**: Für Responsive-Tests

## ✅ Test-Beispiele

### Button Component Test
```jsx
import { render, screen, fireEvent } from '../../test/utils'
import Button from './Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})

test('handles click events', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Component with Mocks
```jsx
// Mock external dependencies
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit: (fn) => fn,
    formState: { errors: {} },
  })
}))

test('renders form component', () => {
  render(<ContactForm />)
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
})
```

## 🧪 Testing Best Practices

### 1. **Test-Philosophie**
- Tests sollten das Verhalten aus Nutzersicht testen
- Keine Implementierungsdetails testen
- Accessibility-erste Selektoren verwenden

### 2. **Selektoren-Priorität**
```jsx
// ✅ Gut - Accessibility-basiert
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)

// ⚠️ OK - Text-basiert
screen.getByText(/welcome/i)

// ❌ Vermeiden - Implementierungsdetails
screen.getByClassName('btn-primary')
screen.getByTestId('submit-btn') // Nur wenn nötig
```

### 3. **Async Testing**
```jsx
import { waitFor } from '@testing-library/react'

test('loads data asynchronously', async () => {
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText(/data loaded/i)).toBeInTheDocument()
  })
})
```

### 4. **Event Testing**
```jsx
import { userEvent } from '@testing-library/user-event'

test('user interactions', async () => {
  const user = userEvent.setup()
  render(<Form />)
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.click(screen.getByRole('button', { name: /submit/i }))
})
```

## 🎭 Mocking

### Externe Module mocken
```jsx
// Mock Axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn().mockResolvedValue({ data: { success: true } })
    }))
  }
}))

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}))
```

### Component Mocks
```jsx
// Mock komplexe Child-Components
vi.mock('./components/sections/Gallery', () => ({
  default: () => <div data-testid="gallery">Gallery Mock</div>
}))
```

## 📊 Coverage

Coverage-Reports werden generiert in:
- `coverage/index.html` - Interaktiver HTML-Report
- `coverage/coverage-final.json` - JSON-Daten
- Terminal - Text-Output

### Coverage-Ziele
- **Branches**: 70%
- **Functions**: 70% 
- **Lines**: 70%
- **Statements**: 70%

## 🔧 GitHub Actions CI/CD

Tests laufen automatisch bei:
- Push auf `main` oder `develop` Branch
- Pull Requests

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm run test:run

- name: Build application  
  run: npm run build
```

## 🐛 Debugging

### Test Debug-Modus
```jsx
import { screen } from '@testing-library/react'

test('debug test', () => {
  render(<Component />)
  screen.debug() // Gibt DOM-Struktur aus
})
```

### Nur spezifische Tests
```bash
# Einzelner Test
npm run test Button.test.jsx

# Test mit Pattern
npm run test -- --grep "renders button"
```

## 📚 Weitere Ressourcen

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## 🎯 Nächste Schritte

1. **E2E Tests**: Playwright oder Cypress hinzufügen
2. **Visual Regression**: Chromatic/Storybook Integration
3. **Performance Tests**: Lighthouse CI
4. **A11y Tests**: @axe-core/react Integration