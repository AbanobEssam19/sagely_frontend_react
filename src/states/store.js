import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import alertReducer  from "./reducers/alertSlice";
import { coursesSlice } from "./reducers/coursesSlice";
import { announcementsSlice } from "./reducers/announcementsSlice";
import { enrolledSlice } from "./reducers/enrolledSlice";
import loadingReducer from "./reducers/loadingSlice";
import { notificationSlice } from "./reducers/notificationSlice";

export default configureStore({
    reducer: {
        userData:userSlice.reducer,
        alert: alertReducer,
        courses: coursesSlice.reducer,
        announcements: announcementsSlice.reducer,
        loading: loadingReducer,
        enrolledCourses: enrolledSlice.reducer,
        notifications: notificationSlice.reducer
    }
})