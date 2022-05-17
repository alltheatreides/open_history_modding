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
        secondary10: "#e5ddd1",
        customWhite: "#fffbf1"
      },
      height: {
        'h-modal-center': "calc(100% - 25rem)",
      },
      boxShadow: {
        'brutal': '3px 4px 0px 0 rgba(0, 0, 0)',
        'brutal-sm': '1.5px 2px 0px 0 rgba(0, 0, 0)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
