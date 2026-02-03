import { motion } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'

const WHATSAPP_NUMERO = '554792369459'

export default function AnimalDetailModal({ animal, onClose, showTenhoInteresse = false }) {
  const { t } = useLanguage()

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
            <p className="text-white/80 text-sm break-words">{t('loja.pai')}: {animal.pai} | {t('loja.mae')}: {animal.mae}</p>
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
              className="w-full py-4 min-h-[48px] bg-gradient-to-r from-italy-green to-italy-red text-white font-semibold rounded-lg flex items-center justify-center"
            >
              {t('loja.tenhoInteresse')}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
