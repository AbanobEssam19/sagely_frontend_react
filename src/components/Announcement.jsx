import React from 'react';
import "../assets/css/announcement.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Announcement({announcement}) {
  const user = useSelector((state) => (state.userData.data));

  const courses = useSelector((state) => (state.courses.data));

  const date = new Date(announcement.publishDate);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);


  const course = announcement.courseID === null ? "General" : courses.find((course) => course.id === announcement.courseID).name;
  
  return (
    <div className='announcement-container'>
        <div>
          <div className='announcement-header'>
            <p className='announcement-title'>{announcement.title}</p>
            <p className='announcement-category'>{announcement.category}</p>
          </div>
          <div className='announcement-info'>
            <p><i className="far fa-calendar-alt"></i> {formattedDate}</p>
            <p><i className="fa-solid fa-book"></i> {course}</p>
          </div>
        </div>
        <p className='announcement-description'>{announcement.content}</p>
        <div className='btn-container'>
          <Link to={`/announcements/${announcement.id}`}><i className="far fa-eye"></i>View Details</Link>
          <Link to={`/announcements/${announcement.id}/edit`} style={!user || user.role !== "Admin" ? {display: "none"} : {}}><i className="fas fa-edit"></i>Edit<span> Announcement</span></Link>
        </div>
    </div>
  )
}

export default Announcement;