module.exports = {
  content: ["./public/index.html", "./src/**/*.svelte"],
  theme: {
    extend: {},
    darkMode: "class",
  },
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp'),],
};
