import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiClipboardList } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'

export default function OrientacaoConsultoria() {
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-[8.5rem] pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/#consultoria"
          className="inline-flex items-center gap-2 text-white/60 hover:text-italy-green transition-colors mb-8"
        >
          <HiArrowLeft size={20} />
          {t('orientacao.voltar')}
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-20 h-20 rounded-full bg-italy-green/20 flex items-center justify-center text-italy-green flex-shrink-0">
            <HiClipboardList size={40} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {t('orientacao.titulo')}
            </h1>
            <p className="text-italy-green text-sm mt-1">
              Canil Guardiões da Fronteira
            </p>
          </div>
        </div>

        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3 border-b border-white/20 pb-2">
              {t('orientacao.acompanhamento')}
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              {t('orientacao.acompanhamentoTexto')}
            </p>
            <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside">
              <li>{t('orientacao.acompanhamento1')}</li>
              <li>{t('orientacao.acompanhamento2')}</li>
              <li>{t('orientacao.acompanhamento3')}</li>
              <li>{t('orientacao.acompanhamento4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 border-b border-white/20 pb-2">
              {t('orientacao.alimentacao')}
            </h2>
            <p className="text-sm leading-relaxed">
              {t('orientacao.alimentacaoTexto')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 border-b border-white/20 pb-2">
              {t('orientacao.vacinacao')}
            </h2>
            <p className="text-sm leading-relaxed">
              {t('orientacao.vacinacaoTexto')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 border-b border-white/20 pb-2">
              {t('orientacao.saude')}
            </h2>
            <p className="text-sm leading-relaxed">
              {t('orientacao.saudeTexto')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
