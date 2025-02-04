import SummaryApi from "../../common";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CareerPage = () => {
  const [careerList, setCareerList] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All departments");
  const [locationFilter, setLocationFilter] = useState("Anywhere");
  const [searchTitle, setSearchTitle] = useState("");

  const getCareer = async () => {
    try {
      const response = await fetch(SummaryApi.getCareer.url);
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      const sortedData = jsonData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCareerList(sortedData);
      console.log(sortedData)
      setFilteredCareers(sortedData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCareer();
  }, []);

  useEffect(() => {
    filterCareers();
  }, [departmentFilter, locationFilter, searchTitle, careerList]);

  const filterCareers = () => {
    let filtered = careerList;

    if (departmentFilter !== "All departments") {
      filtered = filtered.filter((career) => career.category.toLowerCase()?.includes(departmentFilter.toLowerCase()));
    }
    if (locationFilter !== "Anywhere") {
      filtered = filtered.filter((career) => career.location.toLowerCase()?.includes(locationFilter.toLowerCase()));
    }

    if (searchTitle) {
      filtered = filtered.filter((career) => career.title.toLowerCase().includes(searchTitle.toLowerCase()));
    }

    setFilteredCareers(filtered);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <Toaster position="top-right" />
      <div className="p-6 xl:mx-[10rem]">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Open Positions</h1>

        {/* Filters Section */}
        <div className="flex flex-wrap justify-center item-center gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option>All departments</option>
            <option>IT</option>
            <option>Marketing</option>
            <option>Graphics</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option>Anywhere</option>
            <option>New York</option>
            <option>San Francisco</option>
            <option>Remote</option>
          </select>

          <input
            type="text"
            placeholder="Find by job title..."
            className="p-2 border rounded-md w-full md:w-auto"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        {/* Job Listings */}
        <div>
  {filteredCareers.length > 0 ? (
    filteredCareers.map((career) => (
      <div key={career.career_id} className="border-b py-4 hover:bg-gray-100">
        <div className="flex justify-between items-start space-x-4">
          
          {/* Left Section: Career Details */}
          <div>
          <Link to={`/career/${career.career_id}`}>
            <h2 className="text-lg font-bold">{career.title}</h2>
            </Link>
            <p className="text-sm text-gray-600">{career.location}</p>
          </div>

          {/* Right Section: Title and Location */}
          <div className="text-right ">
             <p className="font-bold text-gray-700">{career.category} | {career.job_type}</p>
            <p className="text-sm text-gray-600">Salary: {career.salary}</p>
            <p className="text-sm mt-1">
              Apply Before:{" "}
              <span className="font-bold">
                {new Date(career.apply_before).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No open positions found.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default CareerPage;
