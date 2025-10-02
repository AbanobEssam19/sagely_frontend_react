import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnnouncements = createAsyncThunk("announcements/fetchAnnouncements", async () => {
    const res = await fetch("/api/announcements", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data.announcements;
})