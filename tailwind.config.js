/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          light: '#2A2A2A',
          hover: '#000000'
        },
        surface: {
          light: '#F8F9FC',
          dark: '#1A1A1A'
        },
        dark: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          hover: '#2A2A2A'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      zIndex: {
        'sidebar': '40',
        'header': '30',
        'modal': '50',
        'dropdown': '45',
        'tooltip': '60',
        'toast': '70'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}