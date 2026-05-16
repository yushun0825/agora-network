import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "olive-black": "#1A1F1A",
        "marble-white": "#F5F4EE",
        "athena-bronze": "#B89870",
        "lapis-indigo": "#2A3F6F",
        "olive-sage": "#7A8970",
        "sunset-coral": "#D87060",
        "cloud-gray": "#B8B5AC",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        jp: ['"Noto Sans JP"', "system-ui", "sans-serif"],
        jpSerif: ['"Noto Serif JP"', "serif"],
      },
      letterSpacing: { tightest: "-0.04em" },
    },
  },
  plugins: [],
};

export default config;
