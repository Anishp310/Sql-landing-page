import SummaryApi from "../../common";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const CareerPage = () => {
  const [careerList, setCareerList] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("Anywhere");
  const [searchTitle, setSearchTitle] = useState("");

  const getCareer = async () => {
    try {
      const response = await fetch(SummaryApi.getCareer.url);
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      const sortedData = jsonData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCareerList(sortedData);
      console.log(sortedData);
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

    if (departmentFilter !== "All Departments") {
      filtered = filtered.filter((career) =>
        career.category.toLowerCase()?.includes(departmentFilter.toLowerCase())
      );
    }
    if (locationFilter !== "Anywhere") {
      filtered = filtered.filter((career) =>
        career.location.toLowerCase()?.includes(locationFilter.toLowerCase())
      );
    }

    if (searchTitle) {
      filtered = filtered.filter((career) =>
        career.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredCareers(filtered);
  };

  return (
    <div className="max-w-[1600px] mx-auto xl:mb-10 mb-8 ">
      <Toaster position="top-right" />
      <div className="py-6 xl:mx-[10rem]">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Open Positions
        </h1>

        {/* Filters Section */}
        <div className="flex-wrap items-center justify-center gap-4 px-6 mb-6 md:flex md:px-0">
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-0">
            <select
              className="px-6 py-2 border rounded-lg"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option>All Departments</option>
              <option>IT Department</option>
              <option>Marketing Department</option>
              <option>Graphics Department</option>
            </select>

            <select
              className="px-6 py-2 border rounded-lg"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option>Anywhere</option>
              <option>Remote</option>
              <option>Intern</option>
              <option>Onsite</option>
              <option>Myanmar</option>
              <option>Bangladesh</option>
              <option>Ghana</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Find by job title..."
            className="w-full p-3 border rounded-md md:w-auto md:py-2 md:px-10"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        {/* Job Listings */}
        <div>
          {filteredCareers.length > 0 ? (
            filteredCareers.map((career) => (
              <div
                key={career.career_id}
                className="px-10 py-8 border-b hover:bg-gray-100"
              >
                <div className="md:flex items-start justify-between md:space-x-4 max-w-[900px] mx-auto">
                  {/* Left Section: Career Details */}
                  <div className="">
                    <Link>
                      <h2 className="pt-2 text-lg font-bold">
                        {career.category}
                      </h2>
                    </Link>
                    <div className="flex gap-1">
                    <MdLocationOn className="text-lg text-gray-500" />
                    <p className="pb-2 text-sm text-gray-600">
                      {career.location}
                    </p>
                    </div>
                    
                  </div>

                  {/* Right Section: Title and Location */}
                  <div className="md:text-right ">
                    <Link to={`/career/${career.career_id}`}>
                      <p className="font-bold text-gray-700">
                        {career.title} | {career.job_type}
                      </p>
                    </Link>

                    <p className="text-sm text-gray-600">
                      Salary: {career.salary}
                    </p>
                    <p className="mt-1 text-sm">
                      Apply Before:{" "}
                      <span className="font-bold">
                        {new Date(career.apply_before).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No open positions to apply at Jooneli </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPage;