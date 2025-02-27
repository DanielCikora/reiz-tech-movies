import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {},
      screens: {
        mediumLarge: "1200px",
        xl: "1920px",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
