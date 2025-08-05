/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo
          light: '#818CF8',
          dark: '#4F46E5'
        },
        accent: {
          pink: '#EC4899',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #6366F1, #8B5CF6, #EC4899)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
