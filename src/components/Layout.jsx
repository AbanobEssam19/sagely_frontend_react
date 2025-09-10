import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../assets/css/main.css";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../states/APIs/userFetch";
import Loading from "../pages/Loading";
import { fetchCourses } from "../states/APIs/coursesFetch";
import { fetchAnnouncements } from "../states/APIs/announcementsFetch";

function Layout() {
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

  if (loading) return <Loading />;

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
