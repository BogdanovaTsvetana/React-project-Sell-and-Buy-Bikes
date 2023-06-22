import { createContext, useContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export const types = {
    error: 'red',
    success: 'green',
};

const initialNotificationState = { show: false, message: '', type: types.error };

export const NotificationProvider = ({
    children
}) => {
    const [notification, setNotification] = useState(initialNotificationState);

    const addNotification = (message, type) => {
        setNotification({show: true, message, type});

        setTimeout(() => {
            setNotification(initialNotificationState);
        }, 5000);
    }

    return (
        <NotificationContext.Provider value={{notification, addNotification}}>
            {children}
        </NotificationContext.Provider>
    )
};
