// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   purge: {
//     content: [
//       "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//       "./components/**/*.{js,ts,jsx,tsx,mdx}",
//       "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     ],
//     options: {
//       safelist: [
//         'hover:bg-gray-50',
//         'hover:bg-gray-100',
//         'hover:bg-gray-200',
//         'hover:bg-gray-300',
//         'hover:bg-gray-400',
//       ],
//     },
//   },
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       boxShadow: {
//         'white': '0 3px 10px 2px rgba(255, 255, 255, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)',
//         'two': '0px 0px 70px 30px rgba(255, 255, 255, 1), 0px 0px 50px 120px rgba(225, 225, 225, 0.1)',
//       }
//     },
//   },
//   plugins: [],
// };

// export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          fg: "hsl(var(--accent-foreground))",
        },
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
      },
      boxShadow: {
        neon: "0 0 1px rgba(255,45,143,.6), 0 0 8px rgba(255,45,143,.5), 0 0 16px rgba(255,45,143,.35)",
      },
      dropShadow: {
        neon: ["0 0 2px rgba(255,45,143,.9)", "0 0 8px rgba(255,45,143,.7)"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
