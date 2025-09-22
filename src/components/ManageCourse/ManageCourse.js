import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../states/reducers/loadingSlice"
import { showAlert } from "../../states/reducers/alertSlice";

function useManageCourse(course) {
    const dispatch = useDispatch();

    const reqFetch = async () => {
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
            setFetchedRequirements(data);
        }
    }

    const [courseData, setCourseData] = useState({
        title: course ? course.name : "",
        description: course ? course.description : ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...courseData, [name]: value };
        setCourseData(newData);
    }

    const [requirements, setRequirements] = useState([]);

    const [fetchedRequirements, setFetchedRequirements] = useState([]);

    useEffect(() => {
        if (course)
            reqFetch();
    }, [])

    const addRequirement = () => {
        setRequirements((prev) => [...prev, { title: "", description: "", id: null }])
    }

    const editRequirement = (index, newRequirement) => {
        setRequirements(prev =>
            prev.map((req, i) => (i === index ? newRequirement : req))
        );
    };


    const deleteRequirement = (index) => {
        setRequirements(prev => prev.filter((_, i) => i !== index));
    };

    const errorRef = useRef(null);

    const check = () => {
        if (courseData.title === "" || courseData.description === "") {
            errorRef.current.style.display = "block";
            return false;
        }
        for (const req of requirements) {
            if (req.title === "" || req.description === "") {
                errorRef.current.style.display = "block";
                return false;
            }
        }
        errorRef.current.style.display = "none";
        return true;
    }


    const submit = async () => {
        if (!check())
            return

        dispatch(setLoading(true));

        const token = localStorage.getItem("token");
        let url = "/api/courses";
        if (course)
            url += `/${course.id}`;
        const res = await fetch(url, {
            method: course ? "PUT" : "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: courseData.title,
                description: courseData.description
            })
        });

        if (res.ok) {
            const data = await res.json();
            const courseID = data.course.id;
            for (let req of requirements) {
                const send = await fetch("/api/requirements", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: req.title,
                        description: req.description,
                        courseID
                    })
                });
                if (!send.ok) {
                    console.log(send);
                    dispatch(setLoading(false));
                    dispatch(showAlert({ message: `Faild to ${course ? "Edit" : "Create"} Course!`, type: "error" }));
                    return;
                }
            }
            for (const req of fetchedRequirements) {
                await fetch(`/api/requirements/${req.id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            }
            dispatch(setLoading(false));
            dispatch(showAlert({ message: `Course ${course ? "Edited" : "Created"} Successfuly`, type: "success" }));
            setTimeout(() => {
                window.location.href = "/courses";
            }, 600);
        }
        else {
            dispatch(setLoading(false));
            dispatch(showAlert({ message: `Faild to ${course ? "Edit" : "Create"} Course!`, type: "error" }));
        }

    }

    const [showConfirm, setShowConfirm] = useState(false);

    const deleteCourse = async () => {
        console.log("HI")
        dispatch(setLoading(true));
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/courses/${course.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch(setLoading(false));
        if (res.ok) {
            dispatch(showAlert({ message: "Course Deleted Successfuly", type: "success" }));
            setTimeout(() => {
                window.location.href = "/courses";
            }, 600);
        }
        else {
            dispatch(showAlert({ message: "Faild to Delete Course!", type: "error" }));
        }
    }



    return { courseData, handleChange, requirements, addRequirement, editRequirement, deleteRequirement, errorRef, submit, showConfirm, setShowConfirm, deleteCourse };
}

function useRequirement(index, requirement, editRequirement) {
    const [requirementData, setRequirementData] = useState(requirement);

    useEffect(() => {
        setRequirementData(requirement);
    }, [requirement]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...requirementData, [name]: value };
        setRequirementData(newData);
        editRequirement(index, newData);
    };

    return { requirementData, handleChange }
}

export { useManageCourse, useRequirement };