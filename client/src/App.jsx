import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  
  // const location = useLocation();

  // useEffect(() => {
  //   if (!location.pathname.startsWith("/admin")) {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //   }
  // }, [location]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex justify-center bg-gray-100">
        <div className="w-full text-black bg-white font-primary ">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
