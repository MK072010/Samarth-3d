/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070a10',
          900: '#0a0e16',
          800: '#0f1520',
          700: '#161d2b',
          600: '#212a3c',
        },
        mist: {
          400: '#8b95a5',
          300: '#aab2c0',
          100: '#eef1f6',
          50: '#f6f8fb',
        },
        azure: {
          700: '#2a4fd6',
          600: '#3d63e8',
          500: '#5b8def',
          400: '#7fb3ff',
          300: '#a9cbff',
        },
        brass: {
          600: '#a9863f',
          500: '#c9a961',
          400: '#ddc584',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      backgroundImage: {
        'grid-blueprint':
          'linear-gradient(rgba(127,179,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(127,179,255,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 60px rgba(91,141,239,0.25)',
        'glow-sm': '0 0 24px rgba(91,141,239,0.18)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
