import { FaFacebook, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { floan, fpay, logiga, swastik } from "../Assets/Logofooter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-slate-200">

    <div className=" text-slate-700 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
      <div className="md:mt-0 ">
        {/* Main Grid Layout for Equal Width */}

        <div className="md:flex xl:gap-[6rem] lg:gap-[5rem] md:gap-[3rem]">
          {/* Our Clients */}
          <div className="items-center lg:w-[30%] pt-6 md:w-[25%] ">
            <h1 className="pt-6 pb-2 text-sm font-bold md:text-xl ">
              Jooneli Groups
            </h1>
            <div className="grid grid-cols-2 gap-2 ">
              {[
                floan,
                fpay,
                logiga,
                swastik,
              ].map((logo, index) => (
                <div key={index}>
                  <Link to={"/"} className="w-[20px] h-[40px] ">
                    <img
                      src={logo}
                      alt="Logo_image"
                      className="object-contain xl:h-[55px] lg:h-[50px] lg:w-full md:w-[80%] md:h-[50px] w-[70%] h-[40px]"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[70%] md:w-[75%] ml-4 md:ml-0">
            <div className="gap-2 md:flex ">
              <div className="flex xl:w-[70%] lg:w-[65%] md:w-[50%] gap-2">
                {/* Company */}
                <div className="md:pt-6 xl:w-[50%] lg:w-[45%] md:w-[50%] w-[50%]">
                  <h1 className="mt-6 text-sm font-bold md:text-xl">Company</h1>
                  <div className="py-2">
                    {[
                      { name: "About Us", to: "/about" },
                      { name: "Blog", to: "#" },
                      { name: "For Business", to: "/business" },
                      { name: "For Partners", to: "/partners" },
                      { name: "Career", to: "/career" },
                      { name: "Media", to: "/media" },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center pt-1 list-none md:py-1"
                      >
                        <Link
                          to={item.to}
                          className="text-black hover:text-rose-700"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>

                {/* Policies & Developer */}
                <div className="md:pt-6 xl:w-[50%] lg:w-[55%] md:w-[50%] w-[50%]">
                  <h1 className="mt-6 text-sm font-bold md:text-xl">
                    Policies
                  </h1>
                  <div className="py-1 md:py-2">
                    <li className="flex items-center py-2 list-none md:py-1">
                      <Link
                        to="#"
                        className="text-black hover:text-rose-700"
                      >
                        Terms Of Services
                      </Link>
                    </li>
                  </div>
                  <h1 className="mt-5 text-sm font-bold md:text-xl md:mt-2">
                    Developer
                  </h1>
                  <div className="py-1 md:py-2">
                    <li className="flex items-center py-2 list-none md:py-1">
                      <Link
                        to="#"
                        className="text-black hover:text-rose-700"
                      >
                        API Docs
                      </Link>
                    </li>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="md:pt-6 xl:w-[30%] lg:w-[35%] md:w-[50%]">
                <h1 className="font-bold text-md md:text-xl md:mt-6">
                  Contact Us
                </h1>
                <div className="py-1 md:py-2">
                  <li className="flex items-center py-1 list-none md:py-1">
                    <MdLocationOn />
                    <span className="px-1 md:text-base">
                      Sanepa-2, Lalitpur, Nepal
                    </span>
                  </li>
                  <li className="flex items-center py-1 list-none md:py-1">
                    <FaPhone />
                    <span className="px-2">01-5153449, 9803719451</span>
                  </li>
                  <li className="flex items-center py-1 list-none md:py-1">
                    <MdEmail />
                    <Link to="#" className="px-2 text-black underline">
                      info@jooneli.com
                    </Link>
                  </li>
                </div>
                <h1 className="font-bold mt-1 md:mb-[1rem] mb-[0.5rem] text-xl">
                  Follow Us
                </h1>
                <div className="flex gap-2 p-1">
                  <Link
                    to="#"
                    className="ease-in-out hover:text-rose-700 transition:all"
                  >
                    <FaFacebook className="w-[35px] h-[35px]" />
                  </Link>
                  <Link
                    to="#"
                    className="ease-in-out hover:text-red-700 transition:all"
                  >
                    <FaSquareInstagram className="w-[35px] h-[35px]" />
                  </Link>
                  <Link
                    to="#"
                    className="ease-in-out hover:text-rose-700 transition:all"
                  >
                    <FaLinkedin className="w-[35px] h-[35px]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-6 ml-1 md:text-center md:ml-0">
          <p className="font-semi-bold sm:text-2xl md:text-xl ">
            &copy; {currentYear} Jooneli Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Footer;
