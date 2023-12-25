/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      inter:["Inter","sans-serif"],
      "edu-sa":["Edu SA Beginner","cursive"],
      mono:["Roboto Mono","monospace"]
    },
    colors:{
      white:"#fff",
      black:"#000",
      transparent:"#ffffff00",
      richblack:{
        5:"#f1f2ff",
        25:"#dbddea",
        50:"#c5c7d4",
        100:"#afb2bf",
        200:"#999daa",
        300:"#838894",
        400:"#6e727f",
        500:"#585d69",
        600:"#424854",
        700:"#2c333f",
        800:"#161d29",
        900:"#000814"
      }
    },
    extend: {},
  },
  plugins: [],
}

