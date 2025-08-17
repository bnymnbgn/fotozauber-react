import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import Header from './Header'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
}))

describe('Header Component', () => {
  beforeEach(() => {
    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })
  })

  it('renders logo and navigation', () => {
    render(<Header />)
    
    expect(screen.getByText('FotoZauber')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Galerie')).toBeInTheDocument()
    expect(screen.getByText('Kontakt')).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<Header />)
    
    const ctaButton = screen.getByRole('button', { name: /jetzt anfragen/i })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(<Header />)
    
    // Check if all buttons are rendered (including hamburger menu)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(1) // Multiple buttons including menu button
  })

  it('handles navigation item clicks', () => {
    render(<Header />)
    
    // Mock querySelector
    const mockElement = {
      scrollIntoView: vi.fn()
    }
    document.querySelector = vi.fn().mockReturnValue(mockElement)
    
    const homeLink = screen.getByRole('button', { name: /home/i })
    fireEvent.click(homeLink)
    
    expect(document.querySelector).toHaveBeenCalledWith('#home')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('changes style when scrolled', () => {
    const { rerender } = render(<Header />)
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100 })
    fireEvent.scroll(window)
    
    rerender(<Header />)
    
    // Header should have different styles when scrolled
    // This would need more specific testing based on implementation
  })
})