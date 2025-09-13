import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const useAnnouncementDetails = () => {
  const { id } = useParams();

  const announcements = useSelector((state) => state.announcements.data);
  const courses = useSelector((state) => state.courses.data);

  // eslint-disable-next-line
  const announcement = announcements.find((a) => a.id == id);

  if (!announcement)
    return { announcement: null, course: null, formattedDate: null };

  const course = courses.find((course) => course.id === announcement.courseID);

  const date = new Date(announcement.publishDate);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  return {announcement, course, formattedDate};
 
}