import React from "react";
import ManageCourse from "../../components/ManageCourse/ManageCourse.jsx";
import { useSelector } from "react-redux";
import NotFoundPage from "../NotFound/NotFound.jsx";

function AddCourse() {
  const user = useSelector((state) => state.userData.data);

  if (!user || user.role === "Student") return <NotFoundPage />;

  return <ManageCourse />;
}

export default AddCourse;