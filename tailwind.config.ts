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
      colors: {
        dark: "#121212",
        offWhite: "#E4E4E7",
        primary: "#22C55E",
        primaryDark: "#16A34A",
        muted: "#A1A1AA",
        highlight: "#D4D4D8",
      },
      screens: {
        mediumLarge: "1200px",
        xl: "1920px",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
