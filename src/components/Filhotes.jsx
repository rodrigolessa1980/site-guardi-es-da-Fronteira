import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from './SectionTitle'
import AnimalDetailModal from './AnimalDetailModal'
import { FILHOTES } from '../data/animals'
import { useLanguage } from '../context/LanguageContext'

export default function Filhotes() {
  const { t } = useLanguage()
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const statusLabels = {
    disponivel: { label: t('filhotes.disponivel'), color: 'bg-italy-green text-white' },
    reservado: { label: t('filhotes.reservado'), color: 'bg-italy-red/80 text-white' },
    vendido: { label: t('filhotes.vendido'), color: 'bg-dark-600 text-white/70' },
  }

  return (
    <section id="filhotes" className="py-12 sm:py-16 lg:py-24 bg-dark-900 scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('filhotes.titulo')}</SectionTitle>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          {t('filhotes.subtitulo')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FILHOTES.map((fil, i) => {
            const status = statusLabels[fil.status] || statusLabels.disponivel
            return (
              <motion.article
                key={fil.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden bg-dark-800 border border-white/10 flex flex-col"
              >
                <div className="aspect-square overflow-hidden relative bg-dark-700 flex items-center justify-center">
                  <img
                    src={fil.foto}
                    alt={fil.nome}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded ${status.color}`}>
                    {status.label}
                  </span>
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-black/90 text-white font-serif text-xl font-bold">
                      {fil.nome}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAnimal(fil)}
                    className="w-full py-3 min-h-[44px] text-sm font-medium border border-italy-green text-italy-green rounded-lg hover:bg-italy-green hover:text-white transition-colors flex items-center justify-center"
                  >
                    {t('filhotes.verDetalhes')}
                  </motion.button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      {/* Modal de detalhes */}
      <AnimatePresence>
        {selectedAnimal && (
          <AnimalDetailModal
            animal={selectedAnimal}
            onClose={() => setSelectedAnimal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
