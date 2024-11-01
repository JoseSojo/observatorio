import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface Noti {
    message: string,
    active: boolean,
    type: `success` | `error`,
}

interface Notification {
    setMessage: Dispatch<SetStateAction<Noti>>,
    message: Noti
}

const defaultNoti: Notification = {
    setMessage: () => {},
    message: {
        active: false,
        message: ``,
        type: `error`
    }
}

const NotificationContext = createContext<Notification>(defaultNoti);

export function NotificationProvider ({children}:{children:ReactNode}) {

    const [message, setMessage] = useState<Noti>(defaultNoti.message);

    return (
        <NotificationContext.Provider value={{ message,setMessage }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext);
