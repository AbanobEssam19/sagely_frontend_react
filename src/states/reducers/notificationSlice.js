import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotifications } from "../APIs/notificationFetch";

// Async thunk to update notification status in the DB
export const updateNotificationStatus = createAsyncThunk(
    "notifications/updateStatus",
    async (notificationId) => {
        const res = await fetch(`/api/notifications/${notificationId}/read`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const data = await res.json();
        return { id: notificationId, status: data.notification };
    }
);

export const notificationSlice = createSlice({
    name: "notifications",

    initialState: {
        data: []
    },

    reducers: {
        // Optimistic update: mark as read immediately in state
        markAsRead: (state, action) => {
            const id = action.payload;
            const notification = state.data.find((n) => n.id === id);
            if (notification) {
                notification.status = "Read";
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateNotificationStatus.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const notification = state.data.find((n) => n.id === id);
                if (notification) {
                    notification.status = status; // confirm DB update
                }
            });
    },
});

export const { markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
