import { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext.js';
import './Notification.css';

const Notification = () => {
    const { notification } = useContext(NotificationContext);

    if (!notification.show) {
        return null;
    }
    
    return (  
        <div className={notification.type}>     
             {notification.message}   
        </div>
    );
};

export default Notification;