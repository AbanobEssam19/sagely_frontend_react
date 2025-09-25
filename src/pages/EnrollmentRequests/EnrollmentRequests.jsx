import React from "react";
import "../../assets/css/enrollmentRequests.css";
import { useEnrollmentRequests } from "./EnrollmentRequests";
import NotFoundPage from "../NotFound/NotFound";
import { Link } from "react-router-dom";

function EnrollmentRequests() {
  const { course, user, submissions } = useEnrollmentRequests();

  if (!course || !user || user.role === "Student") return <NotFoundPage />;

  return (
    <div className="enrollment-requests">
      <div className="requests-header">
        <h2>Enrollment Submissions</h2>
        <p className="header-subtitle">
          Review and process student enrollment requests
        </p>
      </div>
      <div className="requests-container">
        {submissions.map((sub, idx) => (
          <SubmissionCard key={idx} course={course} submission={sub} />
        ))}
      </div>
    </div>
  );
}

function SubmissionCard({ course, submission }) {
  return (
    <div className="submission-card">
      <div className="student-info">
        <h3>{submission.studentName}</h3>
        <p>{submission.studentEmail}</p>
      </div>
      <Link className="check-btn" to={`/courses/${course.id}/requests/${submission.studentID}`}>Check Requirements</Link>
    </div>
  );
}

export default EnrollmentRequests;
