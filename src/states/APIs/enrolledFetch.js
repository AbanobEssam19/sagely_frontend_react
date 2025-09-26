import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEnrolled = createAsyncThunk("enrolled/fetchEnrolled", async (token) => {
    const res = await fetch("/api/course/enrolled", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await res.json();
    const normalized = (data.courses || []).map(c => ({
        id: c.courseId,
        name: c.courseName,
        description: c.description
    }));
    return normalized;
})