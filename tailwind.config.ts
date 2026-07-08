import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#070A0F",
          panel: "#0D111A",
          card: "#121826",
          hover: "#172033",
          border: "#263247",
          borderStrong: "#3A4A66",
          primary: "#F4F7FB",
          secondary: "#AAB4C5",
          muted: "#6F7D94",
          blue: "#3B82F6",
          cyan: "#22D3EE",
          violet: "#8B5CF6",
          gold: "#FBBF24",
          green: "#22C55E",
          yellow: "#FACC15",
          orange: "#FB923C",
          red: "#EF4444"
        }
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
