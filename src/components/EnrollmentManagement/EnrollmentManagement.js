import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../states/reducers/alertSlice";

export function useEnrollmentManagement(requirements) {
    const [files, setFiles] = useState({});

    const handleFileChange = (reqId, file) => {
        setFiles((prev) => ({ ...prev, [reqId]: file }));
    };

    const dispatch = useDispatch();

    const submit = async () => {
        console.log(files);
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
                dispatch(showAlert({message: "Failed to Submit Requirements!", type: "error"}));
                return;
            }
        }

        dispatch(showAlert({message: "", type: "success"}));

    };

    return { handleFileChange, submit };
}