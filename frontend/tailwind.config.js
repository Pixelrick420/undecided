/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customLightGray: "#3d3d41",
        customGrey: "#252525",
      },
      keyframes: {
        "loader-expand": {
          "0%": { opacity: "1", transform: "scale(0.2)" },
          "50%": { opacity: "0.5", transform: "scale(1.5)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        "loader-explode": {
          "0%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "0.5", transform: "scale(2)" },
          "100%": { opacity: "0", transform: "scale(4)" },
        },
      },
      animation: {
        "loader-expand":
          "loader-expand 1.5s cubic-bezier(0.06, 0.01, 0.49, 1.18) 1",
        "loader-explode":
          "loader-explode 1.5s cubic-bezier(0.46, -0.1, 0.27, 1.07) 0.2s 1",
      },
    },
  },
  plugins: [],
};
