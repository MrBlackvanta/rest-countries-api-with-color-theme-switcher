"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";

    if (!("startViewTransition" in document)) return setTheme(next);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);

    document.startViewTransition(() => setTheme(next)).finished.catch(() => {});
  };

  return (
    <button onClick={toggleTheme}>
      Switch to <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span> Mode
    </button>
  );
}
