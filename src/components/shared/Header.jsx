import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

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
          <Link to="/" className="text-navy-blue hover:text-vintage-gold transition">{t('nav.home')}</Link>
          <Link to="/influencers" className="text-navy-blue hover:text-vintage-gold transition">{t('nav.influencers')}</Link>
          <Link to="/about" className="text-navy-blue hover:text-vintage-gold transition">{t('nav.about')}</Link>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <Link to="/auth/login" className="px-4 py-2 border border-vintage-gold text-vintage-gold rounded-lg hover:bg-vintage-gold hover:text-white transition">
            {t('nav.auth')}
          </Link>
          <Link to="/auth/signup" className="btn-primary">
            {t('nav.signup')}
          </Link>
          <div className="border-l border-light-beige pl-4">
            <LanguageSwitcher />
          </div>
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
            <Link to="/" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
            <Link to="/influencers" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>{t('nav.influencers')}</Link>
            <Link to="/about" className="text-navy-blue hover:text-vintage-gold transition" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
            <div className="border-t border-light-beige pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-navy-blue flex-1">Language</span>
                <LanguageSwitcher />
              </div>
              <Link to="/auth/login" className="px-4 py-2 border border-vintage-gold text-vintage-gold rounded-lg hover:bg-vintage-gold hover:text-white transition text-center">
                {t('nav.auth')}
              </Link>
              <Link to="/auth/signup" className="btn-primary text-center">
                {t('nav.signup')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
