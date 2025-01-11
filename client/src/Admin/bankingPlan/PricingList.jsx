import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";

const PricingList = () => {
  const [pricingList, setPricingList] = useState([]);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch all pricing data
  const getPricing = async () => {
    try {
      const response = await fetch('http://localhost:8080/pricing');
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
        features: data.features.split("."),  // Split the features string into an array
        excludedfeatures :data.excludedfeatures.split(".")
      };
      

      const url = selectedPricing
        ? `http://localhost:8080/updatepricing/${selectedPricing.pricing_id}`
        : 'http://localhost:8080/addpricing';

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
    console.log(pricingId)
    try {
      const response = await fetch(`http://localhost:8080/deletepricing/${pricingId}`, {
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
    <div className="pricing-list-container max-w-screen-xl mx-auto my-5 p-4 bg-gray-100 rounded shadow-lg overflow-hidden">
      <Toaster position="top-left" />
      <h1 className="text-2xl font-bold mb-5">Pricing List for Corporate Banking Plan</h1>

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
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded mb-4"
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
                <td className="border px-4 py-2 border-gray-300">{pricing.name}</td>
                <td className="border px-4 py-2 border-gray-300">{pricing.price}</td>
                <td className="border px-4 py-2 border-gray-300">{pricing.duration}</td>
                <td className="border px-4 py-2 border-gray-300">
          {/* Ensure that features are parsed as an array before displaying */}
          {Array.isArray(JSON.parse(pricing.features)) ? truncate(JSON.parse(pricing.features).join(". "),50) : truncate(pricing.features,50)}
        </td>              
          <td className="border px-4 py-2 border-gray-300">
                  <button
                    onClick={() => handleUpdateClick(pricing)}
                    className="bg-blue-500 text-white px-8 py-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  </td>
                  <td className="border px-4 py-2 border-gray-300">

                  <button
                    onClick={() => handleDeleteClick(pricing.pricing_id)}
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
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{selectedPricing ? "Update Pricing Plan" : "Add Pricing Plan"}</h2>
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
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  {...register('price', { required: 'Price is required' })}
                  id="price"
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  {...register('duration', { required: 'Duration is required' })}
                  id="duration"
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (comma separated)</label>
                <textarea
                  {...register('features', { required: 'Features are required' })}
                  id="features"
                  rows="3"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default PricingList;
