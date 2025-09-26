import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../states/APIs/userFetch.js";
import { fetchCourses } from "../../states/APIs/coursesFetch.js";
import { fetchAnnouncements } from "../../states/APIs/announcementsFetch.js";
import { setLoading } from "../../states/reducers/loadingSlice.js";
import { fetchEnrolled } from "../../states/APIs/enrolledFetch.js";

export const useLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchUser(token)),
          dispatch(fetchCourses()),
          dispatch(fetchAnnouncements()),
          dispatch(fetchEnrolled(token))
        ]);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, []);

  const loading = useSelector((state) => state.loading);

  return {loading};
}