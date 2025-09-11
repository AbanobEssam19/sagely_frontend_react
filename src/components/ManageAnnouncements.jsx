import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/manageAnnouncement.css"
import { showAlert } from "../states/reducers/alertSlice";
import NotFoundPage from "../pages/NotFound";
import ConfirmModal from "./ConfirmModal";

function ManageAnnouncements({announcement}) {
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


  if (!user || user.role !== "Admin") return <NotFoundPage />;

  
  return (
    <div className="announcement-page">
      <h2>{announcement ? "Edit" : "Create"} Announcement</h2>
      <form className="announcement-form" >
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Content</label>
        <textarea
          name="content"
          rows="4"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value={null}>General</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <p className="errorMsg" ref={errorRef}>Please Enter all fields!</p>

        <div className="btn-container">
            <button className="btn-primary" type="submit" onClick={submit}>{announcement ? "Save" : "Create"}</button>
            <button className="btn-delete" type="button" onClick={() => setShowConfirm(true)} style={!announcement ? {display: "none"} : {}}>Delete</button>
        </div>
        
      </form>
      {showConfirm && <ConfirmModal name={"announcement"} setShowConfirm={setShowConfirm} deleteFunction={deleteAnnouncement} />}
    </div>
  );
}

export default ManageAnnouncements;
