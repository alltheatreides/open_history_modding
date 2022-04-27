module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      aspectRatio: {
        '6/16': '6 / 16',
      },
      colors: {
        primary: "#F7F0E1",
        secondary: "#3A343A",
        tertiary: "#FFD263",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
