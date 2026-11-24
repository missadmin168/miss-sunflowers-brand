/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Kantumruy Pro"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        sunflower: {
          50: '#FFFDF5',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FDE047',
          400: '#F5B700',
          500: '#EAB308',
          600: '#D97706',
          700: '#B45309',
          800: '#7C2D12',
          900: '#57492A',
        },
        night: {
          50: '#FBF6E6',
          100: '#E8DFC8',
          200: '#B8A882',
          300: '#3A2E14',
          400: '#1E1A12',
          500: '#161410',
          600: '#0D0C09',
          700: '#120F09',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-out': 'fadeOut 0.5s ease-in forwards',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.25s ease-out',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'ticker': 'ticker 1s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(245,183,0,0.2)' }, '50%': { boxShadow: '0 0 40px rgba(245,183,0,0.4)' } },
        ticker: { '0%': { opacity: '1' }, '49%': { opacity: '1' }, '50%': { opacity: '0.3' }, '100%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
