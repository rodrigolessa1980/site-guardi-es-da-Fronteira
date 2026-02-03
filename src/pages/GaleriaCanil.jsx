import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiPhotograph, HiOfficeBuilding, HiHeart, HiTruck } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { IMAGES } from '../config/images'

export default function GaleriaCanil() {
  const { t } = useLanguage()

  useEffect(() => {
    if (window.location.hash === '#entregas') {
      const el = document.getElementById('entregas')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  const galeriaFotos = [
    ...IMAGES.heroSlideshow,
    ...IMAGES.galeria.filter((src) => !IMAGES.heroSlideshow.includes(src)),
  ].slice(0, 12)

  return (
    <div className="min-h-screen bg-black text-white pt-32 sm:pt-36 md:pt-[10.5rem] pb-12 sm:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          to="/#nosso-canil"
          className="inline-flex items-center gap-2 text-white/60 hover:text-italy-green transition-colors mb-8"
        >
          <HiArrowLeft size={20} />
          {t('galeriaCanil.voltar')}
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-serif font-bold text-white mb-10"
        >
          {t('galeriaCanil.titulo')}
        </motion.h1>

        {/* Galeria de Fotos */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green flex-shrink-0">
              <HiPhotograph size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
              {t('galeriaCanil.galeriaTitulo')}
            </h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            {t('galeriaCanil.galeriaDesc')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galeriaFotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-lg overflow-hidden bg-white/5"
              >
                <img
                  src={src}
                  alt={`Canil Guardiões da Fronteira ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nossa Sede */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green flex-shrink-0">
              <HiOfficeBuilding size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
              {t('galeriaCanil.sedeTitulo')}
            </h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            {t('galeriaCanil.sedeDesc')}
          </p>
          <ul className="space-y-2 text-sm text-white/80 list-none">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green flex-shrink-0" />
                {t(`galeriaCanil.sedeItem${n}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* O Cuidado */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green flex-shrink-0">
              <HiHeart size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
              {t('galeriaCanil.cuidadoTitulo')}
            </h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            {t('galeriaCanil.cuidadoDesc')}
          </p>
          <ul className="space-y-2 text-sm text-white/80 list-none">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green flex-shrink-0" />
                {t(`galeriaCanil.cuidadoItem${n}`)}
              </li>
            ))}
          </ul>
        </section>

        {/* Entregas dos Filhotes */}
        <section id="entregas">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green flex-shrink-0">
              <HiTruck size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
              {t('galeriaCanil.entregasTitulo')}
            </h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            {t('galeriaCanil.entregasDesc')}
          </p>
          <ul className="space-y-2 text-sm text-white/80 list-none mb-6">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-italy-green flex-shrink-0" />
                {t(`galeriaCanil.entregasItem${n}`)}
              </li>
            ))}
          </ul>
          <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <img
              src="/cronograma/cronograma.png"
              alt="Cronograma de entregas dos filhotes - Canil Guardiões da Fronteira"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
