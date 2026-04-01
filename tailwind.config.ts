import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px -12px rgba(3, 7, 18, 0.25)",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.25), transparent 35%), radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.2), transparent 35%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.12), transparent 35%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
