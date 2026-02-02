import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'

export default function TermosUso() {
  const { lang, t } = useLanguage()
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en'
  const termos = t('termosUso')

  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-[8.5rem] pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-italy-red transition-colors mb-8"
        >
          <HiArrowLeft size={20} />
          {t('voltarSite')}
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-italy-red">
          {termos?.titulo || 'Termos de Uso'}
        </h1>
        <p className="text-white/60 text-sm mb-12">
          {t('ultimaAtualizacao')}: {new Date().toLocaleDateString(locale)}
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. {termos?.aceitacao}</h2>
            <p>{termos?.aceitacaoTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. {termos?.descricao}</h2>
            <p>{termos?.descricaoTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. {termos?.usoAdequado}</h2>
            <p>{termos?.usoAdequadoTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. {termos?.propriedade}</h2>
            <p>{termos?.propriedadeTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. {termos?.contatoTrans}</h2>
            <p>{termos?.contatoTransTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. {termos?.limitacao}</h2>
            <p>{termos?.limitacaoTexto}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. {termos?.alteracoes}</h2>
            <p>{termos?.alteracoesTexto}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
