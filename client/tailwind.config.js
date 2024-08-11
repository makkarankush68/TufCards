/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(30deg, hsl(240, 100%, 14%) 0%, hsl(240, 100%, 13%) 7%, hsl(0, 0%, 0%) 100%)",
      },
    },
  },
  plugins: [],
};
