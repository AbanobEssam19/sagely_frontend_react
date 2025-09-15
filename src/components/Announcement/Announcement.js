import { useSelector } from 'react-redux';

export const useAnnouncement = (announcement) => {
  const user = useSelector((state) => (state.userData.data));

  const courses = useSelector((state) => (state.courses.data));

  const date = new Date(announcement.publishDate);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);


  const course = announcement.courseID === null ? "General" : courses.find((course) => course.id === announcement.courseID).name;
  
  return {user, formattedDate, course};
}