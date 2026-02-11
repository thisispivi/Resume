import { createContext } from "react";

export interface ThemeContextValue {
  isDark: boolean;
  toggleDark: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleDark: () => {},
});
