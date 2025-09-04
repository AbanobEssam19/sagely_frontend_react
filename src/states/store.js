import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import alertReducer  from "./reducers/alertSlice";

export default configureStore({
    reducer: {
        userData:userSlice.reducer,
        alert: alertReducer
    }
})