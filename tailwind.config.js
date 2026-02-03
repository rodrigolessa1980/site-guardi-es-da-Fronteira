/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Breakpoints mobile-first: base = mobile, sm = 640px, md = 768px, lg = 1024px, xl = 1280px
    screens: {
      sm: '640px',   // tablet
      md: '768px',   // tablet landscape
      lg: '1024px',  // desktop
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Paleta bandeira italiana
        italy: {
          green: '#008C45',
          white: '#FFFFFF',
          red: '#CD212A',
        },
        // Cor do chat
        chat: '#0E3B2E',
        // Tons para fundo e overlays
        dark: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#242424',
          500: '#2d2d2d',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-italy': 'linear-gradient(90deg, #008C45, #FFFFFF, #CD212A)',
      },
    },
  },
  plugins: [],
}
