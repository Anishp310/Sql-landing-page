import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import SummaryApi from "../../common";

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
    return <div className="text-center text-gray-600">Loading career details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 lg:px-16 xl:px-32 bg-white shadow-lg rounded-lg">
      <Toaster position="top-right" />
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{careerDetails.title}</h1>
        <div className="mt-4 space-y-1">
          <p className="text-sm text-gray-600">
            Location: <span className="font-medium">{careerDetails.location}</span>
          </p>
          <p className="text-sm text-gray-600">
            Job Type: <span className="font-medium">{careerDetails.job_type}</span>
          </p>
          <p className="text-sm text-gray-600">
            Category: <span className="font-medium">{careerDetails.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Salary: <span className="font-medium">{careerDetails.salary}</span>
          </p>
          <p className="text-sm text-gray-600">
            Apply Before: <span className="font-medium">
              {new Date(careerDetails.apply_before).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Job Description</h2>
        <p className="mt-2 text-gray-700">{careerDetails.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Skills Required</h2>
        <p className="mt-2 text-gray-700">{careerDetails.skills_required}</p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Responsibility</h2>
        <p className="mt-2 text-gray-700">{careerDetails.responsibility}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Additional Information</h2>
        <p className="mt-2 text-gray-700">
          Created At:{" "}
          <span className="font-medium">
            {new Date(careerDetails.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
      </section>
    </div>
  );
};

export default CareerDetails;
