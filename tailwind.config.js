/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { "dodgerblue": "#02319b" },
      fontFamily: {
        'mono': ['"Anonymous Pro"', 'monospace'],
      },
      strokeWidth: {
        'homeicon': '0.5px',
      }
    },
  },
  plugins: [],
  darkMode: false,
}

