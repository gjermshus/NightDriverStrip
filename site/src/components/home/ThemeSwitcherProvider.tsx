import { Theme, ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeMode, getTheme } from "../../theme/theme";
import { useSiteConfig } from "./config/SiteConfigProvider";

// TODO Move out
declare module "@mui/material/styles" {
    interface Palette {
        taskManager: {
            strokeColor: string,
            MemoryColor: string,
            idleColor: string,
        }
    }
}

interface ICustomThemeContext {
    theme: Theme
};

export const CustomThemeContext = createContext<ICustomThemeContext>(
    {
        theme: getTheme('dark')
    }
);

export const useCustomTheme = () => {
    if (CustomThemeContext === null) {
        throw new Error('useThemeSwitcher must be used within a ThemeSwitcherProvider');
    }
    const { theme } = useContext(CustomThemeContext);
    return { theme };
};

// There seem to be a bug or something strange behavior with the ThemeProvider from @mui/material/styles that
// makes the useTheme() hook not working properly. It only returns the default theme, not the one from the
// ThemeProvider. So I'm using this custom hook instead.

export function CustomThemeProvider({ children }) {
    const { siteConfig: { theme: { value } } } = useSiteConfig();
    const theme = useMemo(() => getTheme(value ? "dark" : "light" as ThemeMode), [value]);
    return (
        <CustomThemeContext.Provider value={{ theme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
}
