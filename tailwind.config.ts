import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"IBM Plex Sans Arabic"',
          '"Geeza Pro"',
          '"Segoe UI"',
          "Tahoma",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#16130f",
        sand: "#f4efe8",
        copper: "#8f5a3c",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
