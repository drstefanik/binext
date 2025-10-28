
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { binavy: "#0C3C4A" },
      fontFamily: { sans: ["Poppins", "ui-sans-serif", "system-ui"] },
      boxShadow: { soft: "0 10px 30px -12px rgba(12,60,74,0.25)" }
    }
  },
  plugins: [],
};
