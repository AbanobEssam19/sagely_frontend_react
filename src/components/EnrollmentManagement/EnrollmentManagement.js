import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../states/reducers/alertSlice";
import { useParams } from "react-router-dom";

export function useEnrollmentManagement(requirements) {
    const [files, setFiles] = useState({});

    const { id } = useParams();

    const handleFileChange = (reqId, file) => {
        setFiles((prev) => ({ ...prev, [reqId]: file }));
    };

    const dispatch = useDispatch();

    const submit = async () => {
        for (const req of requirements) {
            if (!files[req.id]) {
                dispatch(showAlert({ message: "Please Enter All Requested Files!", type: "error" }));
                return;
            }
        }

        const token = localStorage.getItem("token");

        for (const req of requirements) {
            const formData = new FormData();
            formData.append("file", files[req.id]);

            const response = await fetch(`/api/requirements/${req.id}/submit`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                dispatch(showAlert({ message: "Failed to Submit Requirements!", type: "error" }));
                return;
            }
        }

        if (requirements.length === 0) {
            const res = await fetch(`/api/courses/${id}/enroll`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                dispatch(showAlert({ message: "Enrolled Successfully.", type: "success" }));
                setTimeout(() => {
                    window.location.href = "/courses";
                }, 600);
            }
            else {
                dispatch(showAlert({ message: "Failed to Enroll!", type: "error" }));
                return;
            }
        }
        else {
            dispatch(showAlert({ message: "Requirements Submitted Successfully.", type: "success" }));
            setTimeout(() => {
                window.location.href = "/courses";
            }, 600);
        }
    };


    const accept = async (courseID, studentID) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/course/${courseID}/enroll/${studentID}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify({replaceSubmission: true})
        })

        if (res.ok) {
            dispatch(showAlert({ message: "Enrollment Accepted.", type: "success" }));
            setTimeout(() => {
                window.location.href = "/courses";
            }, 600);
        }
        else {
            dispatch(showAlert({ message: "Failed to Accept Enrollment!", type: "error" }));
            return;
        }
    }

    const reject = async (courseID, studentID) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/course/${courseID}/enroll/${studentID}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify({replaceSubmission: false})
        })

        if (res.ok) {
            dispatch(showAlert({ message: "Enrollment Rejected.", type: "success" }));
            setTimeout(() => {
                window.location.href = "/courses";
            }, 600);
        }
        else {
            dispatch(showAlert({ message: "Failed to Reject Enrollment!", type: "error" }));
            return;
        }
    }

    return { handleFileChange, submit, accept, reject };
}