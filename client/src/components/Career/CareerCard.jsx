import SummaryApi from "../../common";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CareerCard = () => {
  const [careerList, setCareerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getCareer = async () => {
    try {
      const response = await fetch(SummaryApi.getCareer.url);
      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      console.log(jsonData)
      const sortedData = jsonData.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));

      console.log(sortedData)

      setCareerList(sortedData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCareer();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = careerList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(careerList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="p-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
      <Toaster position="top-right" />
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Career Opportunities</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((career) => (
          <div
            key={career.career_id}
            className="p-6 text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:scale-105"
          >
            <h2 className="mb-2 text-2xl font-semibold">{career.title}</h2>
            <p className="mb-4 text-sm italic">{career.category} | {career.job_type}</p>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-light">Location</p>
                <p className="text-md">{career.location}</p>
              </div>
              <div>
                <p className="text-sm font-light">Salary</p>
                <p className="font-semibold text-md">{career.salary}</p>
              </div>
            </div>

            <p className="mb-4 text-sm line-clamp-2">{career.description}</p>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div>
                <p>Apply Before</p>
                <p className="font-bold">
                  {new Date(career.applybefore).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Link to="/get-in-touch">
                <button className="px-4 py-2 font-bold text-red-600 transition-all bg-white rounded-full shadow-md hover:bg-gray-200">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination UI */}
      {careerList.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </div>
    
  );
};

export default CareerCard;
