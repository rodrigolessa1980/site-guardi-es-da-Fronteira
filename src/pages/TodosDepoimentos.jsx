import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiChat } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { DEPOIMENTOS_IDS } from '../data/depoimentos'
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

export default function TodosDepoimentos() {
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white pt-36 sm:pt-40 md:pt-[11rem] pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <Link
          to="/#depoimentos"
          className="inline-flex items-center gap-2 text-white/60 hover:text-italy-green transition-colors mb-8"
        >
          <HiArrowLeft size={20} />
          {t('depoimentos.voltar')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 sm:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            {t('depoimentos.paginaTitulo')}
          </h1>
          <p className="text-white/70 max-w-2xl">
            {t('depoimentos.paginaSubtitulo')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEPOIMENTOS_IDS.map((id, i) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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
      </div>
    </div>
  )
}
