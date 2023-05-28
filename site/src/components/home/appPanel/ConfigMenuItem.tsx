import { ListItemButton } from "@mui/material";
import { Icon, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { ConfigPanel } from "../config/ConfigPanel";

// I think its better to have all menu items equal and not special cases within the list. 
// Config should be moved to its own component and page. All menu items should be links to pages.
// So this is a temporary solution. TODO - fix the menu system.

export function ConfigMenuItem() {
    const [drawerOpened, setDrawerOpened] = useState(false);

    return (<ListItem sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemButton onClick={() => setDrawerOpened(currentState => !currentState)}>
            <ListItemIcon>
                <Icon color="action">settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>
        {drawerOpened && <ConfigPanel />}
    </ListItem>);
}
