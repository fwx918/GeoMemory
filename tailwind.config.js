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
        // 地标高亮呼吸（SVG 用 r 缩放不便，改用透明度+缩放）
        'ping-slow': {
          '0%': { opacity: '0.5', transform: 'scale(0.7)' },
          '70%, 100%': { opacity: '0', transform: 'scale(1.4)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'typing': 'typing 1.2s infinite ease-in-out',
        'ping-slow': 'ping-slow 1.8s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}
