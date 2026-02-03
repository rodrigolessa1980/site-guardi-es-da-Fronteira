import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX } from 'react-icons/hi'
import { useChat } from '../context/ChatContext'
import { useLanguage } from '../context/LanguageContext'

/**
 * ============================================================
 * CHAT DE ATENDIMENTO COM IA - Integração n8n
 * ============================================================
 *
 * Para conectar ao n8n:
 * 1. Configure um webhook no n8n
 * 2. Atualize a constante N8N_WEBHOOK_URL abaixo
 * 3. O payload enviado: { message: string, sessionId?: string }
 * 4. A resposta esperada: { reply: string } ou { text: string }
 *
 * Exemplo de webhook n8n:
 * - Método: POST
 * - Body: { message: "texto do usuário" }
 * - Resposta: { reply: "resposta da IA" }
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK || 'https://seu-n8n.com/webhook/chat-guardioes' // ALTERAR: URL do seu webhook n8n

async function sendToN8n(message) {
  // Se webhook não configurado, retorna mensagem simulada
  if (N8N_WEBHOOK_URL.includes('seu-n8n.com')) {
    return 'Obrigado pela mensagem! Em breve entraremos em contato pelo WhatsApp ou e-mail. Para atendimento imediato, use o botão WhatsApp no site.'
  }
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        sessionId: sessionStorage.getItem('chatSessionId') || crypto.randomUUID(),
      }),
    })
    const data = await res.json()
    return data.reply ?? data.text ?? 'Não foi possível processar sua mensagem.'
  } catch (err) {
    console.error('Erro ao conectar ao n8n:', err)
    return 'Desculpe, o atendimento está temporariamente indisponível. Envie uma mensagem pelo WhatsApp.'
  }
}

export default function ChatWidget() {
  const { open, toggleChat, closeChat } = useChat()
  const { lang, t } = useLanguage()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([{
      id: 1,
      from: 'bot',
      text: t('chat.primeiraMsg'),
      time: new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }])
  }, [lang])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  const handleSend = async (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text,
      time: new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Integração n8n
    const reply = await sendToN8n(text, t('chat.fallbackReply'))
    // Simulação local (quando n8n não está configurado):
    // const reply = 'Obrigado pela mensagem! Em breve entraremos em contato pelo WhatsApp ou e-mail.'

    const botMsg = {
      id: Date.now() + 1,
      from: 'bot',
      text: reply,
      time: new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, botMsg])
    setLoading(false)

    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }

  return (
    <>
      {/* Botão flutuante - min 44px para toque */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 min-w-[48px] min-h-[48px] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg touch-target"
        style={{ backgroundColor: '#1C2421' }}
        aria-label="Abrir chat"
      >
        <HiChat size={28} />
      </motion.button>

      {/* Modal do chat - mobile-first: full width em mobile, max-width em desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 sm:bottom-24 right-3 left-3 sm:left-auto sm:right-6 z-50 w-[calc(100%-1.5rem)] sm:w-[340px] md:w-[380px] sm:max-w-[calc(100vw-3rem)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="chat-widget overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-italy-green via-white to-italy-red px-4 py-3 flex items-center justify-between">
                <h3 className="font-serif font-bold text-black text-lg">{t('chat.titulo')}</h3>
                <button
                  onClick={closeChat}
                  className="p-1.5 rounded-full bg-black/20 text-black hover:bg-black/30 transition-colors"
                  aria-label="Fechar chat"
                >
                  <HiX size={20} />
                </button>
              </div>

              {/* Mensagens - min-height para garantir espaço em mobile */}
              <div
                ref={listRef}
                className="min-h-[12rem] sm:min-h-[16rem] max-h-[50vh] overflow-y-auto p-3 sm:p-4 space-y-3"
                style={{ backgroundColor: 'rgba(14, 59, 46, 0.95)' }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                        msg.from === 'user'
                          ? 'bg-italy-green text-white rounded-br-md'
                          : 'bg-dark-700 text-white/90 rounded-bl-md border-l-2 border-italy-green'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl rounded-bl-md bg-dark-700 text-white/70 text-sm">
                      {t('chat.digitando')}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-white/10" style={{ backgroundColor: '#0E3B2E' }}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 min-w-0 px-4 py-3 sm:py-2.5 rounded-full bg-dark-900 border border-white/10 text-white placeholder-white/50 text-base sm:text-sm focus:outline-none focus:border-italy-green"
                    disabled={loading}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="flex-shrink-0 min-h-[44px] px-4 py-3 sm:py-2.5 border border-italy-green text-italy-green font-medium rounded-full hover:bg-italy-green hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-italy-green transition-colors"
                  >
                    {t('chat.enviar')}
                  </motion.button>
                </div>
                <p className="text-xs text-white/50 mt-2 px-1">
                  {t('chat.hint')}
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
