/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'desert-sand': '#E7D6B9',
        'desert-sand-dark': '#D6C29F',
        'petroleum-blue': '#1F3F4D',
        'petroleum-blue-light': '#2A5566',
        'deep-basalt': '#163039',
        'unibo-red': '#A32D2D',
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
