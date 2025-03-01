/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'zeus-gold': 'var(--zeus-gold)',
        'zeus-blue': 'var(--zeus-blue)',
        'zeus-light-blue': 'var(--zeus-light-blue)',
        'zeus-cloud': 'var(--zeus-cloud)',
        'zeus-lightning': 'var(--zeus-lightning)',
        'zeus-marble': 'var(--zeus-marble)',
        'zeus-dark-marble': 'var(--zeus-dark-marble)',
        'zeus-shadow': 'var(--zeus-shadow)',
      },
      animation: {
        'lightning-flash': 'lightning-flash 1.5s ease-in-out infinite',
        'float-cloud': 'float-cloud 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
