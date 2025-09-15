import "../../assets/css/main.css";
import Header from "../Header/Header.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Loading from "../../pages/Loading/Loading.jsx";
import { useLayout } from "./Layout.js";

function Layout() {
  const {loading} = useLayout();

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
