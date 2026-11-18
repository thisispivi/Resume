import { createContext } from "react";

/** Shape of the dark-mode context: current state plus a toggle callback. */
export interface ThemeContextValue {
  isDark: boolean;
  toggleDark: () => void;
}

/** React context providing the current dark mode state and toggle callback. */
export const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleDark: () => {},
});
