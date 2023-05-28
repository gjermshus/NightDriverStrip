import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "./ThemeSwitcherProvider";
import { AppPannel } from "./appPanel/AppPannel";
import { SiteConfigProvider } from "./config/SiteConfigProvider";

export function MainApp() {
    return (
        <SiteConfigProvider>
            <CustomThemeProvider>
                <CssBaseline />
                <AppPannel />
            </CustomThemeProvider>
        </SiteConfigProvider>
    );
}
