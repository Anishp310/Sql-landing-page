import PropTypes from "prop-types";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ModalForm = ({ setOpenModal, refreshNews }) => {
  const [title, setTitle] = useState("");
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState(""); // New state for source

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const body = { title, site, description, source }; // Include source

      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const response = await fetch(SummaryApi.addNews.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error("Failed to add news");
        return;
      }

      toast.success("Successfully added");
      refreshNews(); // Refresh news after successful submission
      setOpenModal(false); // Close the modal
      setTimeout(() => {
        window.location = "/admin";
      }, 1000); // 1-second delay
    } catch (error) {
      toast.error("Error:", error.message);
      alert("Failed to add news. Please try again.");
    }
  };

  return (
    <dialog id="my_modal" className="modal" open>
      <Toaster position="top-right" />

      <div className="modal-box bg-slate-800">
        <button
          className="absolute btn btn-sm btn-circle btn-white right-2 top-2"
          aria-label="Close"
          onClick={() => setOpenModal(false)}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-white">Fill to add the news</h3>
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleClick}>
          <label className="flex items-center gap-2 input input-primary">
            Title:
            <input
              type="text"
              className="grow"
              placeholder="Today's news"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="flex items-center gap-2 input input-primary">
            Site:
            <input
              type="text"
              className="grow"
              placeholder="www.site.com"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              required
            />
          </label>
          <label className="flex items-center gap-2 input input-primary">
            Source:
            <input
              type="text"
              className="grow"
              placeholder="News Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </label>
          <textarea
            className="w-full textarea textarea-primary"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-xl font-bold text-white bg-green-500 hover:bg-green-700 btn"
          >
            Add News
          </button>
        </form>
      </div>
    </dialog>
  );
};

ModalForm.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  refreshNews: PropTypes.func.isRequired,
};

export default ModalForm;
