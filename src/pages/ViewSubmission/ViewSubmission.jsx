import React from "react";
import EnrollmentManagement from "../../components/EnrollmentManagement/EnrollmentManagement.jsx";
import NotFoundPage from "../NotFound/NotFound.jsx";
import { useViewSubmission } from "./ViewSubmission";

function ViewSubmission() {
  const { course, user, requirements, submission } = useViewSubmission();
  if (!course || !user || user.role === "Student") return <NotFoundPage />;

  return <EnrollmentManagement course={course} requirements={requirements} submission={submission} />;
}

export default ViewSubmission;
