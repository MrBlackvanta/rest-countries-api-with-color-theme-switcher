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

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Fallback for browsers without View Transitions API or reduced motion
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    // Use click coordinates; fall back to button center for keyboard activation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => setTheme(next));

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? "Light" : "Dark"} Mode
    </button>
  );
}
