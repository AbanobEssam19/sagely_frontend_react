import React, { useEffect, useState } from 'react';
import "../assets/css/courses.css";
import Course from '../components/Course';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Courses() {
  const courses = useSelector((state) => state.courses.data);

  const pageSize = 3;
  const pageCount = Math.ceil(courses.length / pageSize);
  
  const [currentPage, setCurrentPage] = useState(0);

  const [currentCourses, setCurrentCourses] = useState([]);

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setCurrentCourses(courses.slice(currentPage * pageSize, Math.min(courses.length, (currentPage + 1) * pageSize)));

    let temp = [];
    for (let i = 0; i < pageCount; ++i) {
      temp.push(
        <li className="page-item">
          <button className={`page-link ${currentPage === i ? "active": ""}`} onClick={() => setCurrentPage(i)}>{i + 1}</button>
        </li>
      )
    };
    setPagination(temp);
  }, [currentPage, courses, pageCount]);
  
  return (
    <div className='courses'>
        <div className='courses-header'>
          <p><i className="fa-solid fa-book"></i> Courses</p>
          <Link to="/"><i className="fa-solid fa-plus"></i> <span>Add Course</span></Link>
        </div>
        <div className='courses-container'>
            {
              currentCourses.map(course => 
                <Course key={course.id} course={course} />
              )
            }
        </div>
         <div>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}>
              <i className="fas fa-chevron-left"></i>
            </button>
          </li>
          {
            pagination
          }
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(Math.min(currentPage + 1, pageCount - 1))}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Courses;