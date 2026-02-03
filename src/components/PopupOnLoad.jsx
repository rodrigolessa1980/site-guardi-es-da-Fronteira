import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'

const POPUP_IMAGE = '/imagens/popup.png'
const DURATION_SECONDS = 10

export default function PopupOnLoad() {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = setTimeout(handleClose, DURATION_SECONDS * 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[76vw] max-h-[72vh]"
          >
            <img
              src={POPUP_IMAGE}
              alt="Canil Guardiões da Fronteira"
              className="max-w-full max-h-[72vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute -top-2 -right-2 p-2 rounded-full bg-white/10 text-white hover:bg-italy-red transition-colors"
              aria-label="Fechar"
            >
              <HiX size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
