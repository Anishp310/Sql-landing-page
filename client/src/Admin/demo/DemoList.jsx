import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";
import DataTable from 'react-data-table-component';  // Import DataTable component

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
      await fetch(`${SummaryApi.deleteAllDemo.url}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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

  const columns = [
    {
      name: 'UserName',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => truncate(row.designation, 50),
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => truncate(row.description, 50),
      sortable: true,
    },
    {
      name: 'Meeting',
      selector: row => row.meeting ? "Yes" : "No",
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => row.created_at?.replace("T", " ").split(".")[0] || "N/A",
      sortable: true,
    },
    {
      name: 'Delete',
      button: true,
      cell: (row) => (
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => handleDeleteClick(row.demo_id)}
        >
          Delete
        </button>
      ),
    }
  ];

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

      <DataTable
        title="Demo Data"
        columns={columns}
        data={demo}
        pagination
        highlightOnHover
    
      />
    </div>
  );
};

export default DemoList;
