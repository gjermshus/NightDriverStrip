import { ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";
import { ThemeMode, getTheme } from "../../theme/theme";

interface IThemeSwitcherContext {
    themeMode: ThemeMode,
    setThemeMode: (mode: ThemeMode) => void
};

export const ThemeSwitcherContext = createContext<IThemeSwitcherContext>(
    {
        themeMode: 'dark',
        setThemeMode: (mode: ThemeMode) => { }
    }
);

export const useThemeSwitcher = () => {
    if (ThemeSwitcherContext === null) {
        throw new Error('useThemeSwitcher must be used within a ThemeSwitcherProvider');
    }
    const { themeMode, setThemeMode } = useContext(ThemeSwitcherContext);
    return { themeMode, setThemeMode };
};

export function ThemeSwitcherProvider({ children }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const theme = useMemo(() => getTheme(themeMode), [themeMode]);
    return (
        <ThemeSwitcherContext.Provider value={{ themeMode, setThemeMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeSwitcherContext.Provider>
    );
}
