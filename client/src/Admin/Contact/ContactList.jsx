import * as XLSX from "xlsx";
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
          Authorization: `Bearer ${token}`, // Ensure token is passed in request header
        },
      });
      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      setContact(jsonData);
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
          Authorization: `Bearer ${token}`, // Add token to Authorization header
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

      <table className="w-full border border-collapse border-gray-300 shadow-lg table-auto">
        <thead>
          <tr className="text-black bg-gray-200">
            <th className="px-4 py-2 text-left border border-gray-300">UserName</th>
            <th className="px-4 py-2 text-left border border-gray-300">Email</th>
            <th className="px-4 py-2 text-left border border-gray-300">Company</th>
            <th className="px-4 py-2 text-left border border-gray-300">Phone</th>
            <th className="px-4 py-2 text-center border border-gray-300">Job</th>
            <th className="px-4 py-2 text-center border border-gray-300">Relationship</th>
            <th className="px-4 py-2 text-center border border-gray-300">Writing About</th>
            <th className="px-4 py-2 text-center border border-gray-300">Created at</th>
            <th className="px-4 py-2 text-center border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody className="hover">
          {contact?.map((item, index) => (
            <tr key={item.contact_id || index} className="hover:bg-gray-600 hover:text-white">
              <td className="px-4 py-2 border border-gray-300">{item.username}</td>
              <td className="px-4 py-2 border border-gray-300">{item.email}</td>
              <td className="px-4 py-2 border border-gray-300">{item.company}</td>
              <td className="px-4 py-2 border border-gray-300">{item.telephone}</td>
              <td className="px-4 py-2 border border-gray-300">{truncate(item.job, 50)}</td>
              <td className="px-4 py-2 border border-gray-300">{truncate(item.relationship, 50)}</td>
              <td className="px-4 py-2 border border-gray-300">{truncate(item.writingAbout, 50)}</td>
              <td className="px-4 py-2 border border-gray-300">{item.created_at.replace("T", " ").split(".")[0]}</td>
              <td className="px-4 py-2 text-center border border-gray-300">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg btn btn-secondary hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleDeleteClick(item.contact_id)}
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

export default ContactList;
