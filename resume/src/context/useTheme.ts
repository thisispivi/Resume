import { useContext } from "react";
import { ThemeContext } from "./ThemeContextValue";

/** Returns the current theme context value (isDark state and toggleDark callback). */
export const useTheme = () => useContext(ThemeContext);
