import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#18181b',
        card: '#232329',
        cardDark: '#101012',
        borderDark: '#232329',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,0,0,0.10)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
