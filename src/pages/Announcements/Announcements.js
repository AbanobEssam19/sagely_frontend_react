import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAnnouncements = () => {
  const user = useSelector((state) => state.userData.data);

  const courses = useSelector((state) => state.courses.data);

  let announcements = useSelector((state) => state.announcements.data);

  const generalAnnouncements = announcements.filter(
    (announcement) => announcement.courseID === null
  );

  const courseAnnouncements = announcements.filter(
    (announcement) => announcement.courseID !== null
  );

  announcements = [...generalAnnouncements];

  if (user && user.role === "Admin") {
    for (let i = 0; i < courseAnnouncements.length; ++i) {
      const course = courses.find(
        (course) => course.id === courseAnnouncements[i].courseID
      );
      if (course.adminid === user.id)
        announcements.push(courseAnnouncements[i]);
    }
  }

  announcements = [...announcements].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

  const [searchValue, setSearchValue] = useState("");
  const [courseFilter, setCourseFilter] = useState(0);

  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    setFilteredAnnouncements(
      announcements.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchValue) &&
          (courseFilter === 0 || announcement.courseID === courseFilter)
      )
    );
    // eslint-disable-next-line
  }, [searchValue, courseFilter]);

  const pageSize = 3;
  const pageCount = Math.ceil(filteredAnnouncements.length / pageSize);

  const [currentPage, setCurrentPage] = useState(0);

  const [currentAnnouncements, setCurrentAnnouncements] = useState([]);

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setCurrentAnnouncements(
      filteredAnnouncements.slice(
        currentPage * pageSize,
        Math.min(filteredAnnouncements.length, (currentPage + 1) * pageSize)
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
    // eslint-disable-next-line
  }, [currentPage, filteredAnnouncements]);

  return {
    user,
    setSearchValue,
    courses,
    courseFilter,
    setCourseFilter,
    currentAnnouncements,
    setCurrentPage,
    currentPage,
    pagination,
    pageCount
  };
}