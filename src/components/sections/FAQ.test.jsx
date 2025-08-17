import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import FAQ from './FAQ'

describe('FAQ Component', () => {
  it('renders FAQ section with title', () => {
    render(<FAQ />)
    
    expect(screen.getByText('HÄUFIGE FRAGEN')).toBeInTheDocument()
  })

  it('renders FAQ items', () => {
    render(<FAQ />)
    
    // Check if FAQ questions are rendered
    expect(screen.getByText('Wie lange dauert die Bearbeitung?')).toBeInTheDocument()
    expect(screen.getByText('Ablauf & Bearbeitung')).toBeInTheDocument()
  })
})