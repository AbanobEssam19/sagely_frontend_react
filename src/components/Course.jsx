import React from 'react';
import "../assets/css/course.css";
import { useSelector } from 'react-redux';

function Course() {
  const user = useSelector((state) => (state.userData.data));
  console.log(user);
  return (
    <div className='course-container'>
        <p className='course-title'>Advanced Operating Systems</p>
        <p className='course-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, voluptatum tenetur assumenda quia consequatur vero ipsum suscipit eveniet repellat exercitationem ipsa natus excepturi error animi unde id quidem reprehenderit delectus? Corrupti at provident nobis illum ipsum nesciunt hic minima nulla.</p>
        <div className='btn-container'>
          <button><i className="far fa-eye"></i>View Details</button>
          <button style={!user || user.role !== "Admin" ? {display: "none"} : {}}><i className="fas fa-edit"></i>Edit Course</button>
        </div>
    </div>
  )
}

export default Course;