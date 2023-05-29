import { createContext, useContext, useState } from "react";

export interface INotification {
    date: Date,
    notification: string,
}

export interface INotificationGroup {
    level: string;
    type: string;
    target: string;
    notifications: Array<INotification>;
}

interface INotificationContext {
    notifications: Array<INotificationGroup>;
    addNotification: (level: string, type: string, target: string, notification: string) => void;
    clearNotifications: () => void;
    notificationsCount: number;
}

const NotificationContext = createContext<INotificationContext>({ addNotification: () => {}, notifications: [], clearNotifications: () => {  }, notificationsCount: 0 });

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState<INotificationGroup[]>([]);
    const [notificationsCount, setNotificationCount] = useState<number>(0);

    const addNotification = (level: string, type: string, target: string, notification: string) => {
        setNotifications(prevNotifs => {
            const group = prevNotifs.find(notif => (notif.level === level) && (notif.type == type) && (notif.target === target)) || { level, type, target, notifications: [] };
            group.notifications.push({ date: new Date(), notification });
            return [...prevNotifs.filter(notif => notif !== group), group];
        });
        setNotificationCount(prevCount => prevCount + 1);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setNotificationCount(0);
    };

    return <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications, notificationsCount }}>
        {children}
    </NotificationContext.Provider>;
}

export function useNotifications() {
    if (NotificationContext === null) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }

    return useContext(NotificationContext);
}