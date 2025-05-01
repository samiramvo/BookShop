/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm_sans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        customBlRadius: "0 0 20% 0",
      },
      colors: {
        violettitle: "#1B2559",
        violetdesc: "#302CA4",
        primary: "#2563eb",
        secondary: "#ef4444",
        tertiary: "#f97316",
        quaternary: "#14b86d",
        quinary: "#646c6e",
        senary: "#2563eb",
        septenary: "#ef4444",
        octonary: "#f97316",
        nonary: "#14b86d",
        decenary: "#646c6e",
      },
      fontWeight: {
        regular: "400",
        medium: "480",
      },
    },
  },
  plugins: [],
}

