import { Box } from "@mui/material";
import { AppBar, Divider, Drawer, Icon, IconButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useThemeSwitcher } from "../ThemeSwitcherProvider";
import { INotificationGroup, NotificationPanel } from "../notifications/notifications";
import { StatsPanel } from "../statistics/stats";
import { DesignerPanel } from "../designer/designer";
import { MenuList } from "./MenuList";
import { MainArea } from "./MainArea";


export const AppPannel = () => {
    const { theme } = useThemeSwitcher();
    const { themeMode, setThemeMode } = useThemeSwitcher();
    const drawerWidth = 240;
    const [drawerOpened, setDrawerOpened] = useState(false);

    const [notifications, setNotifications] = useState<INotificationGroup[]>([]);



    const addNotification = (level: string, type: string, target: string, notification: string) => {
        setNotifications(prevNotifs => {
            const group = prevNotifs.find(notif => (notif.level === level) && (notif.type == type) && (notif.target === target)) || { level, type, target, notifications: [] };
            group.notifications.push({ date: new Date(), notification });
            return [...prevNotifs.filter(notif => notif !== group), group];
        });
    };

    return <Box sx={{ display: "flex" }}>
        <AppBar sx={{
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            ...(drawerOpened && {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                })
            }),
        }}>
            <Toolbar>
                <IconButton
                    aria-label="Open drawer"
                    onClick={() => setDrawerOpened(currentState => !currentState)}
                    sx={{
                        ...(drawerOpened && {
                            overflowX: "hidden",
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen
                            })
                        })
                    }}
                >
                    <Icon> {drawerOpened ? "chevron" : "menu"}</Icon>
                </IconButton>
                <Typography
                    sx={{ flexGrow: 1 }}
                    component="h1"
                    variant="h6">
                    NightDriverStrip
                </Typography>
                {(notifications.length > 0) && <NotificationPanel notifications={notifications} clearNotifications={() => setNotifications([])} />}
            </Toolbar>
        </AppBar >
        <Drawer variant="permanent"
            sx={{
                whiteSpace: 'nowrap',
                zIndex: 0,
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                })
            }}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    minHeight: "64px",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                <Box sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <IconButton onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}>
                        <Icon>{themeMode === "dark" ? "dark_mode" : "light_mode"}</Icon>
                    </IconButton>
                    <ListItemText primary={(themeMode === "dark" ? "Dark" : "Light") + " mode"} />
                </Box>
                <IconButton onClick={() => setDrawerOpened(currentState => !currentState)}>
                    <Icon>chevron_left</Icon>
                </IconButton>
            </Box>
            <Divider />
            <MenuList />
        </Drawer>
        <MainArea drawerOpened={drawerOpened} drawerWidth={drawerWidth} addNotification={addNotification} />
    </Box >
};


