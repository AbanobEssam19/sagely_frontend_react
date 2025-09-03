import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Header from "./components/Header";
import "./assets/css/main.css";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
