"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// Tell React: server snapshot is `false`, client snapshot is `true`.
// Used to gate rendering until after hydration so we can safely read
// `resolvedTheme` without a server/client mismatch.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      Switch to {isDark ? "Light" : "Dark"} Mode
    </button>
  );
}
