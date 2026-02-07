/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-gold': '#D4A574',
        'muted-taupe': '#8B8680',
        'cream-white': '#F5F1E8',
        'sage-green': '#A8AFA0',
        'dusty-rose': '#B8696F',
        'navy-blue': '#3A4A5C',
        'light-beige': '#E8DCC8',
        'charcoal': '#4A4A4A',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'vintage': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
