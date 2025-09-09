import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk("user/fetchCourses", async () => {
    const res = await fetch("/api/courses", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data.courses;
})