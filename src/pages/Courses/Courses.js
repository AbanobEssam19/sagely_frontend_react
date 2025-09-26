import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useCourses = () => {
  const user = useSelector((state) => state.userData.data);
  const courses = useSelector((state) => state.courses.data);

  console.log(courses)

  const pageSize = 3;
  const pageCount = Math.ceil(courses.length / pageSize);

  const [currentPage, setCurrentPage] = useState(0);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const enrolledCourses = useSelector((state) => state.enrolledCourses.data);

  useEffect(() => {
    let sourceCourses =
      showEnrolledOnly && user?.role === "Student"
        ? enrolledCourses
        : courses;

    const pageCount = Math.ceil(sourceCourses.length / pageSize);

    setCurrentCourses(
      sourceCourses.slice(
        currentPage * pageSize,
        Math.min(sourceCourses.length, (currentPage + 1) * pageSize)
      )
    );

    let temp = [];
    for (let i = 0; i < pageCount; ++i) {
      temp.push(
        <li className="page-item" key={i}>
          <button
            className={`page-link ${currentPage === i ? "active" : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        </li>
      );
    }
    setPagination(temp);
  }, [currentPage, courses, enrolledCourses, showEnrolledOnly]);


  return {
    user,
    pageCount,
    pagination,
    currentPage,
    setCurrentPage,
    currentCourses,
    showEnrolledOnly,
    setShowEnrolledOnly
  };
};
