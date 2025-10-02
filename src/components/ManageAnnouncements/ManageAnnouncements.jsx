import React from "react";
import "../../assets/css/manageAnnouncement.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import { useManageAnnouncements } from "./ManageAnnouncements.js";
import NotFoundPage from "../../pages/NotFound/NotFound.jsx";
import Loading from "../../pages/Loading/Loading.jsx";

function ManageAnnouncements({ announcement }) {
  const {
    user,
    formData,
    handleChange,
    courses,
    errorRef,
    submit,
    setShowConfirm,
    showConfirm,
    deleteAnnouncement,
    loading
  } = useManageAnnouncements(announcement);

  if (!user || user.role !== "Admin") {
    return <NotFoundPage />
  }

  if (loading)
    return <Loading />;

  return (
    <div className="announcement-page">
      <h2>{announcement ? "Edit" : "Create"} Announcement</h2>
      <form className="announcement-form">
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

        <p className="errorMsg" ref={errorRef}>
          Please Enter all fields!
        </p>

        <div className="btn-container">
          <button className="btn-primary" type="submit" onClick={submit}>
            {announcement ? "Save" : "Create"}
          </button>
          <button
            className="btn-delete"
            type="button"
            onClick={() => setShowConfirm(true)}
            style={!announcement ? { display: "none" } : {}}
          >
            Delete
          </button>
        </div>
      </form>
      {showConfirm && (
        <ConfirmModal
          name={"announcement"}
          setShowConfirm={setShowConfirm}
          deleteFunction={deleteAnnouncement}
        />
      )}
    </div>
  );
}

export default ManageAnnouncements;
