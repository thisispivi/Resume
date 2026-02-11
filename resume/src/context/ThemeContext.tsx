import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContextValue";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return <ThemeContext.Provider value={{ isDark, toggleDark }}>{children}</ThemeContext.Provider>;
}
