import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col gap-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-navy-blue mb-2">
          <FontAwesomeIcon icon={faGlobe} />
          <span>Language</span>
        </div>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              i18n.language === lang.code
                ? 'bg-vintage-gold text-white'
                : 'bg-light-beige text-navy-blue hover:bg-gray-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
