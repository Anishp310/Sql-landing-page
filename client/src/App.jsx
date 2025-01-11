import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the user navigates out of the /admin route
    if (!location.pathname.startsWith("/admin")) {
      localStorage.removeItem("token"); // Clear the token
      localStorage.removeItem("user");  // Clear user data
    }
  }, [location]);

  return (
    <div className="text-black bg-white font-primary w-full max-w-[1600px] mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;