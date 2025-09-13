import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../states/APIs/userFetch.js";
import { fetchCourses } from "../../states/APIs/coursesFetch.js";
import { fetchAnnouncements } from "../../states/APIs/announcementsFetch.js";

export const useLayout = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchUser(token)),
          dispatch(fetchCourses()),
          dispatch(fetchAnnouncements()),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return {loading};
}