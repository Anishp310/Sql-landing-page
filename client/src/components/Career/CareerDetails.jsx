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
      <div className="mx-auto max-w-[1600px]">
        <CareerDetailsPage/>
      </div>
    </div>
  );
};

export default CareerDetails;
