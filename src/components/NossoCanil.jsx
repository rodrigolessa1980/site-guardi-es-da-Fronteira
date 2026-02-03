import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import SectionTitle from './SectionTitle'
import { IMAGES } from '../config/images'
import { useLanguage } from '../context/LanguageContext'

export default function NossoCanil() {
  const { t } = useLanguage()
  return (
    <section id="nosso-canil" className="py-12 sm:py-16 lg:py-24 bg-black scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('nossoCanil.titulo')}</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden"
          >
            <img
              src={IMAGES.galeria[0]}
              alt="Guardiões da Fronteira - Canil"
              className="w-full aspect-[4/3] sm:aspect-video object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-italy-green">{t('nossoCanil.historia')}</h3>
            <p className="text-white/80 leading-relaxed">
              {t('nossoCanil.p1')}
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green" />
                {t('nossoCanil.item1')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green" />
                {t('nossoCanil.item2')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green" />
                {t('nossoCanil.item3')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green" />
                {t('nossoCanil.item4')}
              </li>
            </ul>
            <Link
              to="/galeria-canil"
              className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-4 min-h-[48px] bg-italy-green text-white font-semibold rounded-lg hover:bg-italy-green/90 transition-colors"
            >
              {t('nossoCanil.saibaMais')}
              <HiArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
