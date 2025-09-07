import React from 'react';
import "../assets/css/courses.css";
import Course from '../components/Course';

function Courses() {
  return (
    <div className='courses'>
        <p><i className="fa-solid fa-book"></i> Courses</p>
        <div className='courses-container'>
            <Course />
            <Course />
            <Course />
        </div>
    </div>
  )
}

export default Courses;