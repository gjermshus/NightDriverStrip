import { NotificationContent } from './NotificationContent';
import { Badge, ClickAwayListener, Icon, IconButton, Popover } from "@mui/material";
import { useRef, useState } from "react";
import { useNotifications } from "./NotificationsProvider";


export function NotificationPanel() {
    const [open, setOpen] = useState(false);
    const { notificationsCount } = useNotifications();
    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div ref={anchorRef}>
                <IconButton
                    id="notifications"
                    onClick={() => setOpen(wasOpen => !wasOpen)}>
                    <Badge
                        aria-label="Alerts"
                        badgeContent={notificationsCount}
                        color="secondary">
                        <Icon>notifications</Icon>
                    </Badge>
                </IconButton>
                <Popover
                    anchorEl={anchorRef.current}
                    open={open}
                    onClose={() => { setOpen(false) }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <NotificationContent onCloseClick={() => setOpen(false)} />
                </Popover>
            </div>
        </ClickAwayListener>);
};