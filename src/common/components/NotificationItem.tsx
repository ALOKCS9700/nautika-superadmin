import React, { useEffect } from "react";
import { INotification } from "../../store/models/notification.interface";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../store/actions/notifications.action";

interface NotificationItemProps {
    notification: INotification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
    const dispatch = useDispatch();

    // Automatically close the notification after a delay (e.g., 3 seconds)
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotification(notification.id));
        }, 2000); // 2000 ms = 2 seconds

        return () => clearTimeout(timer);
    }, [dispatch, notification.id]);

    return (
        <div className="toast" key={`notification_${notification.id}`}>
            <div className="toast-header">
                <i className="fas fa-fw fa-bell"></i>
                <strong className="mr-auto">{notification.title}</strong>
                <small>
                    {notification.date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}
                </small>
                <button
                    type="button"
                    className="ml-2 mb-1 close"
                    data-dismiss="toast"
                    aria-label="Close"
                    onClick={() => dispatch(removeNotification(notification.id))}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                {notification.text}
            </div>
        </div>
    );
};

export default NotificationItem;
