import React from "react";
import EnrollmentManagement from "../../components/EnrollmentManagement/EnrollmentManagement.jsx";
import NotFoundPage from "../NotFound/NotFound.jsx";
import { useViewSubmission } from "./ViewSubmission";
import Loading from "../Loading/Loading.jsx";

function ViewSubmission() {
  const { course, user, requirements, submission, loading } = useViewSubmission();
  if (!course || !user || user.role === "Student") return <NotFoundPage />;
  if (loading)
    return <Loading />;

  return <EnrollmentManagement course={course} requirements={requirements} submission={submission} view={true} />;
}

export default ViewSubmission;
