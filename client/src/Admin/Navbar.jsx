import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Navbar = ({ setOpenModal }) => {
  const [userData, setUserData] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);

  const getData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/admin"; // Redirect to login page
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="shadow-md navbar bg-base-100">
      <div className="navbar-start">
        <span
          className="text-xl font-bold text-red-600 btn btn-ghost"
          aria-label="Admin Panel"
        >
          Jooneli Admin
        </span>
      </div>
      <div className="navbar-end">
        <div className="flex items-center justify-center gap-5">
          {/* User Dropdown */}
          <div className="relative">
            <button
              className="p-4 rounded-full bg-slate-300 focus:outline-none"
              aria-label="User Menu"
              onClick={() => setOpenDropDown(!openDropDown)}
            >
              {userData?.username.split(" ")[0] || "User"}
            </button>
            {openDropDown && (
              <div className="absolute right-0 w-32 mt-2 text-white bg-black rounded shadow-md ">
                <ul className="py-2">
                  <li className="px-4 py-2 cursor-pointer hover:bg-slate-700">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default Navbar;
