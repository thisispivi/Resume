import { createContext } from "react";

export interface ThemeContextValue {
  isDark: boolean;
  toggleDark: () => void;
}

/** React context providing the current dark mode state and toggle callback. */
export const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleDark: () => {},
});
