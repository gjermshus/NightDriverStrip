import { useThemeSwitcher } from "../ThemeSwitcherProvider";
import { Box } from "@mui/material";
import { StatsPanel } from "../statistics/stats";
import { DesignerPanel } from "../designer/designer";
import { useState } from "react";

export function MainArea({ drawerOpened, drawerWidth, addNotification }) {
  const [stats, setStats] = useState(false);
  const [designer, setDesigner] = useState(false);
  const { theme } = useThemeSwitcher();
  return (<Box sx={{
    padding: theme.spacing(4),
    transition: theme.transitions.create('padding-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: "10px",
    ...(drawerOpened && {
      paddingLeft: drawerWidth + 10,
      transition: theme.transitions.create('padding-left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    })
  }}>
    <StatsPanel open={stats} addNotification={addNotification} />
    <DesignerPanel open={designer} addNotification={addNotification} />
  </Box>);
}

