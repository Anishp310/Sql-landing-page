import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";

const BrochureList = () => {
  const [brochure, setBrochure] = useState([]);
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  const truncate = (str, length) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  const getNews = async () => {
    try {
      const response = await fetch(SummaryApi.getAllBrochure.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch brochures.");
      }

      const textData = await response.text();
      let jsonData = [];

      try {
        jsonData = textData ? JSON.parse(textData) : [];
      } catch (error) {
        toast.error("Failed to parse API response. Please check the data format.");
        console.error("JSON Parse Error:", error);
      }

      setBrochure(Array.isArray(jsonData) ? jsonData : []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleDeleteClick = async (item) => {
    try {
      const response = await fetch(`${SummaryApi.deleteAllBrochure.url}/${item}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete brochure.");
      }

      setBrochure(brochure.filter((brochure) => brochure.brochure_id !== item));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const exportToExcel = () => {
    const tableData = [
      ["UserName", "Email", "Designation", "Phone", "Description", "Meeting", "Created At"],
      ...brochure.map((item) => [
        item.username,
        item.email,
        item.designation,
        item.phone,
        item.description,
        item.meeting ? "Yes" : "No",
        item.created_at.replace("T", " ").split(".")[0],
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Brochure Data");
    XLSX.writeFile(workbook, "BrochureData.xlsx");
  };

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 bg-gray-100 rounded shadow-lg ">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Brochure List</h1>

      <div className="flex justify-start mb-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>
      <table className="w-full border border-collapse border-gray-300 shadow-lg table-auto">
        <thead>
          <tr className="text-black bg-gray-200">
            <th className="px-4 py-2 text-left border border-gray-300">UserName</th>
            <th className="px-4 py-2 text-left border border-gray-300">Email</th>
            <th className="px-4 py-2 text-left border border-gray-300">Designation</th>
            <th className="px-4 py-2 text-left border border-gray-300">Phone</th>
            <th className="px-4 py-2 text-center border border-gray-300">Description</th>
            <th className="px-4 py-2 text-center border border-gray-300">Meeting</th>
            <th className="px-4 py-2 text-center border border-gray-300">Created at</th>
            <th className="px-4 py-2 text-center border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody className="hover">
          {Array.isArray(brochure) && brochure.map((item, index) => (
            <tr key={item.brochure_id || index} className="hover:bg-gray-600 hover:text-white">
              <td className="px-4 py-2 border border-gray-300">{item.username}</td>
              <td className="px-4 py-2 border border-gray-300">{item.email}</td>
              <td className="px-4 py-2 border border-gray-300">{truncate(item.designation, 50)}</td>
              <td className="px-4 py-2 border border-gray-300">{item.phone}</td>
              <td className="px-4 py-2 border border-gray-300">{truncate(item.description, 50)}</td>
              <td className="px-4 py-2 border border-gray-300">{item.meeting ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border border-gray-300">
                {item.created_at.replace("T", " ").split(".")[0]}
              </td>
              <td className="px-4 py-2 text-center border border-gray-300">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleDeleteClick(item.brochure_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrochureList;
