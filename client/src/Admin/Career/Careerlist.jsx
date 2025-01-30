import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const Careerlist = () => {
  const [careerList, setCareerList] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const truncate = (str, length) => {
    if (!str) return '';  // Return empty string if str is undefined or null
    return str.length > length ? str.slice(0, length) + "..." : str;
  };
  
  const { register, handleSubmit, reset } = useForm();

  const getCareer = async () => {
    try {
      const response = await fetch(SummaryApi.getCareer.url);
      if (!response.ok) {
        throw new Error('Failed to fetch career data');
      }
      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      console.log(jsonData)

      setCareerList(jsonData);  // Update state with the data
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  

  useEffect(() => {
    getCareer();
  }, []);

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("No token found. Please log in again.");
    return;
  }
  const handleAddCareerClick = () => {
    setSelectedCareer(null);  // Clear selected career
    reset({
      Title: '',
      JobType: '',
      Experience: '',
      Qualification: '',
      Category: '',
      Location: '',
      ApplyBefore: '', 
      Description: '',
      Salary: '',
      SkillsRequired: '',
    });  // Reset the form to empty values
    setIsModalOpen(true);
  };
  
  const handleCareerSubmit = async (data) => {
    try {
      const url = selectedCareer
        ? `${SummaryApi.updateCareer.url}/${selectedCareer.career_id}`
        : SummaryApi.addCareer.url;
      const method = selectedCareer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error(selectedCareer ? "Failed to update career" : "Failed to add career");
        return;
      }

      toast.success(selectedCareer ? "Career updated successfully!" : "Career added successfully!");
      setIsModalOpen(false);
      getCareer();
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  const handleUpdateClick = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
    reset({
      Title: career.title,
      JobType: career.job_type,  // Corrected field name
      Experience: career.experience,
      Qualification: career.qualification,
      Category: career.category,
      Location: career.location,
      ApplyBefore: career.apply_before.split("T")[0],  // Corrected field name
      Description: career.description,
      Salary: career.salary,
      SkillsRequired: career.skills_required,  // Corrected field nam
    });
  };

    const exportToExcel = () => {
      const tableData = [
        ["title", "JobType", "Experience", "Qualification", "Category", "Location", "ApplyBefore", "Description", "Salary", "SkillsRequired"],
        ...careerList.map((item) => [
          item.title,
          item.job_type,  // Corrected field name
          item.experience,
          item.qualification,
          item.category,
          item.location,
          item.apply_before.split("T")[0],  // Corrected field name
          item.description,
          item.salary,
          item.skills_required,  // Corrected field name
        ]),
      ];
  
  
      const worksheet = XLSX.utils.aoa_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Careerlist");
      XLSX.writeFile(workbook, "Careerlist.xlsx");
    };
  

  const handleDeleteClick = async (careerId) => {
    try {
      const response = await fetch(`${SummaryApi.deleteCareer.url}/${careerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete career');
      }

      setCareerList(careerList.filter((career) => career.career_id !== careerId));
      toast.success("Deleted Successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete career. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg career-list-container">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Career List</h1>
      <div className="overflow-x-auto h-100">
      <div className="flex justify-start mb-4">
    
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
        <button
        onClick={() => {
          setSelectedCareer(null);
          reset();
          setIsModalOpen(true);
          handleAddCareerClick()
        }}
        className="px-4 py-2 ml-4 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"

      >
        Add Career
      </button>
      </div>
        <table className="w-full border-collapse border-gray-300 shadow-lg">
          <thead className=''>
            <tr className="text-black bg-gray-200">
            <th className="px-4 py-2 text-left border border-gray-300 ">Title</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Job Type</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Experience</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Qualification</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Salary</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Category</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">location</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">ApplyBefore</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Description</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Salary</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">SkillsRequired</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Created_at</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Edit</th>
            <th className="px-4 py-2 text-left border border-gray-300 ">Delete</th>

            </tr>
          </thead>
          <tbody className=''>
            {careerList.map((career) => (
              <tr key={career.career_id} className="hover:bg-gray-600 hover:text-white">
                <td className="w-8 h-8 px-4 py-2 overflow-hidden border border-gray-300">{career.title}</td>
              <td className="px-4 py-2 border border-gray-300">{career.job_type}</td>
              <td className="px-4 py-2 border border-gray-300">{career.experience}</td>
              <td className="px-4 py-2 border border-gray-300">{career.qualification}</td>
              <td className="px-4 py-2 border border-gray-300">{career.salary}</td>
              <td className="px-4 py-2 border border-gray-300">{career.category}</td>
              <td className="px-4 py-2 border border-gray-300">{career.location}</td>
              <td className="px-4 py-2 border border-gray-300">{career.apply_before.replace("T", " ").split(".")[0]}</td>
              <td className="px-4 py-2 border border-gray-300 ">{truncate(career.description,50)}</td>
              <td className="px-4 py-2 border border-gray-300">{career.salary}</td>
              <td className="px-4 py-2 border border-gray-300">{truncate(career.skills_required,50)}</td>
              <td className="px-4 py-2 border border-gray-300">{career.created_at.replace("T", " ").split(".")[0]}</td>
              <td className="px-4 py-2 border border-gray-300 ">
                <button
                  onClick={() => handleUpdateClick(career)}
                  className="px-8 py-3 mr-2 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
               
              </td>
              <td className="py-2 border-b px- ">
              <button
                  onClick={() => handleDeleteClick(career.career_id)}
                  className="px-8 py-3 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50 modal" open>
          <div className="relative modal-content bg-white text-black p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{selectedCareer ? "Update Career" : "Add Career"}</h2>
            <div className='absolute top-3 right-2'>
        <FaTimes className='text-2xl cursor-pointer'
        onClick={()=>{setIsModalOpen(false)}} />
      </div>
            <form onSubmit={handleSubmit(handleCareerSubmit)} className="space-y-6">
              
              <div className="mb-4">
                <label htmlFor="Title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  {...register('Title', { required: 'Job title is required' })}
                  id="Title"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Title"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="JobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                <input
                  {...register('JobType', { required: 'JobType is required' })}
                  id="JobType"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Type"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Experience" className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  {...register('Experience', { required: 'Experience is required' })}
                  id="Experience"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Experience (e.g., 2-3 years)"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
                <input
                  {...register('Qualification', { required: 'Qualification is required' })}
                  id="Qualification"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qualification (e.g., Bachelor's)"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  {...register('Category', { required: 'Category is required' })}
                  id="Category"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category (e.g., IT, Marketing)"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  {...register('Location', { required: 'Location is required' })}
                  id="Location"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Location (e.g., New York, Remote)"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="ApplyBefore" className="block text-sm font-medium text-gray-700">Apply Before</label>
                <input
                  {...register('ApplyBefore', { required: 'Application deadline is required' })}
                  id="ApplyBefore"
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('Description', { required: 'Description is required' })}
                  id="Description"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Description"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Salary" className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  {...register('Salary', { required: 'Salary is required' })}
                  id="Salary"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Salary (e.g., 50,000 USD)"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="SkillsRequired" className="block text-sm font-medium text-gray-700">Skills Required</label>
                <input
                  {...register('SkillsRequired', { required: 'Skills is required' })}
                  id="SkillsRequired"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Skills Required (e.g., Java, React)"
                />
              </div>

              <div className="flex flex-wrap justify-between mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-6 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
                >
                  {selectedCareer ? 'Update Career' : 'Add Career'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careerlist;
