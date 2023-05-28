import { ListItemButton } from "@mui/material";
import { Icon, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ConfigMenuItem } from "./ConfigMenuItem";

export function MenuList() {
    return (<List>
        {[{
            caption: "Home",
            icon: "home"
        }, {
            caption: "Statistics",
            icon: "area_chart"
        }].map(item => <ListItem key={item.icon}>
            <ListItemButton onClick={() => alert("CLICK")}>
                <ListItemIcon>
                    <Icon color="action">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.caption} />
            </ListItemButton>
        </ListItem>)}
        <ConfigMenuItem />
    </List>);
}
