/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        neonViolet: '#9b5de5',
        neonLime: '#baff29',
        darkBackground: '#1e1e2f',
        darkCard: '#28293d',
      }
    }
  },
  plugins: [],
}

