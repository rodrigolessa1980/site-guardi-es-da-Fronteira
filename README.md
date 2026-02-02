# Guardiões da Fronteira | Canil Cane Corso Italiano

Site one-page premium para canil de Cane Corso. React + Vite, Tailwind CSS, Framer Motion.

## Tecnologias

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Icons

## Como rodar

```bash
npm install
npm run dev
```

O servidor inicia em `http://localhost:5173`.

## Estrutura

```
src/
├── components/       # Componentes React
├── context/          # ChatContext para o chat IA
├── config/           # Caminhos de imagens
├── data/             # Dados mock (animais, etc.)
└── App.jsx
```

## Integração n8n (Chat IA)

Para conectar o chat ao n8n:

1. Crie um webhook no n8n (POST)
2. Crie um arquivo `.env` na raiz:

```
VITE_N8N_WEBHOOK=https://seu-n8n.com/webhook/chat-guardioes
```

3. O payload enviado: `{ message: string, sessionId?: string }`
4. A resposta esperada: `{ reply: string }` ou `{ text: string }`

## Imagens

As pastas `imagens/`, `logo do canil/` e `cães/` são copiadas para `public/` antes do build. Mantenha as imagens nessas pastas na raiz do projeto.

## Build para produção

```bash
npm run build
npm run preview  # Visualizar o build
```
