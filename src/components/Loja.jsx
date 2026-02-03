import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiTruck } from 'react-icons/hi'
import SectionTitle from './SectionTitle'
import AnimalDetailModal from './AnimalDetailModal'
import { LOJA_ANIMAIS } from '../data/animals'
import { useLanguage } from '../context/LanguageContext'

export default function Loja() {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const { t } = useLanguage()

  const statusLabels = {
    disponivel: { label: t('filhotes.disponivel'), color: 'bg-italy-green text-white' },
    reservado: { label: t('filhotes.reservado'), color: 'bg-italy-red/80 text-white' },
    vendido: { label: t('filhotes.vendido'), color: 'bg-dark-600 text-white/70' },
  }

  const getIdade = (animal) => {
    if (animal.idadeKey === 'anoMeses') return `${animal.idadeVal} ${t('loja.anoMeses')}`
    return `${animal.idadeVal} ${t('loja.anos')}`
  }

  return (
    <section id="loja" className="py-12 sm:py-16 lg:py-24 bg-black scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('loja.titulo')}</SectionTitle>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          {t('loja.subtitulo')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LOJA_ANIMAIS.map((animal, i) => {
            const status = statusLabels[animal.status] || statusLabels.disponivel
            return (
              <motion.article
                key={animal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden bg-dark-800 border border-white/10 hover:border-italy-green/50 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-700 flex items-center justify-center">
                  <img
                    src={animal.foto}
                    alt={animal.nome}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded ${status.color}`}>
                    {status.label}
                  </span>
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-black/90 text-white font-serif text-xl font-bold">
                      {animal.nome}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/60 text-sm mb-3">
                    {animal.sexo === 'M' ? t('loja.macho') : t('loja.femea')} • {getIdade(animal)}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAnimal(animal)}
                    className="w-full py-3 min-h-[44px] text-sm font-medium border border-italy-green text-italy-green rounded-lg hover:bg-italy-green hover:text-white transition-colors flex items-center justify-center"
                  >
                    {t('loja.verDetalhes')}
                  </motion.button>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            to="/galeria-canil#entregas"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 min-h-[48px] bg-italy-green text-white font-semibold rounded-lg hover:bg-italy-green/90 transition-colors"
          >
            <HiTruck size={20} />
            {t('loja.sobreEntrega')}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedAnimal && (
          <AnimalDetailModal
            animal={selectedAnimal}
            onClose={() => setSelectedAnimal(null)}
            showTenhoInteresse
          />
        )}
      </AnimatePresence>
    </section>
  )
}
