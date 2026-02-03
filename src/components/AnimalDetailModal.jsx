import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'
import { PADREADORES, MATRIZES } from '../data/animals'

const WHATSAPP_NUMERO = '554792369459'

function getFotoPai(nomePai) {
  const padrao = PADREADORES.find((p) => p.nome === nomePai)
  return padrao?.foto ?? null
}

function getFotoMae(nomeMae) {
  const matriz = MATRIZES.find((m) => m.nome === nomeMae)
  return matriz?.foto ?? null
}

export default function AnimalDetailModal({ animal, onClose, showTenhoInteresse = false }) {
  const { t } = useLanguage()
  const [lightboxFoto, setLightboxFoto] = useState(null)
  const fotoPai = getFotoPai(animal.pai)
  const fotoMae = getFotoMae(animal.mae)

  const statusLabels = {
    disponivel: { label: t('filhotes.disponivel'), color: 'bg-italy-green' },
    reservado: { label: t('filhotes.reservado'), color: 'bg-italy-red/80' },
    vendido: { label: t('filhotes.vendido'), color: 'bg-dark-600' },
  }

  const status = statusLabels[animal.status] || statusLabels.disponivel
  const descricao = t(`animais.${animal.descKey}`)
  const caracteristicas = animal.caractKeys?.map((k) => t(`animais.${k}`)) || []
  const temperamento = t(`animais.${animal.temperKey}`)

  const getIdade = () => {
    if (animal.idadeKey === 'anoMeses') return `${animal.idadeVal} ${t('loja.anoMeses')}`
    if (animal.idadeKey === 'meses') return `${animal.idadeVal} ${t('loja.meses')}`
    return `${animal.idadeVal} ${t('loja.anos')}`
  }

  const handleTenhoInteresse = () => {
    const mensagem = encodeURIComponent(
      `Olá! Tenho interesse no(a) ${animal.nome} da Loja Guardiões da Fronteira.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90dvh] sm:max-h-[90vh] my-4 overflow-y-auto bg-dark-800 rounded-xl sm:rounded-2xl border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] p-2 flex items-center justify-center rounded-full bg-dark-900/80 text-white hover:bg-italy-red transition-colors"
          aria-label="Fechar"
        >
          <HiX size={24} />
        </button>

        <div className="grid grid-cols-2 gap-1 p-2 sm:p-4 bg-dark-900">
          {animal.fotos?.slice(0, 4).map((foto, i) => (
            <img
              key={i}
              src={foto}
              alt={`${animal.nome} ${i + 1}`}
              className="aspect-square object-cover rounded-lg"
            />
          ))}
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{animal.nome}</h2>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${status.color} text-white`}>
              {status.label}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <p className="text-white/80"><span className="text-italy-green font-medium">{t('loja.sexo')}:</span> {animal.sexo === 'M' ? t('loja.macho') : t('loja.femea')}</p>
            <p className="text-white/80"><span className="text-italy-green font-medium">{t('loja.idade')}:</span> {getIdade()}</p>
            {animal.preco && (
              <p className="text-white/80 sm:col-span-2">
                <span className="text-italy-green font-medium">{t('loja.preco')}:</span>{' '}
                <span className="text-italy-green font-bold text-lg">{animal.preco}</span>
              </p>
            )}
            {animal.pedigreeEntidade && (
              <p className="text-white/80 sm:col-span-2">
                <span className="text-italy-green font-medium">{t('loja.entidadePedigree')}:</span>{' '}
                {animal.pedigreeEntidade}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-italy-green mb-2">{t('loja.descricao')}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{descricao}</p>
          </div>

          <div>
            <h3 className="font-semibold text-italy-green mb-2">{t('loja.caracteristicas')}</h3>
            <ul className="flex flex-wrap gap-2">
              {caracteristicas.map((c, i) => (
                <li key={i} className="px-2 py-1 bg-white/10 rounded text-sm text-white/90">{c}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-italy-green mb-2">{t('loja.temperamento')}</h3>
            <p className="text-white/80 text-sm">{temperamento}</p>
          </div>

          <div>
            <h3 className="font-semibold text-italy-green mb-2">{t('loja.filiacao')}</h3>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-italy-green font-medium">{t('loja.pai')}:</span>
                {fotoPai ? (
                  <button
                    type="button"
                    onClick={() => setLightboxFoto({ src: fotoPai, nome: animal.pai })}
                    className="flex items-center gap-2 rounded-lg overflow-hidden border border-white/20 hover:border-italy-green/60 transition-colors focus:outline-none focus:ring-2 focus:ring-italy-green"
                  >
                    <img src={fotoPai} alt={animal.pai} className="w-12 h-12 object-cover" />
                    <span className="text-white/90 font-medium">{animal.pai}</span>
                  </button>
                ) : (
                  <span className="text-white/80">{animal.pai}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-italy-green font-medium">{t('loja.mae')}:</span>
                {fotoMae ? (
                  <button
                    type="button"
                    onClick={() => setLightboxFoto({ src: fotoMae, nome: animal.mae })}
                    className="flex items-center gap-2 rounded-lg overflow-hidden border border-white/20 hover:border-italy-green/60 transition-colors focus:outline-none focus:ring-2 focus:ring-italy-green"
                  >
                    <img src={fotoMae} alt={animal.mae} className="w-12 h-12 object-cover" />
                    <span className="text-white/90 font-medium">{animal.mae}</span>
                  </button>
                ) : (
                  <span className="text-white/80">{animal.mae}</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-italy-green mb-2">{t('loja.pedigree')}</h3>
            <div className="text-sm text-white/80 space-y-1">
              {animal.pedigree && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p>{t('loja.avoPaterno')}: {animal.pedigree.avoPaterno}</p>
                  <p>{t('loja.avoPaterna')}: {animal.pedigree.avoPaterna}</p>
                  <p>{t('loja.avoMaterno')}: {animal.pedigree.avoMaterno}</p>
                  <p>{t('loja.avoMaterna')}: {animal.pedigree.avoMaterna}</p>
                </div>
              )}
            </div>
          </div>

          {showTenhoInteresse && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTenhoInteresse}
              className="w-full py-3 min-h-[44px] text-sm font-medium border border-italy-green text-italy-green rounded-lg hover:bg-italy-green hover:text-white transition-colors flex items-center justify-center"
            >
              {t('loja.tenhoInteresse')}
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxFoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxFoto(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Escape' && setLightboxFoto(null)}
            aria-label="Fechar foto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setLightboxFoto(null)}
                className="absolute -top-12 right-0 min-w-[44px] min-h-[44px] p-2 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-italy-red transition-colors z-10"
                aria-label="Fechar"
              >
                <HiX size={24} />
              </button>
              <img
                src={lightboxFoto.src}
                alt={lightboxFoto.nome}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="mt-2 text-white font-medium text-lg">{lightboxFoto.nome}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
