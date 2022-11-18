/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      minHeight: {
        650: "650px",
      },
      colors: {
        ceed: "#f84b33",
        "ceed-light": "rgba(155,44,29,0.58)",
      },
    },
  },
  plugins: [],
};
