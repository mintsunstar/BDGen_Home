/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deep: { DEFAULT: '#050B18', 2: '#0A1428', 3: '#0F1E3A' },
        neon: { blue: '#00C8FF', purple: '#6C3FFF' },
      },
      fontFamily: { sans: ['Pretendard', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
