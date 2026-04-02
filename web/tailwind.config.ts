import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6A00',
          'orange-hover': '#E85C00',
          black: '#000000',
          dark: '#1A1A1A',
          border: '#2A2A2A',
          muted: '#B3B3B3',
          // legacy aliases kept for compatibility
          gray: '#111111',
          'gray-mid': '#B3B3B3',
          blue: '#1A3C5E',
        },
      },
      fontFamily: {
        heading: ['var(--font-anton)', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['12rem', { lineHeight: '0.85' }],
      },
    },
  },
  plugins: [],
}

export default config
