import { useDispatch, useSelector } from "react-redux";
import { markAsRead, updateNotificationStatus } from "../../states/reducers/notificationSlice";

function useNotifications() {
    const notifications = useSelector((state) => state.notifications.data);

    return {notifications}
}

function useNotification() {
    const dispatch = useDispatch();

    const read = (id) => {
        dispatch(markAsRead(id));
        dispatch(updateNotificationStatus(id));
    }

    return {read};
}

export {useNotifications, useNotification};