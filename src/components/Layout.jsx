import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../assets/css/main.css";
import Footer from "./Footer";

function Layout() {
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