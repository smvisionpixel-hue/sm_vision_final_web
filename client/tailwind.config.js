/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#102A43',
          900: '#0A192F', // Brand Navy Primary
          950: '#060F1E',
        },
        brand: {
          navy: '#0A192F',
          royal: '#2563EB',
          sky: '#38BDF8',
          light: '#F8FAFC',
          card: '#FFFFFF',
          slate: '#64748B',
          darkslate: '#1E293B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(10, 25, 47, 0.04)',
        'premium': '0 10px 30px -10px rgba(10, 25, 47, 0.08)',
        'elevated': '0 20px 40px -15px rgba(37, 99, 235, 0.12)',
      }
    },
  },
  plugins: [],
}
