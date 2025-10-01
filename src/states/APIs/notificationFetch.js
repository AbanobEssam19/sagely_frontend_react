import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotifications = createAsyncThunk("notification/fetchNotifications", async (token) => {
    if (!token) {
        return [];
    }
    const res = await fetch("/api/notifications/me", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data;
        
})