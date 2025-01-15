/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["'Barlow'", "sans-serif"],
        epilogue: ["'Epilogue'", "sans-serif"],
        geistMsaono: ["'Geist Mono'", "monospace"],
        sora: ["'Sora'", "sans-serif"],
      },
      fontFamily: {
        sans: ["'Geist Mono'", "monospace"], // Set Geist Mono as default font
      },
      colors: {
        ivory: "rgb(244, 240, 238)",
      },
    },
  },
  plugins: [],
};
