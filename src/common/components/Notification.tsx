import React from "react";
import { useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { INotification } from "../../store/models/notification.interface";
import NotificationItem from "./NotificationItem";

const Notifications: React.FC = () => {
  const notifications: INotification[] = useSelector((state: IStateType) =>
    state.notifications.notifications
  );

  return (
    <div className="toast-wrapper">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
