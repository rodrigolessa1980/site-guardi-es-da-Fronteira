import { Link } from 'react-router-dom'
import { HiHeart } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const REDES_SOCIAIS = [
  { href: 'https://facebook.com', Icon: FaFacebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/canil.guardioesdafronteira/', Icon: FaInstagram, label: 'Instagram' },
  { href: 'https://linkedin.com', Icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://youtube.com', Icon: FaYoutube, label: 'YouTube' },
]

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="py-6 sm:py-8 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start md:items-center text-center md:text-left">
          {/* Localização */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold text-white mb-1.5">{t('footer.localizacao')}</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Av. Paulista, 1159 - 10º andar - Sala 1016
            </p>
            <a href="tel:+551150346974" className="text-white/70 text-xs hover:text-italy-green transition-colors">
              (11) 5034-6974
            </a>
          </div>

          {/* Redes sociais */}
          <div className="text-center">
            <h3 className="text-sm font-bold text-white mb-2">{t('footer.redesSociais')}</h3>
            <div className="flex justify-center gap-3">
              {REDES_SOCIAIS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Política e Termos */}
          <div className="flex flex-col items-center md:items-end gap-1 text-sm">
            <Link to="/politica-privacidade" className="text-white/60 hover:text-italy-green transition-colors whitespace-nowrap">
              {t('footer.politica')}
            </Link>
            <Link to="/termos-uso" className="text-white/60 hover:text-italy-red transition-colors whitespace-nowrap">
              {t('footer.termos')}
            </Link>
          </div>
        </div>

        {/* Copyright centralizado abaixo das redes sociais */}
        <p className="text-white/60 text-xs text-center mt-6 flex flex-wrap items-center justify-center gap-1 px-2">
          © {new Date().getFullYear()} Canil Guardiões da Fronteira. {t('footer.feitoCom')}
          <HiHeart className="text-italy-red inline" /> {t('footer.para')}
        </p>
      </div>
    </footer>
  )
}
