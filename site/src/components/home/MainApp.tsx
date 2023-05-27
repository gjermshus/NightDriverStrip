import { CssBaseline } from "@mui/material";
import { ThemeSwitcherProvider } from "./ThemeSwitcherProvider";
import { AppPannel } from "./appPanel/AppPannel";
import { SiteConfigProvider } from "./config/SiteConfigProvider";

export function MainApp() {
    return (
        <SiteConfigProvider>
            <ThemeSwitcherProvider>
                <CssBaseline />
                <AppPannel />
            </ThemeSwitcherProvider>
        </SiteConfigProvider>
    );
}
