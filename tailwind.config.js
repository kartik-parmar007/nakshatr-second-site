/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nk-bg':        '#FFFFFF',
        'nk-surface':   '#F0F4F8',
        'nk-cyan':      '#00AEEF',
        'nk-navy':      '#1C2B4A',
        'nk-secondary': '#5A7A9F',
        'nk-border':    '#D0DCE8',
      },
      fontFamily: {
        sans:    ['var(--font-body)',    'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
