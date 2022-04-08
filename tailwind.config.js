module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter'],
        'serif': ['Inter'],
        'mono': ['Inter'],
      },
      colors: {
        "gray-1": "#F9F9F9",
        "gray-3": "#B5B5B5",
        "gray-5": "#252525",
        "purple-7": "#523CF5",
        "red-1": "#F5523C",
        "green-1": "#3CF552",
        "bubble-orange": "#F66854",
        "bubble-purple": "#6854F6",
      },
    },
  },
  plugins: [],
};
