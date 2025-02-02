import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const token = localStorage.getItem("token");

  // Truncate helper function
  const truncate = (str, length) => {
    return str?.length > length ? str.slice(0, length) + "..." : str;
  };

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  // Fetch subscriptions list from API
  const getSubscriptions = async () => {
    try {
      const response = await fetch(SummaryApi.getAllSubscriptions.url);
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      setSubscriptions(Array.isArray(jsonData) ? jsonData : []);
    } catch (error) {
      toast.error(`Error fetching subscriptions data: ${error.message}`);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  // Delete subscription by ID
  const handleDeleteClick = async (subs_id) => {
    try {
      await fetch(`${SummaryApi.deleteSubscription.url}/${subs_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update state with the most recent subscriptions after deletion
      setSubscriptions((prevSubscriptions) => 
        prevSubscriptions.filter((item) => item.subs_id !== subs_id)
      );
      
      toast.success("Subscription deleted successfully.");
    } catch (error) {
      toast.error(`Error deleting subscription: ${error.message}`);
    }
  };
  

  // Export subscriptions list to Excel
  const exportToExcel = () => {
    const tableData = [
      ["Name", "Email", "Phone", "Subscription Type", "Created At"],
      ...subscriptions.map((item) => [
        item.name,
        item.email,
        item.phone,
        item.type,
        item.created_at?.replace("T", " ").split(".")[0] || "N/A",
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscriptions");
    XLSX.writeFile(workbook, "SubscriptionsData.xlsx");
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.Name,
      sortable: true,
      minWidth: "180px", 
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      minWidth: "250px", // Increased space for Email
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Subscription Type',
      selector: row => row.type,
      sortable: true,
      minWidth: "200px", // Increased space for Subscription Type
    },
    {
      name: 'Created At',
      selector: row => row.date?.replace("T", " ").split(".")[0] || "N/A",
      sortable: true,
    },
    {
      name: 'Delete',
      button: true,
      cell: (row) => (
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={() => handleDeleteClick(row.subs_id)}
        >
          Delete
        </button>
      ),
    },
  ];
  

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Subscription List</h1>

      <div className="flex justify-start mb-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
      </div>

      <DataTable
        title="Subscriptions"
        columns={columns}
        data={subscriptions}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default SubscriptionList;
