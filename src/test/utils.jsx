import { render } from '@testing-library/react'

// Custom render function with providers if needed
export function renderWithProviders(ui, options = {}) {
  const {
    // Add any providers here in the future
    ...renderOptions
  } = options

  const Wrapper = ({ children }) => {
    // Add any context providers here
    return children
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { renderWithProviders as render }

// Common test data
export const mockImageData = [
  {
    id: 1,
    src: '/test-image-1.jpg',
    alt: 'Test Image 1',
    category: 'space'
  },
  {
    id: 2,
    src: '/test-image-2.jpg',
    alt: 'Test Image 2',
    category: 'underwater'
  }
]

export const mockPricingData = [
  {
    id: 'basic',
    name: 'Basic Paket',
    price: 39,
    features: ['Feature 1', 'Feature 2'],
    limitations: []
  }
]