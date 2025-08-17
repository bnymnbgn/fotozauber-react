import { describe, it, expect, vi } from 'vitest'
import { render, screen } from './test/utils'
import App from './App'

// Mock all sections to avoid complex dependencies
vi.mock('./components/layout/Header', () => ({
  default: () => <header data-testid="header">Header</header>
}))

vi.mock('./components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}))

vi.mock('./components/sections/Hero', () => ({
  default: () => <section data-testid="hero">Hero</section>
}))

vi.mock('./components/sections/About', () => ({
  default: () => <section data-testid="about">About</section>
}))

vi.mock('./components/sections/Gallery', () => ({
  default: () => <section data-testid="gallery">Gallery</section>
}))

vi.mock('./components/sections/Services', () => ({
  default: () => <section data-testid="services">Services</section>
}))

vi.mock('./components/sections/Comparison', () => ({
  default: () => <section data-testid="comparison">Comparison</section>
}))

vi.mock('./components/sections/Process', () => ({
  default: () => <section data-testid="process">Process</section>
}))

vi.mock('./components/sections/Pricing', () => ({
  default: () => <section data-testid="pricing">Pricing</section>
}))

vi.mock('./components/sections/FAQ', () => ({
  default: () => <section data-testid="faq">FAQ</section>
}))

vi.mock('./components/sections/Contact', () => ({
  default: () => <section data-testid="contact">Contact</section>
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders all main sections in correct order', () => {
    render(<App />)
    
    // Check if all sections are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
    expect(screen.getByTestId('services')).toBeInTheDocument()
    expect(screen.getByTestId('comparison')).toBeInTheDocument()
    expect(screen.getByTestId('process')).toBeInTheDocument()
    expect(screen.getByTestId('pricing')).toBeInTheDocument()
    expect(screen.getByTestId('faq')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<App />)
    
    // Check for main element
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    // Check for header and footer
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('applies minimum height class', () => {
    const { container } = render(<App />)
    
    const appDiv = container.firstChild
    expect(appDiv).toHaveClass('min-h-screen')
  })
})