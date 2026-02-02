import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'

export default function PoliticaPrivacidade() {
  const { lang, t } = useLanguage()
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en'
  const p = t('politicaPrivacidade')

  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-[8.5rem] pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-italy-green transition-colors mb-8"
        >
          <HiArrowLeft size={20} />
          {t('voltarSite')}
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-italy-green">
          {p?.titulo || 'Política de Privacidade'}
        </h1>
        <p className="text-white/60 text-sm mb-12">
          {t('ultimaAtualizacao')}: {new Date().toLocaleDateString(locale)}
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. {p?.introducao}</h2>
            <p>{p?.intro}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. {p?.dados}</h2>
            <p>{p?.dadosTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. {p?.uso}</h2>
            <p>{p?.usoTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. {p?.compartilhamento}</h2>
            <p>{p?.compartilhamentoTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. {p?.seguranca}</h2>
            <p>{p?.segurancaTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. {p?.direitos}</h2>
            <p>{p?.direitosTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. {p?.alteracoes}</h2>
            <p>{p?.alteracoesTexto}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
