/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        teal: '#1A5C58',
        dark: '#1c1c1c',
        cream: '#F5F0E8',
      },
    },
  },
  plugins: [],
}
