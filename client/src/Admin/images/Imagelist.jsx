import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const Imagelist = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch images
  const getImages = async () => {
    try {
      const response = await fetch( SummaryApi.getAllImages.url);
      const textData = await response.text(); // Get raw response as text
      const jsonData = textData ? JSON.parse(textData) : []; // Parse only if data exists
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
  }, []);

  const handleImageSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      // Append the new image only if it's uploaded
      if (data.image_data.length > 0) {
        formData.append("image_data", data.image_data[0]);
      }
  
      const url = selectedImage
        ? `${SummaryApi.updateImages.url}/${selectedImage.image_id}`
        : SummaryApi.addImages.url;
  
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
      reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
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
      const response = await fetch(`${SummaryApi.deleteImages.url}/${imageId}`, {
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
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg image-list-container">
      <Toaster position="top-right" />
      <h1 className="mb-5 text-2xl font-bold">Image List</h1>

      <button
        onClick={() => {
          setSelectedImage(null);
          reset();
          setIsModalOpen(true);
        }}
        className="px-5 py-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
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
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={image.image_data} // Base64 image source
                    alt={`Image ${image.image_id}`}
                    className="object-cover w-20 h-20"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">{image.created_at.replace("T", " ").split(".")[0]}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleUpdateClick(image)}
                    className="px-8 py-3 mr-2 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleDeleteClick(image.image_id)}
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
        <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50 modal" open>
          <div className="relative modal-content bg-white text-black p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{selectedImage ? "Update Image" : "Add Image"}</h2>
            <div className="absolute top-3 right-2">
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => { setIsModalOpen(false); }}
              />
            </div>
            <form onSubmit={handleSubmit(handleImageSubmit)} className="space-y-6">
              {selectedImage && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Current Image</label>
                  <img
                    src={selectedImage.image_data} // Base64 image source
                    alt="Selected"
                    className="object-contain w-full h-40"
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="image_data" className="block text-sm font-medium text-gray-700">Upload New Image</label>
                <input
                  {...register('image_data')}
                  id="image_data"
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
              </div>

              <div className="flex flex-wrap justify-between mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-6 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
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
