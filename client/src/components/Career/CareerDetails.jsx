import CareerCover from "./CareerCover";
import CareerDetailsPage from "./CareerDetailsPage";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";
import { MdAttachMoney, MdCalendarToday, MdLocationOn, MdWork } from "react-icons/md";
import { useParams } from "react-router-dom";

const CareerDetails = () => {
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
    <div className="">
    <CareerCover/>
<<<<<<< HEAD
      <div className="mx-auto max-w-[1600px]">
        <CareerDetailsPage/>
=======
      <div className="p-6 mx-auto bg-white rounded-lg shadow-xl md:p-12 lg:px-16 xl:px-32 max-w-[1600px] ">
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
          <p className="mt-2 text-gray-700">{careerDetails.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Skills Required
          </h2>
          <p className="mt-2 text-gray-700">{careerDetails.skills_required}</p>
        </section>
        <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Responsibility</h2>
        <p className="mt-2 text-gray-700">{careerDetails.responsibility}</p>
      </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Additional Information
          </h2>
          <p className="mt-2 text-gray-700">
            Created At:{" "}
            <span className="font-medium">
              {new Date(careerDetails.created_at).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </span>
          </p>
        </section>
>>>>>>> 5f086dd51ea37fe98a4a466041d84e0e17555366
      </div>
    </div>
  );
};

export default CareerDetails;
