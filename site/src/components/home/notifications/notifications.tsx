import { Avatar, Badge, Box, Card, CardActions, CardContent, CardHeader, Icon, IconButton, Popover, Typography, useTheme, withStyles } from "@mui/material";
import { createRef, useEffect, useState } from "react";

export interface INotification {
    date: Date,
    notifications: any,
    level: string,
    type: string,
    target: string
}

interface INotificationPanelProps {
    notifications: Array<INotification>,
    clearNotifications: () => void
};

export function NotificationPanel({ notifications, clearNotifications }: INotificationPanelProps) {
    const [numErrors, setNumErrors] = useState<number | undefined>(undefined);
    const [errorTargets, setErrorTargets] = useState({});
    const [open, setOpen] = useState(false);
    const inputRef = createRef();
    const theme = useTheme();

    useEffect(() => {
        setNumErrors(notifications.reduce((ret, notif) => ret + notif.notifications.length, 0));
        setErrorTargets(notifications.reduce((ret, notif) => { return { ...ret, [notif.target]: ret[notif.target] || false } }, {}));
    }, [notifications]);

    return (
        <Box sx={{ display: "flex" }}>
            <IconButton
                id="notifications"
                onClick={() => setOpen(wasOpen => !wasOpen)}>
                <Badge
                    aria-label="Alerts"
                    badgeContent={numErrors}
                    color="secondary">
                    <Icon>notifications</Icon>
                </Badge>
            </IconButton>
            <Popover
                open={open}
                onClose={() => { setOpen(false) }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Card elevation={9}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: theme.palette.error.dark }} aria-label="error">
                                !
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={() => setOpen(false)} aria-label="settings">
                                <Icon>close</Icon>
                            </IconButton>
                        }
                        title={`${numErrors} Errors`}
                    />
                    <CardContent>
                        {Object.entries(errorTargets)
                            .sort((a, b) => a[0].localeCompare(b[0]))
                            .map(target =>
                                <CardContent key={target[0]} sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    {Object.entries(notifications)
                                        .filter(notif => notif[1].target === target[0])
                                        .map(error =>
                                            <Box key={error[0]}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    borderBottom: "solid aquamarine 2px",
                                                }}
                                                    key="header">
                                                    <Typography>{target[0]}</Typography>
                                                    <Typography color="textSecondary">{error[1].type}</Typography>
                                                    <Typography>{error[1].level}</Typography>
                                                </Box>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }} key="errors">
                                                    {Object.entries(error[1].notifications.reduce((ret, error) => { return { ...ret, [error.notification]: (ret[error.notification] || 0) + 1 } }, {}))
                                                        // TODO Check data type of entry[1]
                                                        .map(entry => <Typography key={entry[1] as string} variant="h4">{`${entry[1]}X ${entry[0]}`}</Typography>)
                                                    }
                                                </Box>
                                            </Box>
                                        )}
                                </CardContent>
                            )}
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton onClick={() => clearNotifications()} aria-label="Clear Errors">
                            <Icon>delete</Icon>
                        </IconButton>
                    </CardActions>
                </Card>
            </Popover>
        </Box>);
};