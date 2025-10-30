/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { binavy: "#0C3C4A" },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.06)" },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg,#f6fbff,transparent 60%)",
        "network": "url('/src/assets/network.svg')",
      },
      keyframes: {
        "gradient-x": {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        "gradient-x": "gradient-x 12s ease infinite",
      },
    },
  },
  plugins: [],
}
