const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-1": "#F9F9F9",
        "gray-2": "#E1E1E1",
        "gray-3": "#B5B5B5",
        "gray-4": "#505050",
        "gray-5": "#252525",
        "red-1": "#F5523C",
        "green-1": "#3CF552",
        "purple-1": "#9385F9",
        "purple-2": "#7D6DF7",
        "purple-3": "#6854F6",
        "purple-4": "#523CF5",
        "purple-5": "#3C24F4",
        "purple-6": "#280CF2",
        "purple-7": "#240BD9",
        orange: "#F66854",
        red: "#F2280C",
        violet: "#B954F6",
        blue: "#5491F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
