import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiShieldCheck, HiClipboardList, HiPhone } from 'react-icons/hi'
import SectionTitle from './SectionTitle'
import { useLanguage } from '../context/LanguageContext'

const SERVICOS = [
  { icon: HiShieldCheck, tituloKey: 'card1titulo', descKey: 'card1', link: '/curriculo-veterinario' },
  { icon: HiClipboardList, tituloKey: 'card2titulo', descKey: 'card2', link: '/orientacao-consultoria' },
  { icon: HiPhone, tituloKey: 'card3titulo', descKey: 'card3', link: '/suporte-continuo' },
]

export default function ConsultoriaVeterinaria() {
  const { t } = useLanguage()
  return (
    <section id="consultoria" className="py-12 sm:py-16 lg:py-24 bg-dark-900 scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('consultoria.titulo')}</SectionTitle>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-10 sm:mb-16 px-4">
          {t('consultoria.subtitulo')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICOS.map((s, i) => {
            const CardContent = () => (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green">
                  <s.icon size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">{t(`consultoria.${s.tituloKey}`)}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{t(`consultoria.${s.descKey}`)}</p>
                {s.link && (
                  <span className="inline-block mt-3 text-italy-green text-sm font-medium">
                    {t('consultoria.verMais')} →
                  </span>
                )}
              </>
            )
            return (
              <motion.article
                key={s.tituloKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-dark-800 border border-white/10 rounded-xl p-8 text-center transition-colors hover:border-italy-green/50 hover:bg-dark-700/50 cursor-pointer"
              >
                <Link to={s.link} className="block">
                  <CardContent />
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
