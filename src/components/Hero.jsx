import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { IMAGES } from '../config/images'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = IMAGES.heroSlideshow

  // Troca automática a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen min-h-[100dvh] flex items-center scroll-mt-nav overflow-hidden -mt-[6rem] sm:-mt-[7rem] pt-[10rem] sm:pt-[12rem] lg:pt-[14rem]">
      {/* Slideshow de imagens - visão inteira do cão, tamanho padronizado */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="w-full h-full max-w-6xl mx-auto flex items-center justify-center p-2 sm:p-0 translate-y-[12.5%]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Cane Corso - Guardiões da Fronteira ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="max-w-full max-h-full w-auto h-auto object-contain object-center"
            />
          </AnimatePresence>
        </div>
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Indicadores do slideshow */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-8 bg-gradient-to-r from-italy-green to-italy-red'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Ir para imagem ${i + 1}`}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4">
            <span className="block text-italy-green">{t('hero.titulo1')}</span>
            <span className="block text-white">{t('hero.titulo2')}</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8 font-script">
            {t('hero.subtitulo')}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('#nosso-canil')}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-italy-green to-italy-red text-white font-semibold rounded-lg shadow-lg shadow-italy-green/20 hover:shadow-italy-red/30 transition-shadow"
          >
            {t('hero.cta')}
            <HiArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Indicador scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollTo('#padreadores')}
          className="p-2 text-white/60 hover:text-white transition-colors"
          aria-label={t('hero.scrollLabel')}
        >
          <HiArrowDown size={28} />
        </motion.button>
      </motion.div>
    </section>
  )
}
