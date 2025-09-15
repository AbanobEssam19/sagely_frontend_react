import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../states/reducers/alertSlice.js";

export const useManageAnnouncements = (announcement) => {
  const user = useSelector((state) => state.userData.data);
  const courses = useSelector((state) => state.courses.data);
  

  const [formData, setFormData] = useState({
    title: announcement ? announcement.title : "",
    content: announcement ? announcement.content : "",
    category: announcement ? announcement.category : "",
    course: announcement ? announcement.courseID : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const errorRef = useRef(null);

  const dispatch = useDispatch();

  async function submit(e) {
    e.preventDefault();
    if (formData.title === "" || formData.content === "" || formData.category === "") {
      errorRef.current.style.display = "block";
      return;
    }
    errorRef.current.style.display = "none";
    const token = localStorage.getItem("token");
    let url = "/api/announcements";
    if (announcement)
        url += `/${announcement.id}`;
    const res = await fetch(url, {
      method: announcement ? "PUT" : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        courseID: formData.course
      }),
    });

    if (res.ok) {
      dispatch(showAlert({message: `Announcement ${announcement ? "Edited" : "Created"} Successfuly`, type: "success"}));
      setTimeout(() => {
        window.location.href = "/announcements";
      }, 600);
    }
    else {
      dispatch(showAlert({message: `Faild to ${announcement ? "Edit" : "Create"} Announcement!`, type: "error"}));
    }

  }

  const [showConfirm, setShowConfirm] = useState(false);

  const deleteAnnouncement = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/announcements/${announcement.id}`, {
        method: "DELETE",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (res.ok) {
      dispatch(showAlert({message: "Announcement Deleted Successfuly", type: "success"}));
      setTimeout(() => {
        window.location.href = "/announcements";
      }, 600);
    }
    else {
      dispatch(showAlert({message: "Faild to Delete Announcement!", type: "error"}));
    }
  }

  return {
    user,
    formData,
    handleChange,
    courses,
    errorRef,
    submit,
    setShowConfirm,
    showConfirm,
    deleteAnnouncement,
  };
}
