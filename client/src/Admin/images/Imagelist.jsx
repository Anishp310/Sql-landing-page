import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";

const Imagelist = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch images
  const getImages = async () => {
    try {
      const response = await fetch('http://localhost:8080/getAllImages');
      const textData = await response.text();  // Get raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data exists
      setImageList(jsonData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }
    getImages();
  }, []);  // No dependency on token, just run once on component mount

  const handleImageSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image_data", data.image_data[0]);  // Image file to be uploaded
      
      const url = selectedImage
        ? `http://localhost:8080/updateImages/${selectedImage.image_id}`
        : 'http://localhost:8080/addImages';
      
      const response = await fetch(url, {
        method: selectedImage ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        toast.error(selectedImage ? "Failed to update image" : "Failed to add image");
        return;
      }

      toast.success(selectedImage ? "Image updated successfully!" : "Image added successfully!");
      setIsModalOpen(false);
      getImages();
      reset();  // Reset the form after successful submission
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  const handleUpdateClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    reset();
  };

  const handleDeleteClick = async (imageId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/deleteImages/${imageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      setImageList(imageList.filter((image) => image.image_id !== imageId));
      toast.success("Deleted Successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete image. Please try again.");
    }
  };

  return (
    <div className="image-list-container max-w-screen-xl mx-auto my-5 p-4 bg-gray-100 rounded shadow-lg overflow-hidden">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-5">Image List</h1>

      <button
        onClick={() => {
          setSelectedImage(null);
          reset();
          setIsModalOpen(true);
        }}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded mb-4"
      >
        Add Image
      </button>

      <div className="overflow-x-auto h-100">
        <table className="w-full border-collapse border-gray-300 shadow-lg">
          <thead>
            <tr className="text-black bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">Image</th>
              <th className="px-4 py-2 text-left border border-gray-300">Created At</th>
              <th className="px-4 py-2 text-left border border-gray-300">Edit</th>
              <th className="px-4 py-2 text-left border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {imageList.map((image) => (
              <tr key={image.image_id} className="hover:bg-gray-600 hover:text-white">
                <td className="border px-4 py-2 border-gray-300">
                  <img
                    src={image.image_data}  // Base64 image source
                    alt={`Image ${image.image_id}`}
                    className="h-20 w-20 object-cover"
                  />
                </td>
                <td className="border px-4 py-2 border-gray-300">{image.created_at.replace("T", " ").split(".")[0]}</td>
                <td className="border px-4 py-2 border-gray-300">
                  <button
                    onClick={() => handleUpdateClick(image)}
                    className="bg-blue-500 text-white px-8 py-3 rounded mr-2"
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2 border-gray-300">
                  <button
                    onClick={() => handleDeleteClick(image.image_id)}
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
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center overflow-auto" open>
          <div className="relative modal-content bg-white text-black p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{selectedImage ? "Update Image" : "Add Image"}</h2>
            <div className="absolute top-3 right-2">
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => { setIsModalOpen(false); }}
              />
            </div>
            <form onSubmit={handleSubmit(handleImageSubmit)} className="space-y-6">
              <div className="mb-4">
                <label htmlFor="image_data" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  {...register('image_data', { required: 'Image is required' })}
                  id="image_data"
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between flex-wrap space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                >
                  {selectedImage ? 'Update Image' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Imagelist;
