/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        navy: {
          DEFAULT: '#0A0F1E',
          light: '#111827',
          panel: '#1A2744',
        },
        brand: {
          blue: '#2563EB',
          cyan: '#38BDF8',
        },
        slate: {
          subtle: '#334155',
          muted: '#64748B',
          text: '#94A3B8',
        },
      },
      animation: {
        'grid-fade': 'gridFade 1.5s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
      },
      keyframes: {
        gridFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
