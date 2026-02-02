import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { IMAGES } from '../config/images'
import { useLanguage } from '../context/LanguageContext'

const LINK_KEYS = [
  { href: '#home', key: 'home' },
  { href: '#padreadores', key: 'padreadores' },
  { href: '#matrizes', key: 'matrizes' },
  { href: '#filhotes', key: 'filhotes' },
  { href: '#nosso-canil', key: 'nossoCanil' },
  { href: '#consultoria', key: 'consultoria' },
  { href: '#loja', key: 'loja' },
  { href: '#contato', key: 'contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLanguage, t } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e?.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl shadow-lg shadow-black/20'
          : 'backdrop-blur-[6px] pb-8 sm:pb-12 shadow-[0_6px_30px_rgba(0,0,0,0.6)]'
      }`}
      style={{
        background: scrolled
          ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.90) 60%, rgba(0, 0, 0, 0) 100%)'
          : 'linear-gradient(to bottom, rgba(10, 40, 30, 0.98) 0%, rgba(10, 40, 30, 0.90) 60%, rgba(10, 40, 30, 0) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center h-14 sm:h-16 relative overflow-visible">
        {/* Logo sobre a linha de divisão - metade no cabeçalho, metade no home - alinhado à esquerda */}
        {isHome ? (
          <a
            href="#home"
            onClick={(e) => scrollTo(e, '#home')}
            className="absolute left-3 sm:left-6 bottom-0 translate-y-1/2 z-50 flex items-center justify-center group/logo"
          >
            <img
              src={IMAGES.logo}
              alt="Guardiões da Fronteira"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain rounded-full bg-black transition-all duration-300 shadow-[0_0_0_1px_#008C45,0_0_0_3px_#353535,0_0_10px_rgba(0,140,69,0.05)] group-hover/logo:scale-[1.02] group-hover/logo:shadow-[0_0_0_1px_#008C45,0_0_0_3px_#353535,0_0_15px_rgba(0,140,69,0.12)]"
            />
          </a>
        ) : (
          <Link to="/" className="absolute left-3 sm:left-6 bottom-0 translate-y-1/2 z-50 flex items-center justify-center group/logo">
            <img
              src={IMAGES.logo}
              alt="Guardiões da Fronteira"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain rounded-full bg-black transition-all duration-300 shadow-[0_0_0_1px_#008C45,0_0_0_3px_#353535,0_0_10px_rgba(0,140,69,0.05)] group-hover/logo:scale-[1.02] group-hover/logo:shadow-[0_0_0_1px_#008C45,0_0_0_3px_#353535,0_0_15px_rgba(0,140,69,0.12)]"
            />
          </Link>
        )}

        {/* Menu centralizado */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {LINK_KEYS.map((link) =>
            isHome ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
              >
                {t(`nav.${link.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-italy-green to-italy-red group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ) : (
              <Link
                key={link.href}
                to={`/#${link.href.replace('#', '')}`}
                className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
                onClick={() => setOpen(false)}
              >
                {t(`nav.${link.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-italy-green to-italy-red group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            )
          )}
        </nav>

        {/* Idioma à direita */}
        <div className="hidden lg:flex items-center gap-1 absolute right-4 sm:right-6">
          <button
            type="button"
            onClick={() => setLanguage('pt')}
            title="Português (Brasil)"
            aria-label="Português (Brasil)"
            className={`p-1.5 rounded transition-all focus:outline-none ${lang === 'pt' ? 'bg-italy-green ring-2 ring-white/30' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}
          >
            <img src={IMAGES.flags.br} alt="" className="w-6 h-[18px] object-cover rounded-sm" width={24} height={18} />
          </button>
          <span className="text-white/30">|</span>
          <button
            type="button"
            onClick={() => setLanguage('es')}
            title="Español (Paraguai)"
            aria-label="Español (Paraguai)"
            className={`p-1.5 rounded transition-all focus:outline-none ${lang === 'es' ? 'bg-italy-red ring-2 ring-white/30' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}
          >
            <img src={IMAGES.flags.py} alt="" className="w-6 h-[18px] object-cover rounded-sm" width={24} height={18} />
          </button>
          <span className="text-white/30">|</span>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            title="English (EUA)"
            aria-label="English (EUA)"
            className={`p-1.5 rounded transition-all focus:outline-none ${lang === 'en' ? 'bg-blue-600 ring-2 ring-white/30' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}
          >
            <img src={IMAGES.flags.us} alt="" className="w-6 h-[18px] object-cover rounded-sm" width={24} height={18} />
          </button>
        </div>

        {/* Botão mobile à direita */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-white hover:text-italy-green transition-colors absolute right-4 sm:right-6"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Selo profissional: abaixo do menu, alinhado à direita (próximo aos idiomas) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 hidden lg:block pt-0.5 pb-1.5">
        <div className="flex justify-end">
          <a
            href="#consultoria"
            onClick={(e) => scrollTo(e, '#consultoria')}
            className="text-right text-[10px] sm:text-xs text-white/60 font-normal tracking-wide hover:text-white/90 transition-colors block"
          >
            <div>✔ {t('header.seloSupervisao')}</div>
            <div>{t('header.seloCRMV')}</div>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-dark-800 border-t border-white/10"
          >
            <ul className="py-4 space-y-1 px-4">
              {LINK_KEYS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {isHome ? (
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="block py-3 px-4 text-white/90 hover:text-italy-green hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {t(`nav.${link.key}`)}
                    </a>
                  ) : (
                    <Link
                      to={`/#${link.href.replace('#', '')}`}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 text-white/90 hover:text-italy-green hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  )}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: LINK_KEYS.length * 0.05 }}
                className="flex items-center gap-2 pt-3 mt-3 border-t border-white/10"
              >
                <span className="text-white/60 text-sm px-4">{t('idioma')}:</span>
                <button type="button" onClick={() => { setLanguage('pt'); setOpen(false); }} title="Português (Brasil)" aria-label="Português (Brasil)" className={`p-2 rounded transition-all ${lang === 'pt' ? 'bg-italy-green ring-2 ring-white/30' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}>
                  <img src={IMAGES.flags.br} alt="" className="w-7 h-[21px] object-cover rounded-sm" width={28} height={21} />
                </button>
                <span className="text-white/30">|</span>
                <button type="button" onClick={() => { setLanguage('es'); setOpen(false); }} title="Español (Paraguai)" aria-label="Español (Paraguai)" className={`p-2 rounded transition-all ${lang === 'es' ? 'bg-italy-red ring-2 ring-white/30' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}>
                  <img src={IMAGES.flags.py} alt="" className="w-7 h-[21px] object-cover rounded-sm" width={28} height={21} />
                </button>
                <span className="text-white/30">|</span>
                <button type="button" onClick={() => { setLanguage('en'); setOpen(false); }} title="English (EUA)" aria-label="English (EUA)" className={`p-2 rounded transition-all ${lang === 'en' ? 'bg-blue-600 ring-2 ring-white/30' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}>
                  <img src={IMAGES.flags.us} alt="" className="w-7 h-[21px] object-cover rounded-sm" width={28} height={21} />
                </button>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
