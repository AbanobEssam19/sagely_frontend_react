import React from "react";
import "../../assets/css/enrollmentManagement.css";
import { useEnrollmentManagement } from "./EnrollmentManagement";

function EnrollmentManagement({ course, requirements }) {
  const {handleFileChange, submit} = useEnrollmentManagement(requirements);
  return (
    <div className="enroll-course">
      <h2>Course Title: {course.name}</h2>
      <p className="course-desc">{course.description}</p>

      <div className="requirements">
        {requirements.map(
          (req) => <RequirementCard key={req.id} requirement={req} change={handleFileChange} />
        )}
      </div>

      <button className="submit-btn" onClick={submit}>Submit Requirements</button>
    </div>
  );
}

function RequirementCard({ requirement, change }) {
  return (
    <div className="requirement-card">
      <h4>{requirement.title}</h4>
      <p>{requirement.description}</p>
      <input type="file" onChange={(e) => change(requirement.id, e.target.files[0])}  />
    </div>
  );
}

export default EnrollmentManagement;
