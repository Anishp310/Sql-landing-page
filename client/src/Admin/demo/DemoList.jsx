import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";

const DemoList = () => {
  const [demo, setDemo] = useState([]);
  const token = localStorage.getItem("token");

  // Truncate helper function
  const truncate = (str, length) => {
    return str?.length > length ? str.slice(0, length) + "..." : str;
  };

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  // Fetch demo list from API
  const getDemo = async () => {
    try {
      const response = await fetch(SummaryApi.getAllDemo.url);
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      setDemo(Array.isArray(jsonData) ? jsonData : []);
    } catch (error) {
      toast.error(`Error fetching demo data: ${error.message}`);
    }
  };

  useEffect(() => {
    getDemo();
  }, []);

  // Delete demo item by ID
  const handleDeleteClick = async (itemId) => {
    try {
      await fetch(`${SummaryApi.deleteDemo.url}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });
      setDemo(demo.filter((item) => item.demo_id !== itemId));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(`Error deleting item: ${error.message}`);
    }
  };

  // Export demo list to Excel
  const exportToExcel = () => {
    const tableData = [
      ["UserName", "Email", "Designation", "Phone", "Description", "Meeting", "Created At"],
      ...demo.map((item) => [
        item.username,
        item.email,
        item.designation,
        item.phone,
        item.description,
        item.meeting ? "Yes" : "No",
        item.created_at?.replace("T", " ").split(".")[0] || "N/A",
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demo Data");
    XLSX.writeFile(workbook, "DemoData.xlsx");
  };

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Demo List</h1>

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
        <tbody>
          {Array.isArray(demo) && demo.length > 0 ? (
            demo.map((item, index) => (
              <tr key={item.demo_id || index} className="hover:bg-gray-600 hover:text-white">
                <td className="px-4 py-2 border border-gray-300">{item.username}</td>
                <td className="px-4 py-2 border border-gray-300">{item.email}</td>
                <td className="px-4 py-2 border border-gray-300">{truncate(item.designation, 50)}</td>
                <td className="px-4 py-2 border border-gray-300">{item.phone}</td>
                <td className="px-4 py-2 border border-gray-300">{truncate(item.description, 50)}</td>
                <td className="px-4 py-2 border border-gray-300">{item.meeting ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.created_at?.replace("T", " ").split(".")[0] || "N/A"}
                </td>
                <td className="px-4 py-2 text-center border border-gray-300">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleDeleteClick(item.demo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                No demo data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DemoList;
