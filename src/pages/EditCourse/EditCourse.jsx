import React from 'react'
import ManageCourse from "../../components/ManageCourse/ManageCourse.jsx"
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function EditCourse() {
  const courses = useSelector((state) => state.courses.data);

  const { id } = useParams();

  // eslint-disable-next-line
  const course = courses.find((course) => course.id == id);

  if (!course)
    return <Navigate to="/error" replace />;

  return (
    <ManageCourse course={course} />
  )
}

export default EditCourse;