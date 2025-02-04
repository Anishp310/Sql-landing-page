import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";
import { MdAttachMoney, MdCalendarToday, MdLocationOn, MdWork } from "react-icons/md";
import { useParams } from "react-router-dom";

const CareerDetailsPage = () => {
  const { id } = useParams();
  const [careerDetails, setCareerDetails] = useState(null);

  useEffect(() => {
    const fetchCareerDetails = async () => {
      try {
        const response = await fetch(`${SummaryApi.getCareer.url}/${id}`);
        const data = await response.json();
        setCareerDetails(data);
      } catch (error) {
        toast.error("Failed to fetch career details.");
      }
    };

    fetchCareerDetails();
  }, [id]);

  if (!careerDetails) {
    return (
      <div className="text-center text-gray-600">Loading career details...</div>
    );
  }

  return (
    <div className="my-[2rem]">
      <div className="xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]  ">
        <Toaster position="top-right" />
        <header className="mb-8 ">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {careerDetails.title}
          </h1>
          <div className="flex gap-4 mt-4 space-y-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MdLocationOn className="text-lg text-gray-500" />
              <span className="font-medium">{careerDetails.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MdWork className="text-lg text-gray-500" />
              <span className="font-medium">{careerDetails.job_type}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MdAttachMoney className="text-lg text-gray-500" />
              <span className="font-medium">{careerDetails.salary}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MdCalendarToday className="text-lg text-gray-500" />
              <span className="font-medium">
                {new Date(careerDetails.apply_before).toLocaleDateString(
                  undefined,
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </header>

        <section>
          <h2 className="mt-8 text-2xl font-semibold text-gray-800">
            Job Description
          </h2>
          <hr className="my-4 border-red-900"></hr>
          <p className="mt-2 text-gray-700">{careerDetails.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Qualifications and Experience
          </h2>
          <hr className="my-4 border-red-900"></hr>
          <ul className="pl-5 mt-2 text-gray-700 list-disc">
            {careerDetails.qualification
              ?.split(";")
              .map(
                (item, index) =>
                  item.trim() && <li key={index}>{item.trim()}</li>
              )}
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Skills Required
          </h2>
          <hr className="my-4 border-red-900"></hr>
          <ul className="pl-5 mt-2 text-gray-700 list-disc">
            {careerDetails.skills_required
              ?.split(";")
              .map(
                (item, index) =>
                  item.trim() && <li key={index}>{item.trim()}</li>
              )}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Responsibility
          </h2>
          <hr className="my-4 border-red-900"></hr>
          <ul className="pl-5 mt-2 text-gray-700 list-disc">
            {careerDetails.responsibility
              ?.split(";")
              .map(
                (item, index) =>
                  item.trim() && <li key={index}>{item.trim()}</li>
              )}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            How to apply?
          </h2>
          <hr className="my-4 border-red-900"></hr>
          <p className="">
            We are always keen to meet energetic and talented professionals who
            would like to join our team. You can Apply Through Email: sales@jooneli.com.
          </p>
          <p className="my-2 text-gray-700">
            Apply Before:{" "}
            <span className="font-bold">
              {new Date(careerDetails.apply_before).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </span>
          </p>
          {/* <button
            type="submit"
            className="px-8 py-2 my-2 text-xl text-white bg-green-500 rounded hover:bg-blue-700 focus:outline-none"
          >
          Apply Now 
          </button> */}
        </section>
      </div>
    </div>
  );
};

export default CareerDetailsPage;
