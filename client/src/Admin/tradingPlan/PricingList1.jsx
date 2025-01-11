import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const PricingList1 = () => {
  const [pricingList, setPricingList] = useState([]);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch all pricing data
 const getPricing = async () => {
    try {
      const response = await fetch('http://localhost:8080/pricing1');
      const jsonData = await response.json();

      setPricingList(jsonData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const truncate = (str, length) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  useEffect(() => {
    getPricing();
  }, []);

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("No token found. Please log in again.");
    return;
  }

  const handlePricingSubmit = async (data) => {
    try {
      const body = { 
        name: data.name,
        price: data.price,
        duration: data.duration,
        features: data.features.split("."), // Split features by comma
        excludedfeatures :data.excludedfeatures.split(".")

      };
      console.log(body)

      const url = selectedPricing
        ? `http://localhost:8080/updatepricing1/${selectedPricing.pricing_id}`
        : 'http://localhost:8080/addpricing1';
      const response = await fetch(url, {
        method: selectedPricing ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error(selectedPricing ? "Failed to update pricing" : "Failed to add pricing");
        return;
      }

      toast.success(selectedPricing ? "Pricing updated successfully!" : "Pricing added successfully!");
      setIsModalOpen(false);
      getPricing();
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  const handleUpdateClick = (pricing) => {
    setSelectedPricing(pricing);
    setIsModalOpen(true);
    reset({
      name: pricing.name,
      price: pricing.price,
      duration: pricing.duration,
      features: Array.isArray(JSON.parse(pricing.features))
        ? JSON.parse(pricing.features).join(", ")
        : pricing.features,
    });
  };

  const handleDeleteClick = async (pricingId) => {
    try {
      const response = await fetch(`http://localhost:8080/deletepricing1/${pricingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete pricing');
      }

      setPricingList(pricingList.filter((pricing) => pricing.pricing_id !== pricingId));
      toast.success("Pricing deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete pricing. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg pricing-list-container">
      <Toaster position="top-left" />
      <h1 className="mb-5 text-2xl font-bold">Pricing List for Trading Plan</h1>

      <button
        onClick={() => {
          setSelectedPricing(null);
          reset({ // Reset the form fields to be empty
            name: '',
            price: '',
            duration: '',
            features: '',
          });
          setIsModalOpen(true);
        }}
        className="px-5 py-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Add Pricing Plan
      </button>

      <div className="overflow-x-auto h-100">
        <table className="w-full border-collapse border-gray-300 shadow-lg">
          <thead>
            <tr className="text-black bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Price</th>
              <th className="px-4 py-2 text-left border border-gray-300">Duration</th>
              <th className="px-4 py-2 text-left border border-gray-300">Features</th>
              <th className="px-4 py-2 text-left border border-gray-300">Edit</th>
              <th className="px-4 py-2 text-left border border-gray-300">Delete</th>

            </tr>
          </thead>
          <tbody>
            {pricingList.map((pricing) => (
              <tr key={pricing.pricing_id} className="hover:bg-gray-600 hover:text-white">
                <td className="px-4 py-2 border border-gray-300">{pricing.name}</td>
                <td className="px-4 py-2 border border-gray-300">{pricing.price}</td>
                <td className="px-4 py-2 border border-gray-300">{pricing.duration}</td>
                <td className="border px-4 py-2 border-gray-300">
          {/* Ensure that features are parsed as an array before displaying */}
          {Array.isArray(JSON.parse(pricing.features)) ? truncate(JSON.parse(pricing.features).join(". "),50) : truncate(pricing.features,50)}
        </td>
                        <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleUpdateClick(pricing)}
                    className="px-8 py-3 mr-2 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">

                  <button
                    onClick={() => handleDeleteClick(pricing.pricing_id)}
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
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{selectedPricing ? "Update Pricing Plan" : "Add Pricing Plan"}</h2>
            <div className="absolute top-3 right-2">
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => { setIsModalOpen(false); }}
              />
            </div>
            <form onSubmit={handleSubmit(handlePricingSubmit)} className="space-y-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  id="name"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  {...register('price', { required: 'Price is required' })}
                  id="price"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  {...register('duration', { required: 'Duration is required' })}
                  id="duration"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (comma separated)</label>
                <textarea
                  {...register('features', { required: 'Features are required' })}
                  id="features"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="excludedfeatures" className="block text-sm font-medium text-gray-700">Excludedfeatures (comma separated)</label>
                <textarea
                  {...register('excludedfeatures')}
                  id="excludedfeatures"
                  rows="3"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {selectedPricing ? 'Update Pricing Plan' : 'Add Pricing Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingList1;
