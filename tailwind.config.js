module.exports = {
  content: [
	  "./**/*.html",
    "./**/*.js",
    "./*.html",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./js/**/*.js",
	  "./donation/js/**/*.{html,js}",
  ],
  darkMode: "class",
  safelist: [
  {
      pattern: /(bg|text|border)-(gray|blue|green|gold|red|orange|black|yellow)-(100|200|300|400|500|600|700|800|900)/,
      variants: ["dark"],
    },
],
  theme: {
    extend: {
		fontFamily: {
        forte: ['Forte', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
			Kodchasan: ['Kodchasan', 'Regular'],
			Kodchasan: ['Kodchasan', 'SemiBoldItalic'],
			Delmon: ['Delmon', 'Delicate'],
			Quantum: ['Quantum', 'Bold'],
			Rosemartin: ['Rosemartin', 'Rosemartin'],
      },
		boxShadow: {
    'soft': '0 2px 5px rgba(0, 0, 0, 0.15)',
    'deep': '0 8px 20px rgba(0, 0, 0, 0.25)',
	'glow': "0 0 15px rgba(255,255,255,0.15)", // for dark mode glow
  },
	},
  },
  plugins: [],
}

