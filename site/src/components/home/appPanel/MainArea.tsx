import { useCustomTheme } from "../ThemeSwitcherProvider";
import { Box } from "@mui/material";
import { StatsPanel } from "../statistics/stats";
import { DesignerPanel } from "../designer/designer";
import { useState } from "react";

export function MainArea({ addNotification }) {
  const [stats, setStats] = useState(false);
  const [designer, setDesigner] = useState(false);
  const { theme } = useCustomTheme();
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
  }}>
    <StatsPanel open={stats} addNotification={addNotification} />
    <DesignerPanel open={designer} addNotification={addNotification} />
  </Box>);
}

