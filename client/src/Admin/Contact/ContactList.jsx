import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Toaster, toast } from "react-hot-toast";

const ContactList = () => {
  const [contact, setContact] = useState([]);
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  const truncate = (str, length) => {
    if (!str) return '';  // Return empty string if str is undefined or null
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  const getNews = async () => {
    try {
      const response = await fetch(SummaryApi.Contact.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      // setContact(jsonData);
      setContact(Array.isArray(jsonData) ? jsonData : []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleDeleteClick = async (item) => {
    console.log('Update clicked for:', item);
    try {
      await fetch(`${SummaryApi.deleteContact.url}/${item}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });
      setContact(contact.filter((contact) => contact.contact_id !== item));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const exportToExcel = () => {
    const tableData = [
      ["UserName", "Email", "Company", "Phone", "Job", "Relationship", "Writing About", "Created At"],
      ...contact.map((item) => [
        item.username,
        item.email,
        item.company,
        item.telephone,
        item.job,
        item.relationship,
        item.writingabout,
        item.created_at.replace("T", " ").split(".")[0],
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "Contacts.xlsx");
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
      name: 'Company',
      selector: row => row.company,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.telephone,
      sortable: true,
    },
    {
      name: 'Job',
      selector: row => truncate(row.job, 50),
      sortable: true,
    },
    {
      name: 'Relationship',
      selector: row => truncate(row.relationship, 50),
      sortable: true,
    },
    {
      name: 'Writing About',
      selector: row => truncate(row.writingAbout, 50),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => row.created_at ? row.created_at.replace("T", " ").split(".")[0] : "N/A",
      sortable: true,
    },
    {
      name: 'Delete',
      button: true,
      cell: (row) => (
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => handleDeleteClick(row.contact_id)}
        >
          Delete
        </button>
      ),
    }
  ];

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg">
      <Toaster position="top-left" />
      <h1 className="mb-5 text-2xl font-bold">Contact List</h1>

      <button
        onClick={exportToExcel}
        className="px-4 py-2 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        Download Excel
      </button>

      <DataTable
        title="Contacts"
        columns={columns}
        data={Array.isArray(contact) ? contact : []} 
        pagination
        highlightOnHover
       
      />
    </div>
  );
};

export default ContactList;
