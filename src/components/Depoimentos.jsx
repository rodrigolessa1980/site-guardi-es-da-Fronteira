import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiChat } from 'react-icons/hi'
import SectionTitle from './SectionTitle'
import { useLanguage } from '../context/LanguageContext'
import { DEPOIMENTOS_IDS, DEPOIMENTOS_HOME_LIMIT } from '../data/depoimentos'
import { IMAGES } from '../config/images'

function FotoDepoimento({ id }) {
  const [erro, setErro] = useState(false)
  const src = IMAGES.depoimentos?.[id]
  const mostrarImg = src && !erro

  if (mostrarImg) {
    return (
      <img
        src={src}
        alt=""
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-italy-green/40 shrink-0"
        onError={() => setErro(true)}
      />
    )
  }
  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green shrink-0">
      <HiChat size={24} />
    </div>
  )
}

export default function Depoimentos() {
  const { t } = useLanguage()
  const idsNaHome = DEPOIMENTOS_IDS.slice(0, DEPOIMENTOS_HOME_LIMIT)

  return (
    <section id="depoimentos" className="py-12 sm:py-16 lg:py-24 bg-black scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('depoimentos.titulo')}</SectionTitle>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-10 sm:mb-16 px-4">
          {t('depoimentos.subtitulo')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {idsNaHome.map((id, i) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-dark-800 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col transition-colors hover:border-italy-green/50 hover:bg-dark-700/50"
            >
              <div className="mb-4">
                <FotoDepoimento id={id} />
              </div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1 mb-4">
                &ldquo;{t(`depoimentos.texto${id}`)}&rdquo;
              </p>
              <p className="font-semibold text-italy-green text-sm">
                — {t(`depoimentos.nome${id}`)}
              </p>
            </motion.article>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            to="/depoimentos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-italy-green text-white font-semibold rounded-lg hover:bg-italy-green/90 transition-colors"
          >
            {t('depoimentos.verMais')}
            <HiArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
