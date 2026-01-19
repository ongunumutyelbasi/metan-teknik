/** @type {import('tailwindcss').Config} */
module.exports = {
  // Added this line to support Shadcn animations
  darkMode: ["class"], 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Added src folder just in case
  ],
  theme: {
    extend: {
      fontFamily: {
        neumann: ["var(--font-ff-unit-pro)", "sans-serif"],
      },
    },
  },
  // Register the plugin here
  plugins: [require("tailwindcss-animate")],
}