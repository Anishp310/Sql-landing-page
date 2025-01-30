import SummaryApi from "../../common";
import pdffile from "../../Assets/contactforpdf.pdf";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";
import { abanner } from "../../Assets";

// import { FaTimes } from "react-icons/fa";

const Carousel = () => {
  const [popUpClicked, setPopUpClicked] = useState(false);
  const [demoClicked, setDemoClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitBrochure = async (data) => {
    const NewData = {
      username: data.firstname + " " + data.lastname,
      company: data.company,
      email: data.email,
      designation: data.Designation,
      phone: data.phone,
      description: data.drop_item,
      meeting: data.meeting, // Optional field
    };

    try {
      const response = await fetch(SummaryApi.AddBrochure.url, {
        method: "POST",
        body: JSON.stringify(NewData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Brochure requested successfully!");
        reset(
          {
            firstname: "",
            lastname: "",
            company: "",
            email: "",
            Designation: "",
            phone: "",
            drop_item: "",
            meeting: false,
          },
          {
            keepErrors: false,
            keepTouched: false,
            keepDirty: false,
          }
        );
        // Trigger the download of the brochure PDF file
        const downloadLink = document.createElement("a");
        downloadLink.href = pdffile; // Use the imported PDF file path
        downloadLink.download = "contactforpdf.pdf"; // Name the file when downloaded
        downloadLink.click(); // Simulate the click event to start the download
        setPopUpClicked(false);
      } else {
        toast.error(result.message || "Failed to request brochure.");
      }
    } catch (error) {
      toast.error("Error while submitting form.", error);
    }
  };

  const onSubmitDemo = async (data) => {
    const NewData = {
      username: data.firstname + " " + data.lastname,
      company: data.company,
      email: data.email,
      designation: data.Designation,
      phone: data.phone,
      description: data.drop_item,
      meeting: data.meeting,
    };

    try {
      console.log(NewData);
      const response = await fetch(SummaryApi.AddDemo.url, {
        method: "POST",
        body: JSON.stringify(NewData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Demo requested successfully!");
        reset(
          {
            firstname: "",
            lastname: "",
            company: "",
            email: "",
            Designation: "",
            phone: "",
            drop_item: "",
            meeting: false,
          },
          {
            keepErrors: false,
            keepTouched: false,
            keepDirty: false,
          }
        );
        setDemoClicked(false);
      } else {
        toast.error(result.message || "Failed to request demo.");
      }
    } catch (error) {
      toast.error("Error while submitting form.", error);
    }
  };

  // Handle closing the pop-up
  const handleCancel = () => {
    setPopUpClicked(false);
    setDemoClicked(false);
    reset();
  };

  return (
    <div className="relative ">
      {/* Banner Section */}
      <Toaster position="top-right" />
      <div className="relative flex items-center justify-center lg:h-[550px] md:h-[400px] h-[250px]  ">
        <img
          src={abanner}
          alt="Banner"
          className="object-left-top w-full h-full"
        />
        <div className="max-w-[1600px] mx-auto absolute">
          <div className="flex flex-col items-center text-sm text-center text-white lg:mx-40 md:mx-5 md:text-xl ">
            <p className="xl:text-4xl lg:text-4xl md:text-3xl font-bold xl:w-[600px] lg:w-[600px] md:w-[450px]  w-[300px] text-xl ">
              Modernize your data landscape to monetize Data
            </p>
            {/* <p className="md:mt-4 mt-1 md:text-sm sm:text-[11px] text-[11px] lg:w-[700px] md:w-[550px] w-full leading-3 sm:leading-4">
            Banking has never been this easy, with the help of 360 Core Banking
            System one can record transactions with some clicks and for the
            calculating part, It automatically do that for you. 360 also have
            this simple User Experience (UX) which systematically organizes your
            data so that it is convincing for you to work as well as locate
            anything anytime which drastically help you to save your valuable
            time.
          </p> */}
            <div className="flex gap-3 md:mt-[4rem] md:gap-5 mt-[2rem]">
              <button
                onClick={() => setPopUpClicked(true)}
                className="flex items-center justify-center px-3 py-2 text-xs bg-green-600 rounded-full md:text-base lg:py-2 lg:px-6 whitespace-nowrap hover:bg-red-600 md:px-4 sm:px-4 md:py-2 lg:text-lg"
              >
                Request Brochure
              </button>
              <button
                onClick={() => setDemoClicked(true)}
                className="flex items-center justify-center px-3 py-2 text-xs bg-green-600 rounded-full md:text-base lg:py-2 sm:px-4 lg:px-6 whitespace-nowrap hover:bg-red-600 md:px-4 md:py-2 lg:text-lg"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-Up Form for Brochure or Demo */}
      {(popUpClicked || demoClicked) && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[calc(200vh-320px)] flex justify-center items-center ">
            <div className="relative max-w-sm px-8 pt-6 pb-8 mx-auto text-black rounded shadow-md bg-slate-100 lg:max-w-xl md:max-w-md">
              {popUpClicked ? (
                <>
                  <h1 className="text-xl font-bold ">Download the Brochure</h1>
                  <h2 className="mt-2 mb-4 text-sm">
                    Please provide below details to download the brochure
                  </h2>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold">Request for Demo</h1>
                  <h2 className="mt-2 mb-4 text-sm">
                    Please provide below details to apply for demo
                  </h2>
                </>
              )}

              <button
                className="absolute btn btn-sm btn-circle btn-white right-2 top-2"
                aria-label="Close"
                onClick={handleCancel}
              >
                ✕
              </button>
              <form
                onSubmit={handleSubmit(
                  popUpClicked ? onSubmitBrochure : onSubmitDemo
                )}
                className="grid grid-cols-2 gap-x-3"
              >
                {/* Common Fields */}
                {[
                  "firstname",
                  "lastname",
                  "company",
                  "email",
                  "Designation",
                  "phone",
                ].map((field) => (
                  <div className="mb-4" key={field}>
                    <input
                      {...register(field, {
                        required: `${
                          field.charAt(0).toUpperCase() + field.slice(1)
                        } is required`,
                      })}
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      className="w-full px-3 py-2 leading-tight text-black border-b-2 rounded appearance-none focus:outline-none"
                    />
                    {errors[field] && (
                      <p className="mb-3 text-xs italic text-red-500">
                        {errors[field].message}
                      </p>
                    )}
                  </div>
                ))}

                {/* Dropdown */}

                {popUpClicked ? (
                  <>
                    {" "}
                    <div className="relative col-span-2 mb-4">
                      <select
                        name="drop_item"
                        id="drop_item"
                        className="w-full p-2 pr-10 leading-tight text-black border-b-2 rounded-md appearance-none focus:outline-none"
                        {...register("drop_item", {
                          required: "This field is required",
                        })}
                      >
                        <option value="" disabled>
                          Purpose of downloading the brochure
                        </option>
                        <option value="understanding_product">
                          Understanding Product/Service Offerings
                        </option>
                        <option value="comparing_solutions">
                          Comparing Solutions for Decision Making
                        </option>
                        <option value="sharing_with_team">
                          Sharing Information with My Team
                        </option>
                        <option value="educational_purpose">
                          For Research or Educational Purposes
                        </option>
                        <option value="long_term_planning">
                          For Future Business Planning
                        </option>
                        <option value="other">Other</option>
                      </select>
                      {errors.drop_item && (
                        <p className="mb-3 text-xs italic text-red-500">
                          {errors.drop_item.message}
                        </p>
                      )}
                      <div className="absolute transform -translate-y-1/2 pointer-events-none right-2 top-1/2">
                        <RiArrowDropDownLine
                          className="text-gray-600"
                          size={20}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="relative col-span-2 mb-4">
                      <select
                        name="drop_item"
                        id="drop_item"
                        className="w-full p-2 pr-10 leading-tight text-black border-b-2 rounded-md appearance-none focus:outline-none "
                        {...register("drop_item", {
                          required: "This field is required",
                        })}
                      >
                        <option value="" disabled>
                          Select the purpose for the demo
                        </option>
                        <option value="exploring_features">
                          Exploring System Features
                        </option>
                        <option value="team_evaluation">
                          Evaluating with My Team
                        </option>
                        <option value="workflow_integration">
                          Understanding Workflow Integration
                        </option>
                        <option value="scaling_business">
                          Scaling for Business Growth
                        </option>
                        <option value="improving_efficiency">
                          Improving Operational Efficiency
                        </option>
                        <option value="other">Other</option>
                      </select>

                      {errors.drop_item && (
                        <p className="mb-3 text-xs italic text-red-500">
                          {errors.drop_item.message}
                        </p>
                      )}
                      <div className="absolute transform -translate-y-1/2 pointer-events-none right-2 top-1/2">
                        <RiArrowDropDownLine
                          className="text-gray-600"
                          size={20}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Meeting Checkbox (Only for Brochure) */}

                <div className="grid-cols-1 mb-4 ">
                  <div className="flex ml-2">
                    <input
                      {...register("meeting")}
                      type="checkbox"
                      id="meeting"
                      className="mr-4 scale-150"
                    />
                    <label
                      htmlFor="meeting"
                      className="text-xl text-black text-nowrap"
                    >
                      Schedule a Meeting
                    </label>
                  </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex items-center justify-center col-span-2 gap-5 mt-4 mb-4">
                  <button
                    type="button"
                    className="px-8 py-2 text-xl font-bold text-white bg-green-500 rounded hover:bg-red-700 focus:outline-none"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 text-xl font-bold text-white bg-green-500 rounded hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
