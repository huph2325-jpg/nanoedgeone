import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [showDropdown, setShowDropdown] = useState(false)
  const [autoDetectedLang, setAutoDetectedLang] = useState(null)

  useEffect(() => {
    // Auto-detect language from browser
    const browserLang = navigator.language?.split('-')[0] || 'en'
    const supportedLang = ['en', 'id'].includes(browserLang) ? browserLang : 'en'
    setAutoDetectedLang(supportedLang)
    
    // Set to detected language if not already set
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage(supportedLang)
    }
  }, [i18n])

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  ]

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    setShowDropdown(false)
    localStorage.setItem('i18nextLng', lang)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 text-navy-blue hover:text-vintage-gold transition-colors duration-200 text-xl"
        title="Change Language"
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-light-beige min-w-max py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-6 py-2 text-left text-sm font-medium transition-all duration-200 flex items-center gap-3 hover:bg-light-beige ${
                i18n.language === lang.code
                  ? 'bg-vintage-gold/10 text-vintage-gold'
                  : 'text-navy-blue'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-vintage-gold font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}
