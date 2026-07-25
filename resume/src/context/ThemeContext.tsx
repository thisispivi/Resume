import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContextValue";

/** Provides dark/light theme state and toggle to the component tree. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleDark = useCallback(() => setIsDark((prev) => !prev), []);

  // Memoized so consumers only re-render when the theme actually changes.
  const value = useMemo(() => ({ isDark, toggleDark }), [isDark, toggleDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
