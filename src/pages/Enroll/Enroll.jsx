import React from 'react'
import EnrollmentManagement from '../../components/EnrollmentManagement/EnrollmentManagement.jsx'
import { useEnroll } from './Enroll';
import NotFoundPage from '../NotFound/NotFound';
import Loading from '../Loading/Loading.jsx';

function Enroll() {
  const {course, user, requirements, loading} = useEnroll();
  if (!course || !user || user.role === "Admin")
    return <NotFoundPage />;

  if (loading)
    return <Loading />;
  return (
    <EnrollmentManagement course={course} requirements={requirements} view={false} />
  )
}

export default Enroll;