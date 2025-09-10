import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import NotFoundPage from "./NotFound";
import "../assets/css/addAnnouncement.css"

function AddAnnouncement() {
  const user = useSelector((state) => state.userData.data);
  const courses = useSelector((state) => state.courses.data);
  

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    course: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const errorRef = useRef(null);

  async function submit(e) {
    e.preventDefault();
    if (formData.title === "" || formData.content === "" || formData.category === "") {
      errorRef.current.style.display = "block";
      return;
    }
    errorRef.current.style.display = "none";
    const token = localStorage.getItem("token");
    const res = await fetch("/api/announcements", {
      method: "POST",
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
    const data = await res.json();

    console.log(data);

  }

  


  if (!user || user.role !== "Admin") return <NotFoundPage />;

  
  return (
    <div className="announcement-page">
      <h2>Create Announcement</h2>
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

        <button type="submit" onClick={submit}>Create</button>
      </form>
    </div>
  );
}

export default AddAnnouncement;
