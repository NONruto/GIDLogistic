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
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('first-child', '& > *:first-child');
      addVariant('last-child', '& > *:last-child');
  }
],
}

