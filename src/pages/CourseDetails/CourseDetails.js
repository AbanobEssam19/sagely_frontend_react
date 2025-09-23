import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const useCourseDetails = () => {
  const { id } = useParams();

  const courses = useSelector((state) => state.courses.data);

  // eslint-disable-next-line
  const course = courses.find((course) => course.id == id);

  const user = useSelector((state) => state.userData.data);


  return {course, user};
}