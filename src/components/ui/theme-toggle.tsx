"use client";

import { CrescentSvg } from "@/components/icons/crescent-svg";
import { useTheme } from "next-themes";

export function ThemeToggle() {
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
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-xs font-semibold sm:text-base"
    >
      <CrescentSvg />
      <p>
        <span className="dark:hidden">Dark</span>
        <span className="hidden dark:inline">Light</span> Mode
      </p>
    </button>
  );
}
