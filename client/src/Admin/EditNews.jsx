import PropTypes from "prop-types";
import SummaryApi from "../common";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const EditNews = ({ news, closeModal, refreshNews }) => {
  const [title, setTitle] = useState(news.title);
  const [site, setSite] = useState(news.site);
  const [description, setDescription] = useState(news.description);
  const [source, setSource] = useState(news.source || ""); // New state for source

  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No token found. Please log in again.");
  }

  const handleClick = async () => {
    try {
      const body = { title, site, description, source }; // Include source

      const response = await fetch(`${SummaryApi.updateNews.url}/${news.news_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error(`Failed to update news. Status: ${response.status}`);
        return;
      }

      toast.success("News updated successfully!");
      refreshNews(); // Refresh the news list
      closeModal(); // Close the modal
    } catch (error) {
      toast.error("Error updating news:", error.message);
    }
  };

  return (
    <dialog open className="modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <Toaster position="top-right" />

      <div className="modal-box bg-slate-800">
        <button
          className="absolute btn btn-sm btn-circle btn-white right-2 top-2"
          aria-label="Close"
          onClick={closeModal}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Edit News</h3>
        <div className="flex flex-col gap-4 mt-2">
          <label className="flex items-center gap-2 input input-primary">
            Title:
            <input
              type="text"
              className="grow"
              value={title}
              placeholder="Today's news"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 input input-primary">
            Site:
            <input
              type="text"
              className="grow"
              value={site}
              placeholder="www.site.com"
              onChange={(e) => setSite(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2 input input-primary">
            Source:
            <input
              type="text"
              className="grow"
              value={source}
              placeholder="News Source"
              onChange={(e) => setSource(e.target.value)}
            />
          </label>
          <textarea
            className="w-full textarea textarea-primary"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="text-xl font-bold bg-green-500 btn"
            onClick={handleClick}
          >
            Update News
          </button>
        </div>
      </div>
    </dialog>
  );
};

// Define PropTypes for the component
EditNews.propTypes = {
  news: PropTypes.shape({
    news_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Accept both string and number
      .isRequired,
    title: PropTypes.string.isRequired,
    site: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string, // Added PropType for source
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  refreshNews: PropTypes.func.isRequired,
};

export default EditNews;
