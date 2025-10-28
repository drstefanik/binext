/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { binavy: "#0C3C4A" },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.06)" },
      backgroundImage: { "hero-gradient": "linear-gradient(180deg,#f6fbff,transparent 60%)" },
    },
  },
  plugins: [],
}
