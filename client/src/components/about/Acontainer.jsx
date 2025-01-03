import { FaCode } from "react-icons/fa";
import { FaClockRotateLeft, FaPeopleGroup } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import { MdOutlineRoundaboutLeft } from "react-icons/md";
import { aboutusimg, mvpic } from "../../Assets/Aboutus/index";

const Acontainer = () => {
  return (
    <div className=" mb-6 md:mt-[2rem] xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
      {/* About Us Section */}
      <div className="flex flex-col text-black md:flex-row ">
        <div className="lg:w-[450px] md:w-[250px] w-full mx-auto md:mt-5 md:mx-0 hidden md:block">
          <div className="relative xl:w-[500px] xl:h-[500px]  md:w-[300px] md:h-[300px] w-[200px] h-[200px] opacity-35 ml-[80px] sm:ml-[90px] xl:ml-[-20rem] lg:ml-[-11rem] md:ml-[-10rem] lg:w-[400px] lg:h-[400px]">
            <img
              src={aboutusimg}
              alt="aboutUs"
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out sm:mx-5 hover:scale-110"
            />
          </div>
        </div>
        <div className="lg:w-[900px] md:w-[600px] xl:w-[1400px] w-full xl:mt-[7rem] lg:mt-[3rem] md:mt-[0.5rem] text-left xl:mr-[4rem] lg:mr-[2rem] md:px-2">
          <div className="items-center justify-center hidden my-5 font-bold md:flex md:text-3xl jus lg:text-5xl ">
            About Us
            <span className="flex ml-2 text-red-600">
              <IoRemoveOutline />
              <MdOutlineRoundaboutLeft />
            </span>
          </div>
          <div className="my-5 text-lg md:text-xl sm:mb-3 lg:text-2xl ">
            Inspiring <span className="text-red-400">Banking Systems</span> with{" "}
            <span className="text-red-600">IT solutions</span>
          </div>
          <p className="text-sm text-justify lg:text-lg md:text-base">
            Jooneli Inc Pvt. Ltd. is a Nepali software company that develops and
            provides the Jooneli Software suite. Our flagship product, 360 Core
            Banking Software and Jooneli Trading, is a comprehensive business
            management solution. Jooneli Inc serves a variety of industries and
            has a significant presence globally. We collaborate with authorized
            partners for implementation, training, and support services.
          </p>
        </div>
      </div>

      {/* Mission and Values Section */}
      <div className="flex flex-col gap-10 mt-5 md:flex-row">
        <div className="mx-auto md:w-2/3 lg:w-1/2 xl:mt-[5rem] mt-0">
          <div className="mb-4 md:mb-2 xl:mb-12 ">
            <h3 className="mb-5 text-xl font-semibold md:text-3xl text-amber-600">
              Our Mission
            </h3>
            <p className="text-sm text-justify text-black md:text-base lg:text-lg">
              Our mission is to develop, produce, and sell software products
              that meet the needs of our customers while creating value for
              them. We aim to provide reliable, effective, and easy-to-use
              software, while fostering positive growth.
            </p>
          </div>
          <div className="mb-2 md:mb-12">
            <h3 className="mb-5 text-xl font-semibold md:text-3xl text-amber-600">
              Our Values
            </h3>
            <p className="text-sm text-justify text-black md:text-base lg:text-lg">
              We believe in providing excellent customer service and
              continuously improving our products based on customer feedback. We
              uphold integrity and ethics in all operations and value teamwork
              as a key to our success.
            </p>
          </div>
        </div>
        <div className="md:mt-[3rem] xl:mr-[-10rem] lg:mr-[-3rem] md:mr-[-3rem] flex justify-center">
          <img
            src={mvpic}
            alt="mission-values"
            className="transition-transform duration-500 ease-in-out opacity-35 hover:scale-110 xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[300px] h-[300px] mx-auto"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-black md:mx-[2rem] mx-[1rem]">
        <div className="flex items-center justify-center my-5 text-sm md:text-lg ">
          <span className="text-xl font-semibold text-red-600 md:text-3xl">
            <IoRemoveOutline />
          </span>
          <p className="udppercase md:x-2">Globally Renowned & Trusted</p>
          <span className="text-xl font-semibold text-red-600 md:text-3xl">
            <IoRemoveOutline />
          </span>
        </div>
        <h2 className="mb-5 text-3xl font-bold md:text-5xl">
          Why <span className="text-red-600">Choose Us</span>
        </h2>
        <p className="max-w-2xl mx-auto mb-5 md:mb-10 md:text-xl text-md">
          Our IT services consist of business and technology experts who help
          manage business processes across various industries.
        </p>
        {/* Cards */}
        <div className="grid gap-8 lg:gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <article className="overflow-hidden bg-white rounded-lg group lg:p-6 md:mt-6 lg:mt-0">
            <div className="flex items-center justify-center">
              <FaClockRotateLeft className="w-12 h-12 text-yellow-500 transition-transform group-hover:scale-110 " />
            </div>
            <h3 className="mt-5 text-lg font-medium text-center">
              Regular Support
            </h3>
            <p className="mt-2 text-sm ">
              Our team provides continuous feedback, quality maintenance, and
              constant motivation to generate qualitative output, even in
              difficult situations.
            </p>
          </article>

          <article className="overflow-hidden bg-white rounded-lg lg:p-6 md:mt-6 group lg:mt-0">
            <div className="flex items-center justify-center">
              <FaPeopleGroup className="w-12 h-12 text-green-400 transition-transform group-hover:scale-110 " />
            </div>
            <h3 className="mt-5 text-lg font-medium text-center">
              Experienced Team
            </h3>
            <p className="mt-2 text-sm ">
              Our team consists of experienced professionals with the skills
              needed to bring positive change and enhance company productivity.
            </p>
          </article>

          <article className="overflow-hidden bg-white rounded-lg group lg:p-6 md:mt-6 lg:mt-0">
            <div className="flex items-center justify-center">
              <FaCode className="w-12 h-12 text-red-600 transition-transform group-hover:scale-110" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-center">
              Top Code Quality
            </h3>
            <p className="mt-2 text-sm ">
              We maintain high code quality to ensure your project is secure,
              reliable, and easy to maintain.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Acontainer;
