import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "./ThemeSwitcherProvider";
import { AppPannel } from "./appPanel/AppPannel";
import { SiteConfigProvider } from "./config/SiteConfigProvider";
import { NotificationProvider } from "./notifications/NotificationsProvider";

// TODO Create a Providers component to wrap all the providers
export function MainApp() {
    return (
        <SiteConfigProvider>
            <CustomThemeProvider>
                <NotificationProvider>
                    <CssBaseline />
                    <AppPannel />
                </NotificationProvider>
            </CustomThemeProvider>
        </SiteConfigProvider>
    );
}
