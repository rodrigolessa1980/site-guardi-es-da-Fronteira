/**
 * Caminhos das imagens - servidas a partir de public/
 * As pastas imagens/, logo do canil/ e cães/ são copiadas para public/ pelo script copy-assets.js
 */
export const IMAGES = {
  logo: '/logo-do-canil/logo.jpg',
  hero: '/imagens/capa.jpg',
  // Álbum principal - apenas da pasta "Album de Fotos"
  heroSlideshow: [
    '/album-de-fotos/Screenshot_1.jpg',
    '/album-de-fotos/Screenshot_2.jpg',
    '/album-de-fotos/Screenshot_3.jpg',
    '/album-de-fotos/Screenshot_4.jpg',
    '/album-de-fotos/Screenshot_5.jpg',
    '/album-de-fotos/Screenshot_6.jpg',
    '/album-de-fotos/Screenshot_7.jpg',
    '/album-de-fotos/Screenshot_8.jpg',
  ],
  padreadores: [
    '/imagens/cane-corso-p.jpg',
    '/imagens/images.jpg',
    '/imagens/images (1).jpg',
  ],
  matrizes: [
    '/imagens/images.jpg',
    '/imagens/images (2).jpg',
    '/imagens/carne-corso-na-grama.png',
  ],
  filhotes: [
    '/caes/Screenshot_1.jpg',
    '/caes/Screenshot_2.jpg',
    '/caes/Screenshot_3.jpg',
    '/caes/Screenshot_4.jpg',
    '/caes/Screenshot_5.jpg',
    '/caes/Screenshot_6.jpg',
    '/caes/Screenshot_7.jpg',
  ],
  galeria: [
    '/imagens/Racas_Cane_Corso_Caes_e_cia_SEO.jpg',
    '/imagens/cane-corso.jpg',
    '/imagens/carne-corso-na-grama.png',
    ...Array.from({ length: 7 }, (_, i) => `/caes/Screenshot_${i + 1}.jpg`),
  ],
  /** Fotos dos depoimentos (pequenas). Use imagens em public/depoimentos/ ou substitua pelos seus caminhos. */
  depoimentos: {
    1: '/imagens/cane-corso-p.jpg',
    2: '/imagens/images.jpg',
    3: '/imagens/images (1).jpg',
    4: '/caes/Screenshot_1.jpg',
    5: '/caes/Screenshot_2.jpg',
    6: '/caes/Screenshot_3.jpg',
  },
  /** Miniaturas das bandeiras (Brasil, Paraguai, EUA) para seletor de idioma */
  flags: {
    br: 'https://flagcdn.com/w40/br.png',
    py: 'https://flagcdn.com/w40/py.png',
    us: 'https://flagcdn.com/w40/us.png',
  },
}
