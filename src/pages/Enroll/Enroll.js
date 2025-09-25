import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useEnroll = () => {
    const { id } = useParams();

    const courses = useSelector((state) => state.courses.data);

    // eslint-disable-next-line
    const course = courses.find((course) => course.id == id);

    const user = useSelector((state) => state.userData.data);

    const [requirements, setRequirements] = useState([]);

    const reqFetch = async () => {
        if (!course) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/courses/${course.id}/requirements`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (res.ok) {
            const data = await res.json();
            setRequirements(data);
        }
    }

    useEffect(() => {
        reqFetch();
    // eslint-disable-next-line
    }, [course]);


    return { course, user, requirements };
}