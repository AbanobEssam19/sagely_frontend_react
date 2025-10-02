import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses } from "../APIs/coursesFetch";

export const coursesSlice = createSlice({
    name: "courses",

    initialState: {
        data: []
    },

    reducers: {
        updateCourses: (state, action) => {
            state.data = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export const { updateCourses } = coursesSlice.actions;
export default coursesSlice.reducer;