import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiPaperAirplane } from 'react-icons/hi'
import SectionTitle from './SectionTitle'
import { useLanguage } from '../context/LanguageContext'

export default function Contato() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Dados do formulário:', formData)
    setEnviado(true)
    setEnviando(false)
    setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <section id="contato" className="py-12 sm:py-16 lg:py-24 bg-dark-900 scroll-mt-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t('contato.titulo')}</SectionTitle>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          {t('contato.subtitulo')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Imagem de contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-white/10 shadow-lg flex items-center justify-center bg-dark-800"
          >
            <img
              src="/imagens/contato.png"
              alt="Contato - Guardiões da Fronteira"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-dark-800 rounded-xl p-4 sm:p-6 border border-white/10 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <HiMail className="text-italy-green text-xl" />
              <h3 className="font-serif text-xl font-bold text-white">{t('contato.entreEmContato')}</h3>
            </div>
            <p className="text-white/70 text-sm mb-2">
              {t('contato.formInfo')}{' '}
              <a href="mailto:contato@guardioesdafronteira.com.br" className="text-italy-green hover:underline">
                contato@guardioesdafronteira.com.br
              </a>
            </p>
            <hr className="border-white/10 my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm text-white/70 mb-1">{t('contato.nome')}</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-italy-green transition-colors"
                  placeholder={t('contato.placeholderNome')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-white/70 mb-1">{t('contato.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-italy-green transition-colors"
                  placeholder={t('contato.placeholderEmail')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm text-white/70 mb-1">{t('contato.telefone')}</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-italy-green transition-colors"
                placeholder={t('contato.placeholderTelefone')}
              />
            </div>

            <div>
              <label htmlFor="assunto" className="block text-sm text-white/70 mb-1">{t('contato.assunto')}</label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                required
                value={formData.assunto}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-italy-green transition-colors"
                placeholder={t('contato.placeholderAssunto')}
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm text-white/70 mb-1">{t('contato.mensagem')}</label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={10}
                value={formData.mensagem}
                onChange={handleChange}
                className="w-full min-h-[140px] sm:min-h-[180px] lg:min-h-[220px] px-4 py-3 bg-dark-900 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-italy-green transition-colors resize-y"
                placeholder={t('contato.placeholderMensagem')}
              />
            </div>

            <motion.button
              type="submit"
              disabled={enviando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 min-h-[48px] text-sm font-medium border border-italy-green text-italy-green rounded-lg hover:bg-italy-green hover:text-white disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-italy-green transition-colors"
            >
              {enviando ? t('contato.enviando') : enviado ? t('contato.enviado') : (
                <>
                  <HiPaperAirplane size={20} />
                  {t('contato.enviar')}
                </>
              )}
            </motion.button>

            {enviado && (
              <p className="text-italy-green text-sm text-center">
                {t('contato.obrigado')}
              </p>
            )}
          </motion.form>
        </div>

      </div>
    </section>
  )
}
