import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  const truncate = (str, length) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  const getToken = () => localStorage.getItem("token");

  const validateToken = () => {
    const token = getToken();
    if (!token) {
      toast.error("No token found. Please log in again.");
      return false;
    }
    return true;
  };

  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.Blog.url);
      const jsonData = await response.json();
      setBlogList(jsonData);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (validateToken()) getBlogs();
  }, []);

  const openModal = (blog = null) => {
    setSelectedBlog(blog);
    if (blog) {
      // Prefill form values for editing
      setValue("title", blog.title);
      setValue("description", blog.description);
      setValue("image_data", null); // Reset the file input
    } else {
      reset(); // Reset the form for adding a new blog
    }
    setIsModalOpen(true);
  };

  const handleBlogSubmit = async (data) => {
    if (!validateToken()) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image_data && data.image_data.length > 0) {
      // Add new image only if selected
      formData.append("image_data", data.image_data[0]);
    } else if (selectedBlog?.image_data) {
      // Retain existing image
      formData.append("existing_image", selectedBlog.image_data);
    }

    try {
      setLoading(true);
      const url = selectedBlog
        ? `${SummaryApi.updateBlog.url}/${selectedBlog.blog_id}`
        : SummaryApi.addBlog.url;

      const response = await fetch(url, {
        method: selectedBlog ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(
          responseBody.message || "Failed to process the request."
        );
      }

      toast.success(
        selectedBlog ? "Blog updated successfully!" : "Blog added successfully!"
      );
      setIsModalOpen(false);
      getBlogs();
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (blogId) => {
    if (!validateToken()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${SummaryApi.deleteBlog.url}/${blogId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete blog");

      setBlogList(blogList.filter((blog) => blog.blog_id !== blogId));
      toast.success("Deleted Successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg blog-list-container">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Blog List</h1>

      <button
        onClick={() => openModal()}
        className="px-5 py-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Add Blog
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-gray-300 shadow-lg">
          <thead>
            <tr className="text-black bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">
                Image
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Title
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Description
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Created at
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Edit
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog) => (
              <tr
                key={blog.blog_id}
                className="hover:bg-gray-600 hover:text-white"
              >
                <td className="flex items-center justify-center px-4 py-2 border border-gray-300">
                  {blog.image_data && (
                    <img
                      src={blog.image_data}
                      alt={`Blog ${blog.blog_id}`}
                      className="object-cover w-40 h-20"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {truncate(blog.title, 50)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {truncate(blog.description, 50)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {blog.created_at}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => openModal(blog)}
                    className="px-8 py-3 mr-2 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleDeleteClick(blog.blog_id)}
                    className="px-8 py-3 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 modal"
          open
        >
          <div className="w-full max-w-lg p-6 text-black bg-white rounded-lg shadow-lg modal-content">
            <h2 className="mb-6 text-2xl font-bold">
              {selectedBlog ? "Update Blog" : "Add Blog"}
            </h2>
            <form
              onSubmit={handleSubmit(handleBlogSubmit)}
              className="space-y-4"
            >
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="image_data"
                  className="block text-sm font-medium"
                >
                  Image
                </label>
                {selectedBlog?.image_data && (
                  <img
                    src={selectedBlog.image_data}
                    alt="Existing"
                    className="object-cover w-40 h-20 mb-2"
                  />
                )}
                <input
                  {...register("image_data")}
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedBlog(null);
                  }}
                  className="px-4 py-2 text-white bg-gray-500 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  {selectedBlog ? "Update Blog" : "Add Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
