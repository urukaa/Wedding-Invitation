/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        main: "#F7E9E8",
        secondary: "#c89d9c",
        text: "#2f2e2e",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
