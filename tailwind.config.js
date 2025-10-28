
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { binavy: "#0C3C4A", bigold: "#C19A3F", ink: "#0B1324" },
      fontFamily: { sans: ["Poppins", "ui-sans-serif", "system-ui"] },
      boxShadow: { soft: "0 20px 40px -20px rgba(12,60,74,0.25)", glass: "0 10px 30px -10px rgba(0,0,0,.25)" },
      keyframes: { float: {"0%,100%":{transform:"translateY(0)"}, "50%":{transform:"translateY(-10px)"}}, hue:{"0%":{filter:"hue-rotate(0deg)"}, "100%":{filter:"hue-rotate(360deg)"}} },
      animation: { float: "float 6s ease-in-out infinite", hue: "hue 20s linear infinite" },
      backgroundImage: { 'hero-gradient': "radial-gradient(1200px 600px at 10% -10%, #E8F4F6 10%, transparent 60%), radial-gradient(1000px 500px at 100% 0%, #F2F6FA 10%, transparent 60%)" },
    }
  },
  plugins: [],
};
