/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        bangla: ['"Hind Siliguri"', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f5f7fa',
          100: '#e9eef5',
          200: '#cfd8e6',
          300: '#a8b7cc',
          400: '#7a8fa9',
          500: '#566c87',
          600: '#3e536c',
          700: '#2b3e54',
          800: '#1c2c40',
          900: '#10202f',
          950: '#0a1521',
        },
        teal: {
          50: '#eefbf8',
          100: '#d4f5ec',
          200: '#a9e9d8',
          300: '#71d5bf',
          400: '#38b89f',
          500: '#1c9b85',
          600: '#107a6a',
          700: '#0f6055',
          800: '#114c44',
          900: '#113f3a',
        },
        sand: {
          50: '#fbf9f5',
          100: '#f4efe3',
          200: '#e8dfca',
          300: '#d7c8a6',
          400: '#c1ab7c',
          500: '#a88f5e',
        },
        status: {
          success: '#16a34a',
          successSoft: '#dcfce7',
          warn: '#d97706',
          warnSoft: '#fef3c7',
          danger: '#dc2626',
          dangerSoft: '#fee2e2',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16,32,47,0.06), 0 1px 3px 0 rgba(16,32,47,0.04)',
        float: '0 8px 24px -8px rgba(16,32,47,0.18), 0 2px 6px -2px rgba(16,32,47,0.08)',
        glow: '0 0 0 1px rgba(28,155,133,0.25), 0 8px 30px -8px rgba(28,155,133,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'blink': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'bar': {
          '0%,100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        'pulse-ring': 'pulse-ring 1.4s ease-out infinite',
        'blink': 'blink 1s step-end infinite',
        'shimmer': 'shimmer 1.6s infinite',
        'bar': 'bar 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
