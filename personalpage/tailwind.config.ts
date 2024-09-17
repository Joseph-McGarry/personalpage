import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'white': '0 3px 10px 2px rgba(255, 255, 255, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)  ',
        'two': '0px 0px 70px 30px rgba(255, 255, 255, 1), 0px 0px 50px 120px rgba(225, 225, 225, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;
