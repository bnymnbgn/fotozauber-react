import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import Contact from './Contact'

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit: (fn) => fn,
    formState: { errors: {} },
    reset: vi.fn(),
  })
}))

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn()
    }))
  }
}))

describe('Contact Component', () => {
  it('renders contact section', () => {
    render(<Contact />)
    
    expect(screen.getByText(/kontakt/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /nachricht senden/i })
    expect(submitButton).toBeInTheDocument()
  })
})