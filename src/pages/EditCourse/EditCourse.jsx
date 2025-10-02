import React from 'react'
import ManageCourse from "../../components/ManageCourse/ManageCourse.jsx"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFound/NotFound.jsx';

function EditCourse() {
  const courses = useSelector((state) => state.courses.data);

  const { id } = useParams();

  // eslint-disable-next-line
  const course = courses.find((course) => course.id == id);

  const user = useSelector((state) => state.userData.data);

  if (!course || !user || user.role === "Student")
    return <NotFoundPage />;

  return (
    <ManageCourse course={course} />
  )
}

export default EditCourse;