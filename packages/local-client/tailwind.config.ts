/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/components/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
};

// const colors = require("tailwindcss/colors");
// const {
//   default: flattenColorPalette,
// } = require("tailwindcss/lib/util/flattenColorPalette");
 

// function addVariablesForColors({ addBase, theme }: any) {
//     let allColors = flattenColorPalette(theme("colors"));
//     let newVars = Object.fromEntries(
//       Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//     );
   
//     addBase({
//       ":root": newVars,
//     });
//   }