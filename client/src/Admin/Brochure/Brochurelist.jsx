import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";
import DataTable from "react-data-table-component";

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

  // Define columns for DataTable
  const columns = [
    {
      name: "UserName",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => truncate(row.designation, 50),
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => truncate(row.description, 50),
      sortable: true,
    },
    {
      name: "Meeting",
      selector: (row) => (row.meeting ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at.replace("T", " ").split(".")[0],
      sortable: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          onClick={() => handleDeleteClick(row.brochure_id)}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 bg-gray-100 rounded shadow-lg">
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

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={brochure}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default BrochureList;
