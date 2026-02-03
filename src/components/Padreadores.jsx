import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from './SectionTitle'
import AnimalDetailModal from './AnimalDetailModal'
import { PADREADORES } from '../data/animals'
import { useLanguage } from '../context/LanguageContext'

const DESC_KEYS = ['thor', 'apollo', 'maximus']

export default function Padreadores() {
  const { t } = useLanguage()
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  
  return (
    <section id="padreadores" className="py-12 sm:py-16 lg:py-24 bg-dark-900 scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('padreadores.titulo')}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PADREADORES.map((pad, i) => (
            <motion.article
              key={pad.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-xl overflow-hidden bg-dark-800 border border-white/10 hover:border-italy-green/50 transition-colors flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-dark-700 flex items-center justify-center">
                <img
                  src={pad.foto}
                  alt={pad.nome}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="absolute bottom-4 left-4 right-4 font-serif text-2xl font-bold text-white z-10">
                  {pad.nome}
                </h3>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <p className="text-white/80 text-sm leading-relaxed mb-3">{t(`padreadores.${DESC_KEYS[i]}`)}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAnimal(pad)}
                  className="w-full py-3 min-h-[44px] text-sm font-medium border border-italy-green text-italy-green rounded-lg hover:bg-italy-green hover:text-white transition-colors flex items-center justify-center"
                >
                  {t('filhotes.verDetalhes')}
                </motion.button>
              </div>
            </motion.article>
          ))}
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
