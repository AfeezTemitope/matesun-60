import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50: '#faf5ed', 100: '#f2e6d0', 200: '#e4c89b', 300: '#d4a56b',
          400: '#b97f47', 500: '#9c5f2e', 600: '#7d4a24',
          700: '#5d3720', 800: '#3e2515', 900: '#2a180e',
        },
        cream: { 50: '#fdfbf5', 100: '#f9f3e3', 200: '#f2e6c5' },
        gold: { 400: '#d4af37', 500: '#c89a2a', 600: '#a6801f' },
        sage: { 400: '#7a9471', 500: '#5a7559' },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
