import EditNews from "./EditNews";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";

const TableLists = () => {
  const { setOpenModal, refreshNews } = useOutletContext();
  const [allNews, setAllNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); // Manage selected news for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const truncate = (str, length) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  const getNews = async () => {
    try {
      const response = await fetch(SummaryApi.GetAllNews.url);

      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      setAllNews(jsonData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteNews = async (news_id) => {
    try {
      await fetch(`${SummaryApi.deleteNews.url}/${news_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        method: 'DELETE',
      });
      setAllNews(allNews.filter((news) => news.news_id !== news_id));
      toast.success("Deleted Successfully")
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateClick = (news) => {
    setSelectedNews(news); // Set the news to edit
    setIsModalOpen(true);  // Open the modal
  };

  useEffect(() => {
    getNews();
  }, []);

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
      <table className="w-full border border-collapse border-gray-300 shadow-lg table-auto">
        {/* head */}
        <thead>
          <tr className="text-black bg-gray-200">
            <th className="px-4 py-2 text-left border border-gray-300">Title</th>
            <th className="px-4 py-2 text-left border border-gray-300">Site</th>
            <th className="px-4 py-2 text-left border border-gray-300">Source</th>
            <th className="px-4 py-2 text-left border border-gray-300">Description</th>
            <th className="px-4 py-2 text-left border border-gray-300">Created At</th>
            <th className="px-4 py-2 text-center border border-gray-300">Edit</th>
            <th className="px-4 py-2 text-center border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody className="hover">
          {allNews?.map((news) => (
            <tr key={news.news_id} className="hover:bg-gray-600 hover:text-black">
              <td className="px-4 py-2 border border-gray-300 ">{news.title.substring(0,50)}</td>
              <td className="px-4 py-2 border border-gray-300">{news.site}</td>
              <td className="px-4 py-2 border border-gray-300">{news.source}</td>

              <td className="px-4 py-2 border border-gray-300 truncate-cell">{truncate(news.description,50)}</td>
              <td className="px-4 py-2 border border-gray-300">
             {
                news.created_at.replace("T", " ").split(".")[0]
               }
            </td>  
            <td className="px-4 py-2 text-center border border-gray-300 ">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg btn btn-secondary hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleUpdateClick(news)}
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-2 text-center border border-gray-300 ">
                <button
                  className="px-4 py-2 ml-2 text-white bg-red-500 rounded-lg btn btn-accent hover:bg-red-600 focus:outline-none"
                  onClick={() => deleteNews(news.news_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditNews
          news={selectedNews}
          closeModal={() => setIsModalOpen(false)}
          refreshNews={getNews} // Refresh the news list after update
        />
      )}
    </div>
  );
};

export default TableLists;
