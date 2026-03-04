import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color Palette ───────────────────────────────────────────────
      colors: {
        bg: {
          primary:   "#ffffff",
          secondary: "#f7f7f5",
          elevated:  "#f0ede8",
        },
        text: {
          primary:   "#0a0a0a",
          secondary: "#6b6b6b",
        },
        accent: {
          DEFAULT: "#c8a45c",
          hover:   "#b8923e",
        },
        border: "rgba(0,0,0,0.08)",
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        sans:    ["var(--font-noto-sans-jp)", "sans-serif"],
        mono:    ["var(--font-space-mono)", "monospace"],
      },
      fontSize: {
        // clamp values exposed as CSS vars in globals.css;
        // keep Tailwind utilities for static sizes
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.35", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.35", letterSpacing: "-0.02em" }],
        "body":       ["17px",                   { lineHeight: "1.7" }],
        "caption":    ["13px",                   { lineHeight: "1.5", letterSpacing: "0.06em" }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────
      spacing: {
        // Section vertical rhythm — used as py-section
        "section": "clamp(100px, 15vw, 200px)",
        // Horizontal content gutter — used as px-gutter
        "gutter":  "clamp(24px, 5vw, 80px)",
      },

      // ─── Max-width ───────────────────────────────────────────────────
      maxWidth: {
        container: "1200px",
      },

      // ─── Custom keyframes / animations ───────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 1.0s ease forwards",
      },

      // ─── Border radius ───────────────────────────────────────────────
      borderRadius: {
        card: "2px",
      },

      // ─── Transition timing ───────────────────────────────────────────
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
    },
  },
  plugins: [],
};

export default config;
