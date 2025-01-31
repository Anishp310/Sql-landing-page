import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

// Function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters except space and hyphen
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
};

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

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

      const sortedData = jsonData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setBlogList(sortedData);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (validateToken()) getBlogs();
  }, []);


  const addBlog = async (formData) => {
    try {
      const response = await fetch(SummaryApi.addBlog.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add the blog");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  };

  const updateBlog = async (selectedBlog, formData) => {
    try {
      const url = `http://server.jooneli.com/updateblog/${selectedBlog.blog_id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update the blog");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  };

  const handleBlogSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image_data?.[0]) {
      formData.append("image_data", data.image_data[0]);
    }

    try {
      let result;
      if (selectedBlog) {
        result = await updateBlog(selectedBlog, formData);
      } else {
        result = await addBlog(formData);
      }

      toast.success(`Blog ${selectedBlog ? "updated" : "added"} successfully!`);
      setIsModalOpen(false);
      getBlogs(); // Refresh blog list
    } catch (error) {
      toast.error(error.message || "Failed to submit blog.");
    }
  };

  const handleDeleteClick = async (blogId) => {
    if (!validateToken()) return;

    try {
      setLoading(true);
      const response = await fetch(`${SummaryApi.deleteBlog.url}/${blogId}`, {
        method: "DELETE",
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

  const columns = [
    {
      name: "Image",
      selector: "image_data",
      cell: (row) => (
        <img
          src={row.image_data || "/placeholder.jpg"}
          alt="Blog"
          className="object-contain w-40 h-20"
        />
      ),
    },
    {
      name: "Title",
      selector: "title",
      cell: (row) => truncate(row.title, 50),
    },
    {
      name: "Description",
      selector: "description",
      cell: (row) => truncate(row.description, 50),
    },
    {
      name: "Created At",
      selector: "created_at",
      cell: (row) => row.created_at,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(row)}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row.blog_id)}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const openModal = (blog = null) => {
    setSelectedBlog(blog);
    if (blog) {
      setValue("title", blog.title);
      setValue("description", blog.description);
      setValue("image_data", null); // Reset image input
    } else {
      reset(); // Reset form if no blog selected
    }
    setIsModalOpen(true);
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

      <DataTable
        columns={columns}
        data={blogList}
        progressPending={loading}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
      />

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
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
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
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
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
