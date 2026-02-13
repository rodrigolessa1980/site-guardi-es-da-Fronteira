import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX } from 'react-icons/hi'
import { useChat } from '../context/ChatContext'
import { useLanguage } from '../context/LanguageContext'

/**
 * ============================================================
 * CHAT DE ATENDIMENTO - Integração n8n (webhook)
 * ============================================================
 * Payload: { previous: [...], now: string }
 * - previous: últimas 10 mensagens (resumidas/truncadas)
 * - now: última mensagem do usuário
 * Resposta: { reply/text/message } ou array [{ output: string }]
 */

const N8N_WEBHOOK_URL = 'https://dadosbi.monkeybranch.com.br/webhook/test1234'
const CONTEXT_WINDOW_SIZE = 30
const MAX_PREVIOUS_MSG_LENGTH = 200
const STORAGE_KEY_MESSAGES = 'guardioes_chat_messages'
const STORAGE_KEY_SESSION_ID = 'guardioes_chat_session_id'

function getSessionId() {
  let id = localStorage.getItem(STORAGE_KEY_SESSION_ID)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY_SESSION_ID, id)
  }
  return id
}

// Regex para detectar URLs (http/https, incluindo wa.me e similares)
const URL_REGEX = /(https?:\/\/[^\s]+)/g

/**
 * Converte texto com links em nós React: texto normal + botão "Entrar em contato" para cada URL.
 */
function renderMessageWithLinks(text) {
  if (!text || typeof text !== 'string') return text
  const parts = text.split(URL_REGEX)
  return parts.map((part, i) => {
    const isUrl = part.startsWith('http://') || part.startsWith('https://')
    if (isUrl) {
      const href = part.replace(/\s+$/, '')
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 mb-1 px-4 py-2 rounded-lg font-medium text-white text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors no-underline"
        >
          Entrar em contato
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function buildPrevious(messages) {
  const slice = messages.slice(-CONTEXT_WINDOW_SIZE)
  return slice.map((msg) => ({
    role: msg.from === 'user' ? 'user' : 'bot',
    text: (msg.text || '').slice(0, MAX_PREVIOUS_MSG_LENGTH),
  }))
}

async function sendToN8n(previous, now) {
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ previous, now: (now || '').slice(0, MAX_PREVIOUS_MSG_LENGTH) }),
    })
    const data = await res.json()
    if (Array.isArray(data) && data[0]?.output != null) return String(data[0].output)
    return data.reply ?? data.text ?? data.message ?? data.output ?? 'Não foi possível processar sua mensagem.'
  } catch (err) {
    console.error('Erro ao conectar ao n8n:', err)
    return 'Desculpe, o atendimento está temporariamente indisponível. Envie uma mensagem pelo WhatsApp.'
  }
}

export default function ChatWidget() {
  const { open, toggleChat, closeChat } = useChat()
  const { lang, t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)
  const initialized = useRef(false)
  const queueRef = useRef([])
  const messagesRef = useRef([])

  // Inicialização: localStorage ou primeira mensagem do bot (uma vez só)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MESSAGES)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed)
          return
        }
      }
    } catch (_) {}
    setMessages([
      {
        id: Date.now(),
        from: 'bot',
        text: t('chat.primeiraMsg'),
        time: new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }, [lang, t])

  // Manter ref em sync com messages para construir previous na fila
  messagesRef.current = messages

  // Persistir mensagens no localStorage sempre que mudarem
  useEffect(() => {
    if (messages.length === 0) return
    try {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages))
    } catch (_) {}
  }, [messages])

  const getTime = () => new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' })

  const processQueue = () => {
    if (queueRef.current.length === 0) {
      setLoading(false)
      return
    }
    const nowText = queueRef.current.shift()
    if (!nowText) {
      processQueue()
      return
    }
    setLoading(true)
    const currentMessages = messagesRef.current
    const previous = buildPrevious(currentMessages)
    sendToN8n(previous, nowText)
      .then((reply) => {
        const text = reply || t('chat.fallbackReply')
        const botMsg = {
          id: Date.now() + 1,
          from: 'bot',
          text,
          time: new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages((m) => {
          const next = [...m, botMsg]
          messagesRef.current = next
          return next
        })
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
      })
      .catch(() => {
        const botMsg = {
          id: Date.now() + 1,
          from: 'bot',
          text: 'Desculpe, tente novamente.',
          time: new Date().toLocaleTimeString(lang === 'es' ? 'es' : 'pt-BR', { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages((m) => {
          const next = [...m, botMsg]
          messagesRef.current = next
          return next
        })
      })
      .finally(() => {
        processQueue()
      })
  }

  const handleSend = (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text,
      time: getTime(),
    }
    const next = [...messages, userMsg]
    messagesRef.current = next
    setMessages(next)
    setInput('')
    queueRef.current.push(text)
    if (!loading) processQueue()
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
                      <p className="whitespace-pre-line">
                        {msg.from === 'bot' ? renderMessageWithLinks(msg.text) : msg.text}
                      </p>
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