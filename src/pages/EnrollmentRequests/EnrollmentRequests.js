import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useEnrollmentRequests() {
    const { id } = useParams();

    const courses = useSelector((state) => state.courses.data);

    const course = courses.find((course) => course.id == id);

    const user = useSelector((state) => state.userData.data);

    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(false);

    const subFetch = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);
        const res = await fetch(`/api/requirements/${id}/course/submissions`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        setLoading(false);
        if (res.ok) {
            const data = await res.json();
            const uniqueSubmissions = Array.from(
                new Map(data.submissions.map(item => [item.studentID, item])).values()
            );

            setSubmissions(uniqueSubmissions);
        }
    }

    useEffect(() => {
        if (course)
            subFetch();
    }, [course])

    return { course, user, submissions, loading };
}