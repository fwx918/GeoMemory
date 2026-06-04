/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 时迹 palette — warm parchment + ink
        ink: {
          DEFAULT: '#1c1917',
          soft: '#292524',
        },
        parchment: {
          50: '#fbf7ef',
          100: '#f5ecdb',
          200: '#ecdcc0',
        },
        seal: '#b4452f', // 印章红 — accent
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        serif: ['"Songti SC"', '"SimSun"', 'STSong', 'serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'typing': {
          '0%, 60%, 100%': { opacity: '0.25', transform: 'translateY(0)' },
          '30%': { opacity: '1', transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'typing': 'typing 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
