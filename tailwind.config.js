/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
      preflight: false, // disable Tailwind's reset
    },
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**/*.mdx"], // include ./docs
    darkMode: ['class', '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
    theme: {
      extend: {},
    },
    plugins: [],
  }