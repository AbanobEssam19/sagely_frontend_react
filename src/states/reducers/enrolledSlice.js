import { createSlice } from "@reduxjs/toolkit";
import { fetchEnrolled } from "../APIs/enrolledFetch";

export const enrolledSlice = createSlice({
    name: "enrolledCourses",

    initialState: {
        data: []
    },

    extraReducers: (builder) => {
        builder.addCase(fetchEnrolled.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export default enrolledSlice.reducer;