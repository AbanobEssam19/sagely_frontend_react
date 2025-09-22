import { createSlice } from "@reduxjs/toolkit";
import { fetchAnnouncements } from "../APIs/announcementsFetch";

export const announcementsSlice = createSlice({
    name: "announcements",

    initialState: {
        data: []
    },

    reducers: {
        updateAnnouncements: (state, action) => {
            state.data = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAnnouncements.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export const { updateAnnouncements } = announcementsSlice.actions;
export default announcementsSlice.reducer;