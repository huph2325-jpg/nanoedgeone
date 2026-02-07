import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-vintage-gold rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">ℕ</span>
          </div>
          <span className="font-vintage text-2xl text-navy-blue font-bold hidden sm:inline">NanoEdge</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-navy-blue hover:text-vintage-gold transition">Home</Link>
          <Link to="/influencers" className="text-navy-blue hover:text-vintage-gold transition">Influencers</Link>
          <Link to="/about" className="text-navy-blue hover:text-vintage-gold transition">About</Link>
          <Link to="/terms" className="text-navy-blue hover:text-vintage-gold transition">Terms</Link>
        </div>

        <div className="hidden md:flex gap-4">
          <Link to="/auth/login" className="px-4 py-2 border border-vintage-gold text-vintage-gold rounded-lg hover:bg-vintage-gold hover:text-white transition">
            Sign In
          </Link>
          <Link to="/auth/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-navy-blue" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cream-white border-t border-light-beige">
          <div className="container-custom py-4 flex flex-col gap-4">
            <Link to="/" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/influencers" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>Influencers</Link>
            <Link to="/about" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/terms" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>Terms</Link>
            <div className="flex gap-2 flex-col">
              <Link to="/auth/login" className="px-4 py-2 border border-vintage-gold text-vintage-gold rounded-lg hover:bg-vintage-gold hover:text-white transition text-center">
                Sign In
              </Link>
              <Link to="/auth/signup" className="btn-primary text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
