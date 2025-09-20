import React from "react";
import "../../assets/css/manageCourse.css";
import { useManageCourse, useRequirement } from "./ManageCourse";

function ManageCourse() {
  const {
    courseData,
    handleChange,
    requirements,
    addRequirement,
    editRequirement,
    deleteRequirement,
    errorRef,
    submit
  } = useManageCourse();
  return (
    <div className="manage-course">
      <h2>Create Course</h2>
      <div className="course-info">
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={courseData.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={courseData.description}
          onChange={handleChange}
          rows={3}
        ></textarea>
      </div>
      <div className="requirements-header">
        <h4>Requirements</h4>
        <button onClick={addRequirement}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="course-requirements">
        {requirements.map((requirement, i) => (
          <Requirement
            key={i}
            index={i}
            requirement={requirement}
            editRequirement={editRequirement}
            deleteRequirement={deleteRequirement}
          />
        ))}
      </div>
      <p className="errorMsg" ref={errorRef}>Please Enter all fields!</p>
      <div className="btn-container">
        <button className="btn-primary" type="submit" onClick={submit}>
          Create
        </button>
      </div>
    </div>
  );
}

function Requirement({
  index,
  requirement,
  editRequirement,
  deleteRequirement,
}) {
  const { requirementData, handleChange } = useRequirement(
    index,
    requirement,
    editRequirement
  );
  return (
    <div className="requirement-info">
      <div className="requirement-data">
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={requirementData.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={requirementData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button onClick={() => deleteRequirement(index)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}

export default ManageCourse;
