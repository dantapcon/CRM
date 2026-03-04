/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8f0f9',
          100: '#c5d8f0',
          200: '#9dbfe6',
          300: '#72a5db',
          400: '#4f91d3',
          500: '#2b7dcc',
          600: '#2472c4',
          700: '#1a64ba',
          800: '#1153ac',
          900: '#0f3a8e',
          DEFAULT: '#1a3d6b',
          dark:   '#0f2240',
          light:  '#2563a8',
        },
        accent: {
          DEFAULT: '#c8a558',
          dark:    '#a8873a',
          light:   '#dfc07f',
        },
        corporate: {
          navy:   '#0f2240',
          blue:   '#1a3d6b',
          steel:  '#2563a8',
          gold:   '#c8a558',
          silver: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.12)',
      },
    },
  },
  plugins: [],
};
