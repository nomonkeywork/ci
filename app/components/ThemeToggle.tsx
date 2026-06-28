"use client";

import { useTheme } from "./ThemeProvider";

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
      <defs>
        <mask id="moon-crescent">
          <rect width="16" height="16" fill="white" />
          <circle cx="10.5" cy="5.5" r="5" fill="black" />
        </mask>
      </defs>
      <circle cx="7.5" cy="8.5" r="6" fill="#ffba00" mask="url(#moon-crescent)" />
    </svg>
  );
}

function SunIcon() {
  const RAY_DIST = 5.5;
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return (
      <circle
        key={i}
        cx={8 + RAY_DIST * Math.sin(a)}
        cy={8 - RAY_DIST * Math.cos(a)}
        r="1"
        fill="var(--c-text-faint)"
      />
    );
  });
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
      <circle cx="8" cy="8" r="3" fill="var(--c-text-faint)" />
      {rays}
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--c-switch-track)",
        border: "1.5px solid var(--c-toggle-ring)",
        cursor: "pointer",
        transition:
          "background-color 200ms ease, border-color 200ms ease",
        flexShrink: 0,
      }}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
