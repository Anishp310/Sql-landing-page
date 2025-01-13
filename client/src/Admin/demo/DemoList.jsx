import React, { useEffect, useState } from 'react';
import { toast, Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

const DemoList = () => {
  const [demo, setDemo] = useState([]);
  const token = localStorage.getItem("token");
  const truncate = (str, length) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };
  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  const getDemo = async () => {
    try {
      const response = await fetch('http://localhost:8080/getAllDemo');
      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      setDemo(jsonData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDemo();
  }, []);

  const handleDeleteClick = async (item) => {
    try {
      await fetch(`http://localhost:8080/deleteDemo/${item}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        method: 'DELETE',
      });
      setDemo(demo.filter((demo) => demo.demo_id !== item));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        item.created_at.replace("T", " ").split(".")[0],
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demo Data");
    XLSX.writeFile(workbook, "DemoData.xlsx");
  };

  return (
    <div className="max-w-screen-xl mx-auto my-5 p-4 bg-gray-100 rounded shadow-lg overflow-hidden">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-5">Demo List</h1>

      <div className="flex justify-start mb-4">
        <button
          className="px-4 py-2 text-white bg-green-500  rounded-lg hover:bg-green-600 focus:outline-none"
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
          {demo?.map((item, index) => (
            <tr key={item.demo_id || index} className="hover:bg-gray-600 hover:text-white">
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
                  onClick={() => handleDeleteClick(item.demo_id)}
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

export default DemoList;
