/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red_cus: "#9f322b"
      },
      aspectRatio: {
        '9/14': '9 / 14',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
}

