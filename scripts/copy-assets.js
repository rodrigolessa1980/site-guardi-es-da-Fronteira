/**
 * Copia imagens, logo e cães para public/ para que o Vite possa servi-los.
 * Execute: node scripts/copy-assets.js
 */
import { cpSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

const copy = (src, dest) => {
  if (existsSync(src)) {
    mkdirSync(dirname(dest), { recursive: true })
    cpSync(src, dest, { recursive: true })
    console.log(`Copiado: ${src} -> ${dest}`)
  } else {
    console.warn(`Pasta não encontrada: ${src}`)
  }
}

copy(join(root, 'imagens'), join(publicDir, 'imagens'))
copy(join(root, 'logo do canil'), join(publicDir, 'logo-do-canil'))
copy(join(root, 'cães'), join(publicDir, 'caes'))
copy(join(root, 'album de fotos'), join(publicDir, 'album-de-fotos'))
copy(join(root, 'cronograma'), join(publicDir, 'cronograma'))
