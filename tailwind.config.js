module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./js/**/*.js"
  ],
  darkMode: "class",
  safelist: [
  {
      pattern: /(bg|text|border)-(gray|blue|green|gold|red|orange|black|yellow)-(100|200|300|400|500|600|700|800|900)/,
      variants: ["dark"],
    },
],
  theme: {
    extend: {},
  },
  plugins: [],
}
