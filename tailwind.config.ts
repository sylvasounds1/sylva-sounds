import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-warm": "var(--bg-warm)",
        "surface-01": "var(--surface-01)",
        "surface-02": "var(--surface-02)",
        "olive-core": "var(--olive-core)",
        "olive-dark": "var(--olive-dark)",
        "olive-muted": "var(--olive-muted)",
        "olive-light": "var(--olive-light)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "beige-deep": "var(--beige-deep)",
        "dark-bg": "var(--dark-bg)",
        "dark-surface": "var(--dark-surface)",
        "on-dark": "var(--on-dark)",
        "on-dark-dim": "var(--on-dark-dim)",
        "on-dark-label": "var(--on-dark-label)",
        "on-dark-accent": "var(--on-dark-accent)",
        "green-core": "var(--olive-core)",
        "green-muted": "var(--olive-muted)",
        "green-dim": "var(--olive-dark)",
        "white-pure": "var(--surface-01)",
        "white-soft": "var(--text-primary)",
        "grey-mid": "var(--beige-deep)",
        "grey-text": "var(--text-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
    },
  },
  plugins: [],
};

export default config;
