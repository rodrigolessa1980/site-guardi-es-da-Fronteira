import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'pt')

  const setLanguage = useCallback((newLang) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }, [])

  useEffect(() => {
    const langAttr = lang === 'es' ? 'es' : lang === 'en' ? 'en' : 'pt-BR'
    document.documentElement.lang = langAttr
  }, [lang])

  const t = useCallback((path) => {
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) return path
    }
    return value ?? path
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
