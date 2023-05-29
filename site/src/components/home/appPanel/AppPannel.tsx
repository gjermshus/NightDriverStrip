import { Box } from "@mui/material";
import { AppBar, Drawer, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useCustomTheme } from "../ThemeSwitcherProvider";
import { NotificationPanel } from "../notifications/notifications";
import { MenuList } from "./MenuList";
import { MainArea } from "./MainArea";


export const AppPannel = () => {
    return <Box sx={{ display: "flex" }}>
        <AppBar>
            <Toolbar>
                <Typography
                    sx={{ flexGrow: 1 }}
                    component="span"
                    variant="h4">
                    NightDriverStrip
                </Typography>
                <NotificationPanel />
            </Toolbar>
        </AppBar >
        <Drawer variant="permanent"
            sx={{
                whiteSpace: 'nowrap',
                zIndex: 0,
            }}>
            <MenuList />
        </Drawer>
        <MainArea />
    </Box >
};


