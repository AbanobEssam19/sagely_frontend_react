import React from "react";
import "../../assets/css/enrollmentManagement.css";
import { useEnrollmentManagement } from "./EnrollmentManagement";
import Loading from "../../pages/Loading/Loading";

function EnrollmentManagement({ course, requirements, submission, view }) {
  const { handleFileChange, submit, accept, reject, loading } = useEnrollmentManagement(requirements);
  if (view && (!submission || submission.length === 0) || loading)
    return <Loading />;
  return (
    <div className="enroll-course" style={!submission ? {borderTop: "6px solid var(--main)"} : {}}>
      <div
        className="student-header"
        style={!submission ? { display: "none" } : {}}
      >
        
        <h3>{view ? submission[0].studentName : ""}</h3>
        <p className="student-email">
          {view ? submission[0].studentEmail : ""}
        </p>
      </div>
      <div className="enroll-container">
        <div>
          <h2>Course Title: {course.name}</h2>
          <p className="course-desc">{course.description}</p>
        </div>

        <div className="requirements">
          {requirements.map((req) => (
            <RequirementCard
              key={req.id}
              requirement={req}
              change={handleFileChange}
              show={view && submission}
            />
          ))}
        </div>
        <div className="enroll-btn-container">
          <button
            className="submit-btn"
            onClick={submit}
            style={view ? { display: "none" } : {}}
          >
            {requirements.length > 0 ? "Submit Requirements" : "Enroll Now"}
          </button>
          <button
            className="submit-btn"
            onClick={() => accept(course.id, submission[0].studentID)}
            style={!view ? { display: "none" } : {}}
          >
            Approve Enrollment
          </button>
          <button
            className="submit-btn reject-btn"
            onClick={() => reject(course.id, submission[0].studentID)}
            style={!view ? { display: "none" } : {}}
          >
            Reject Submission
          </button>
        </div>
      </div>
    </div>
  );
}

function RequirementCard({ requirement, change, show }) {
  return (
    <div className="requirement-card">
      <h4>{requirement.title}</h4>
      <p>{requirement.description}</p>
      <input
        type="file"
        onChange={(e) => change(requirement.id, e.target.files[0])}
        style={show ? { display: "none" } : {}}
      />
      <a href={show && show.find((s) => s.requirementTitle === requirement.title).fileUrl} target="_blank" style={!show ? { display: "none" } : {}}><span>View Document</span></a>
    </div>
  );
}

export default EnrollmentManagement;
