/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Thaedal Brand Colors
        gold: {
          50: '#FBF7E8',
          100: '#F5EAC4',
          200: '#EDDA9C',
          300: '#E5CA74',
          400: '#D4A853',
          500: '#C49A3D',
          600: '#A67C2E',
          700: '#875F22',
          800: '#684518',
          900: '#4A2F10',
        },
        navy: {
          50: '#E8EBF0',
          100: '#C5CDD9',
          200: '#9FADC2',
          300: '#798DAB',
          400: '#5A7499',
          500: '#3D5B87',
          600: '#2A4570',
          700: '#1A3058',
          800: '#0F1F3D',
          900: '#0A1628',
          950: '#050B14',
        },
        sand: '#F5E6D3',
        teal: '#2A9D8F',
        stone: '#8B7355',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        tamil: ['Catamaran', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

