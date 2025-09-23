import React from 'react';
import "../../assets/css/course.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Course({course}) {
  const user = useSelector((state) => (state.userData.data));
  return (
    <div className='course-container'>
        <p className='course-title'>{course.name}</p>
        <p className='course-description'>{course.description}</p>
        <div className='btn-container'>
          <Link to={`/courses/${course.id}`}><i className="far fa-eye"></i>View Details</Link>
          <Link to={`/courses/${course.id}/edit`} style={!user || user.role !== "Admin" ? {display: "none"} : {}}><i className="fas fa-edit"></i>Edit Course</Link>
        </div>
    </div>
  )
}

export default Course;