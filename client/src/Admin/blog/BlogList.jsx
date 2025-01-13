import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

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
      const response = await fetch('http://localhost:8080/blogs');
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

  const handleBlogSubmit = async (data) => {
    if (!validateToken()) return;
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image_data) {
      formData.append("image_data", data.image_data[0]); // File upload
    }
  
    try {
      setLoading(true);
      const url = selectedBlog
        ? `http://localhost:8080/updateblog/${selectedBlog.blog_id}`
        : 'http://localhost:8080/addblog';
  
      const response = await fetch(url, {
        method: selectedBlog ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData, // Using FormData for file uploads
      });
  
      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(responseBody.message || "Failed to process the request.");
      }
  
      toast.success(selectedBlog ? "Blog updated successfully!" : "Blog added successfully!");
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
      const response = await fetch(`http://localhost:8080/deleteblog/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

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
    <div className="blog-list-container max-w-screen-xl mx-auto my-5 p-4 bg-gray-100 rounded shadow-lg overflow-hidden">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-5">Blog List</h1>

      <button
        onClick={() => {
          console.log("Opening modal");
          reset(); 
          setIsModalOpen(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded mb-4"
      >
        Add Blog
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-gray-300 shadow-lg">
          <thead>
            <tr className="text-black bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">Title</th>
              <th className="px-4 py-2 text-left border border-gray-300">Description</th>
              <th className="px-4 py-2 text-left border border-gray-300">Image</th>
              <th className="px-4 py-2 text-left border border-gray-300">Created at</th>

              <th className="px-4 py-2 text-left border border-gray-300">Edit</th>
              <th className="px-4 py-2 text-left border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog) => (
              <tr key={blog.blog_id} className="hover:bg-gray-600 hover:text-white">
                <td className="border px-4 py-2 border-gray-300">{blog.title}</td>
                <td className="border px-4 py-2 border-gray-300">{blog.description}</td>
                <td className="border px-4 py-2 border-gray-300">
                <td className="border px-4 py-2 border-gray-300 flex justify-center items-center">
  {blog.image_data && (
    <img
      src={blog.image_data} // This is the base64 string you get from the backend
      alt={`Blog ${blog.blog_id}`}
      className="h-20 w-40 object-cover" 
      
    />
  )}
</td>


                </td>
                <td className="border px-4 py-2 border-gray-300">{blog.created_at}</td>

                <td className="border px-4 py-2 border-gray-300">
                  <button
                    onClick={() => setSelectedBlog(blog) || setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-8 py-3 rounded mr-2"
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <button
                    onClick={() => handleDeleteClick(blog.blog_id)}
                    className="bg-red-500 text-white px-8 py-3 rounded"
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
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center" open>
          <div className="modal-content bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">{selectedBlog ? "Update Blog" : "Add Blog"}</h2>
            <form onSubmit={handleSubmit(handleBlogSubmit)} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  defaultValue={selectedBlog?.title || ""}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  defaultValue={selectedBlog?.description || ""}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="image_data" className="block text-sm font-medium">Image</label>
                <input
                  {...register("image_data", { required: "Image is required" })}
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedBlog(null); // Reset selected blog
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
