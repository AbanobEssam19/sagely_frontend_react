import { useEffect, useRef, useState } from "react";

function useManageCourse() {
    const [courseData, setCourseData] = useState({
        title: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...courseData, [name]: value };
        setCourseData(newData);
    }

    const [requirements, setRequirements] = useState([]);

    const addRequirement = () => {
        setRequirements((prev) => [...prev, { title: "", description: "" }])
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

    const submit = () => {
        if (!check())
            return

    }


    return { courseData, handleChange, requirements, addRequirement, editRequirement, deleteRequirement, errorRef, submit };
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