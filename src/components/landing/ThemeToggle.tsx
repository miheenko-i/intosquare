import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark");
  const toggle = () => {
    const next = !dark;
    const applyTheme = () => {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      try { localStorage.setItem("intosquare-theme", next ? "dark" : "light"); } catch { /* Storage can be disabled in private browsers. */ }
      setDark(next);
    };
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(applyTheme);
    else applyTheme();
  };
  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  return <button className="theme-toggle" onClick={toggle} aria-label={label} title={label} aria-pressed={dark}>
    {dark ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A8.7 8.7 0 0 1 10 3.5 8.7 8.7 0 1 0 20.5 14Z"/></svg>}
  </button>;
}
