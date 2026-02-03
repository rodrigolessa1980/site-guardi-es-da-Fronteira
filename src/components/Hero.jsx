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
    <section
      id="home"
      className="relative min-h-screen min-h-[100dvh] flex flex-col scroll-mt-nav -mt-[6rem] sm:-mt-[7rem] pt-[10rem] sm:pt-[12rem] lg:pt-[14rem]"
      style={{ minHeight: '100dvh' }}
    >
      {/* Slideshow - camada de fundo (absolute só para layering, não para layout) */}
      <div className="absolute inset-0 bg-black flex items-center justify-center" aria-hidden="true">
        <div className="w-full h-full max-w-full mx-auto flex items-center justify-center pt-12 sm:pt-14 lg:pt-16 px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Layout principal: flex column - conteúdo no meio, indicadores embaixo */}
      <div className="relative z-20 flex flex-col flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        {/* Conteúdo - ocupa espaço disponível */}
        <div className="flex-1 flex items-center justify-start lg:justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl"
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
              className="btn-conheca-canil touch-target min-w-[44px] inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              {t('hero.cta')}
              <HiArrowDown className="w-5 h-5 shrink-0" />
            </motion.button>
          </motion.div>
        </div>

        {/* Rodapé do hero: indicadores + scroll - flex em vez de absolute */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 py-4 sm:py-6 shrink-0">
          {/* Indicadores do slideshow - barra gradiente no ativo, círculos nos inativos */}
          <div className="flex gap-2 items-center justify-center" role="tablist">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Ir para imagem ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-italy-green to-italy-red'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Indicador scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={() => scrollTo('#padreadores')}
              className="touch-target p-2 text-white/60 hover:text-white transition-colors"
              aria-label={t('hero.scrollLabel')}
            >
              <HiArrowDown size={28} aria-hidden />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
