import DataTable from "react-data-table-component";
import EditNews from "./EditNews";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";

const TableLists = () => {
  const { setOpenModal, refreshNews } = useOutletContext();
  const [allNews, setAllNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  const getNews = async () => {
    try {
      const response = await fetch(SummaryApi.GetAllNews.url);
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      setAllNews(jsonData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteNews = async (news_id) => {
    try {
      await fetch(`${SummaryApi.deleteNews.url}/${news_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });
      setAllNews(allNews.filter((news) => news.news_id !== news_id));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateClick = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getNews();
  }, []);

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      cell: row => row.title.substring(0, 50),
      sortable: true,
    },
    {
      name: 'Site',
      selector: row => row.site,
      cell: row => row.site.substring(0, 40),
      sortable: true,
    },
    {
      name: 'Source',
      selector: row => row.source,
      cell: row => row.source.substring(0, 40),
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      cell: row => row.description.substring(0, 60),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => row.created_at,
      cell: row => row.created_at.replace("T", " ").split(".")[0],
      sortable: true,
    },
    {
      name: 'Edit',
      cell: row => (
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => handleUpdateClick(row)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <button
          className="px-4 py-2 ml-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={() => deleteNews(row.news_id)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">News List</h1>

      <div className="float-left mb-5">
        <button
          className="text-white bg-green-500 btn hover:bg-green-600"
          onClick={() => setOpenModal(true)}
          aria-label="Open Add News Modal"
        >
          Add News
        </button>
      </div>

      <DataTable
        columns={columns}
        data={allNews}
        pagination
        highlightOnHover
        pointerOnHover
      />

      {isModalOpen && (
        <EditNews
          news={selectedNews}
          closeModal={() => setIsModalOpen(false)}
          refreshNews={getNews}
        />
      )}
    </div>
  );
};

export default TableLists;
