import { Box } from "@mui/material";
import { AppBar, Drawer, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useCustomerTheme } from "../ThemeSwitcherProvider";
import { INotificationGroup, NotificationPanel } from "../notifications/notifications";
import { MenuList } from "./MenuList";
import { MainArea } from "./MainArea";


export const AppPannel = () => {
    const { theme } = useCustomerTheme();
    const [notifications, setNotifications] = useState<INotificationGroup[]>([]);

    const addNotification = (level: string, type: string, target: string, notification: string) => {
        setNotifications(prevNotifs => {
            const group = prevNotifs.find(notif => (notif.level === level) && (notif.type == type) && (notif.target === target)) || { level, type, target, notifications: [] };
            group.notifications.push({ date: new Date(), notification });
            return [...prevNotifs.filter(notif => notif !== group), group];
        });
    };

    return <Box sx={{ display: "flex" }}>
        <AppBar>
            <Toolbar>
                <Typography
                    sx={{ flexGrow: 1 }}
                    component="span"
                    variant="h4">
                    NightDriverStrip
                </Typography>
                {(notifications.length > 0) && <NotificationPanel notifications={notifications} clearNotifications={() => setNotifications([])} />}
            </Toolbar>
        </AppBar >
        <Drawer variant="permanent"
            sx={{
                whiteSpace: 'nowrap',
                zIndex: 0,
            }}>
            <MenuList />
        </Drawer>
        <MainArea addNotification={addNotification} />
    </Box >
};


