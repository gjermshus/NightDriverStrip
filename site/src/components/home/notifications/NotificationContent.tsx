import { useCallback, useMemo } from "react";
import { INotification, INotificationGroup, useNotifications } from "./NotificationsProvider";
import { useCustomTheme } from "../ThemeSwitcherProvider";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Icon, IconButton, Typography } from "@mui/material";

type NotificationsByTargetResult = { [target: string]: Array<INotificationGroup> };

export function NotificationContent({ onCloseClick }: { onCloseClick: () => void }) {
  const { clearNotifications, notificationsCount, notifications } = useNotifications();
  const { theme } = useCustomTheme();

  return (
    <Card elevation={9}>
      <CardHeader avatar={<Avatar sx={{
        bgcolor: theme.palette.error.dark
      }} aria-label="error">
        !
      </Avatar>} action={<IconButton onClick={() => onCloseClick()} aria-label="close notifications">
        <Icon>close</Icon>
      </IconButton>} title={`${notificationsCount} notifications`} />
      <CardContent>
        {notificationsCount === 0 && <Typography sx={{ textAlign: "center" }} variant="body1">No notifications</Typography>}
        {notificationsCount > 0 && <ErrorRows notifications={notifications} />}
      </CardContent>
      {notificationsCount > 0 && <CardActions disableSpacing>
        <IconButton onClick={() => clearNotifications()} aria-label="Clear Errors">
          <Icon>delete</Icon>
        </IconButton>
      </CardActions>}
    </Card>);
}

function GroupHeading({ target, type, level }) {
  return (<Box sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "solid aquamarine 2px"
  }} key="header">
    <Typography>{target}</Typography>
    <Typography color="textSecondary">{type}</Typography>
    <Typography>{level}</Typography>
  </Box>);
}

function ErrorRows({ notifications }: { notifications: Array<INotificationGroup> }) {

  const notificationGroupsByTarget = notifications.reduce((groupedResult, notificationGroup) => {
    return { ...groupedResult, [notificationGroup.target]: [...(groupedResult[notificationGroup.target] || []), notificationGroup] }
  }, {} as NotificationsByTargetResult);

  const groupAndCountNotifications = useCallback((notifications: Array<INotification>) => {
    const groups = notifications.reduce((groupedResult, notification) => {
      return { ...groupedResult, [notification.notification]: (groupedResult[notification.notification] || 0) + 1 }
    }, {});
    return Object.entries<number>(groups);
  }, []);

  return (
    <>
      {
        Object.entries(notificationGroupsByTarget).sort((a, b) => a[0].localeCompare(b[0])).map((target, idx) => <CardContent key={idx} sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          {target[1].map(targetGroup => <Box key={targetGroup.level}>
            <GroupHeading target={target[0]} type={targetGroup.type} level={targetGroup.level} />
            <Box sx={{
              display: "flex",
              flexDirection: "column"
            }} key="errors">
              {groupAndCountNotifications(targetGroup.notifications).map(entry => <Typography key={(entry[0])} variant="body1">{`${entry[1]}X ${entry[0]}`}</Typography>)}
            </Box>
          </Box>)}
        </CardContent>)
      }
    </>
  );
}