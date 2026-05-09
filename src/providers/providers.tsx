"use client";

import { ThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
