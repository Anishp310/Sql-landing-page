import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { joonLogo } from "../Assets/index";

const Menu = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Business",
    link: "/business",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Career",
    link: "/career",
  },
  {
    name: "Get in Touch",
    link: "/get-in-touch",
  },
];

const Header = () => {
  const [openBar, setOpenBar] = useState(false);

  return (
    <div className="">
      {/* upper */}
      <div className="bg-rose-950">
        <div className="flex items-center justify-between p-2 text-white xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[4px]">
          <div className=" md:flex">
            <p className="text-white text-[8px] md:text-[10px] lg:text-sm">
              Sales - 977-9801464981,9801464982
            </p>
          </div>

          <div className="flex flex-row items-center justify-around gap-1 md:gap-3 text-[8px] md:text-[10px] lg:text-sm md:flex-row ">
            <p className="text-white text-md">Blue Print For</p>
            <button className="p-1 px-2 py-1 transition-all ease-in-out border rounded-full md:px-4 lg:px-8 hover:bg-red-400">
              Login
            </button>
            <button className="p-1 px-2 py-1 transition-all ease-in-out border rounded-full md:px-4 lg:px-8 hover:bg-red-400">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* lower */}
      <div
        className={` relative flex   items-center  z-[100] lg:pt-2  md:pt-1  xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]  ${
          openBar ? "justify-center" : "justify-between"
        } `}
      >
        <div
          className={`${
            openBar
              ? "hidden md:block "
              : "block xl:w-[130px] lg:w-[110px] md:w-[70px] w-[60px]"
          }`}
        >
          <Link to="/">
            <img
              src={joonLogo}
              alt="logo"
              className="h-[50px] w-full object-cover"
            />
          </Link>
        </div>

        <div className="flex items-center justify-between xl:mr-[15rem] lg:mr-[11rem] md:mr-[10rem]">
          <ul
            className={`relative flex flex-col xl:gap-6 lg:gap-2 gap-1  md:flex-row  md:justify-center 
                md:text-[0.8rem] lg:text-[1rem] cursor-pointer
              ${openBar == true ? "block" : "hidden md:flex"}`}
          >
            {Menu.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-around px-10 py-3 m-1 ease-out rounded-md cursor-pointer text-rose-800 md:py-1 md:px-1 hover:text-orange-400"
              >
                <Link onClick={() => setOpenBar(false)} to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={` md:hidden  flex justify-center items-center ${
              openBar ? "absolute top-0 right-0" : ""
            }`}
          >
            {openBar ? (
              <FaTimes
                onClick={() => setOpenBar(!openBar)}
                className="mt-4 text-2xl"
              />
            ) : (
              <FaBars
                onClick={() => setOpenBar(!openBar)}
                className="text-2xl "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
