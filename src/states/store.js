import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import alertReducer  from "./reducers/alertSlice";
import { coursesSlice } from "./reducers/coursesSlice";

export default configureStore({
    reducer: {
        userData:userSlice.reducer,
        alert: alertReducer,
        courses: coursesSlice.reducer
    }
})