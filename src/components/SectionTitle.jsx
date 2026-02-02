import { motion } from 'framer-motion'

export default function SectionTitle({ children, className = '' }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-2 ${className}`}
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-italy-green shrink-0" />
        <span className="bg-gradient-to-r from-italy-green via-white to-italy-red bg-clip-text text-transparent break-words">
          {children}
        </span>
        <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-italy-red shrink-0" />
      </span>
    </motion.h2>
  )
}
