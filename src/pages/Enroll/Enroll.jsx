import React from 'react'
import EnrollmentManagement from '../../components/EnrollmentManagement/EnrollmentManagement.jsx'
import { useEnroll } from './Enroll';
import NotFoundPage from '../NotFound/NotFound';

function Enroll() {
  const {course, user, requirements} = useEnroll();
  if (!course || !user || user.role === "Admin")
    return <NotFoundPage />;
  return (
    <EnrollmentManagement course={course} requirements={requirements} />
  )
}

export default Enroll;