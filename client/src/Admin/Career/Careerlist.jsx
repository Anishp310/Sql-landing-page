import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
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
      Responsibility: '',  // Added Responsibility field
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
      SkillsRequired: career.skills_required,  // Corrected field name
      Responsibility: career.responsibility || '',  // Added Responsibility field
    });
  };

  const exportToExcel = () => {
    const tableData = [
      ["title", "JobType", "Experience", "Qualification", "Category", "Location", "ApplyBefore", "Description", "Salary", "SkillsRequired", "Responsibility"],
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
        item.responsibility,  // Added Responsibility field
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

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Job Type',
      selector: row => row.job_type,
    },
    {
      name: 'Experience',
      selector: row => row.experience,
    },
    {
      name: 'Qualification',
      selector: row => row.qualification,
    },
    {
      name: 'Salary',
      selector: row => row.salary,
    },
    {
      name: 'Category',
      selector: row => row.category,
    },
    {
      name: 'Location',
      selector: row => row.location,
    },
    {
      name: 'Apply Before',
      selector: row => row.apply_before.split("T")[0],
    },
    {
      name: 'Description',
      selector: row => truncate(row.description, 50),
    },
    {
      name: 'Skills Required',
      selector: row => truncate(row.skills_required, 50),
    },
    {
      name: 'Responsibility',  // New column for Responsibility
      selector: row => truncate(row.responsibility, 50), 
    },
    {
      name: 'Created At',
      selector: row => row.created_at.replace("T", " ").split(".")[0],
    },
    {
      name: 'Edit',
      cell: row => (
        <button
          onClick={() => handleUpdateClick(row)}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Edit
        </button>
      ),
    },
    {
      name: 'Delete',
      cell: row => (
        <button
          onClick={() => handleDeleteClick(row.career_id)}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Delete
        </button>
      ),
    }
  ];

  return (
    <div className="p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg max-w-7xl career-list-container">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Career List</h1>
      <div className="flex justify-start mb-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
        <button
          onClick={handleAddCareerClick}
          className="px-4 py-2 ml-4 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Add Career
        </button>
      </div>

      <DataTable
        title="Career List"
        columns={columns}
        data={careerList}
        pagination
        highlightOnHover
        pointerOnHover
      />

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
                <label htmlFor="Qualification" className="block text-sm font-medium text-gray-700">Qualification and Experience</label>   
                <textarea
                  {...register('Qualification', { required: 'Qualification is required' })}
                  id="Qualification"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qualification and Experience"
                ></textarea>
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
              <div className="mb-4">
                <label htmlFor="Responsibility" className="block text-sm font-medium text-gray-700">Responsibility</label>
                <textarea
                  {...register('Responsibility', { required: 'Responsibility is required' })}
                  id="Responsibility"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Responsibilities"
                ></textarea>
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