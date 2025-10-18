/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseColor: "#EEF7FF",
        secondaryColor: "#CCDEEE",
        fontBaseColor: "#0E2954",
        greenBaseColor: "#59CF00",
        greenColor: "#439A01",
        redColor: "#B22C2C",
        orangeColor: "#FF8800",
        yellowColor: "#FFDD00",
        yellowAlphaColor: "#FFE6B4",
        headerColor: "#275FB7",
      },
      container: {
        center: true,
        padding: "2rem",
      },
      fontFamily: {
        Cairo: "Cairo",
      },
      fontSize: {
        15: "15px",
        20: "20px",
        25: "25px",
        28: "28px",
        30: "30px",
        35: "35px",
        40: "40px",
        65: "65px",
      },
      screens: {
        sm: "768px",
        md: "1024px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
