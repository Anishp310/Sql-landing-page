import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
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
      const response = await fetch(SummaryApi.tradingPricing_List.url);
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
        features: data.features.split(";").map(item => item.trim()),
        excludedFeature: data.excludedFeature.split(";").map(item => item.trim())
      };

      const url = selectedPricing
        ? `${SummaryApi.tradingUpdatePricing.url}/${selectedPricing.pricing_id}`
        : SummaryApi.tradingAddPricing.url;
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
        ? JSON.parse(pricing.features).join("; ") // Join by ;
        : pricing.features,
      excludedFeature: Array.isArray(JSON.parse(pricing.excludedFeature))
        ? JSON.parse(pricing.excludedFeature).join("; ")
        : pricing.excludedFeature,
    });
  };

  const handleDeleteClick = async (pricingId) => {
    try {
      const response = await fetch(`${SummaryApi.tradingDeletePricing.url}/${pricingId}`, {
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

  const parseFeatures = (features) => {
    if (!features) return '';  // Return empty string if features is null or undefined
    try {
      const parsedFeatures = JSON.parse(features);

      if (!Array.isArray(parsedFeatures)) {
        return features;  // If not an array, return the original string
      }

      return parsedFeatures.join(", "); // Join by commas to display correctly
    } catch (error) {
      console.error("Invalid JSON format in features", error);
      return features;
    }
  };

  // DataTable columns
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.duration,
      sortable: true,
    },
    {
      name: 'Features',
      selector: row => truncate(parseFeatures(row.features), 50),
    },
    {
      name: 'Excluded Features',
      selector: row => truncate(parseFeatures(row.excludedFeature), 50),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
            onClick={() => handleUpdateClick(row)}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row.pricing_id)}
            className="px-4 py-2 ml-2 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg pricing-list-container">
      <Toaster position="top-left" />
      <h1 className="mb-5 text-2xl font-bold">Pricing List for Trading Plan</h1>

      <button
        onClick={() => {
          setSelectedPricing(null);
          reset({
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
        <DataTable
          columns={columns}
          data={pricingList}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {/* Modal for adding/editing pricing */}
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
              {/* Form fields */}
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
                <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (separated with semi-colon ;)</label>
                <textarea
                  {...register('features', { required: 'Features are required' })}
                  id="features"
                  rows="3"
                  placeholder="Enter features separated by ; (e.g., Feature1; Feature2; Feature3)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="excludedFeature" className="block text-sm font-medium text-gray-700">Excluded Features (separated with semi-colon ;)</label>
                <textarea
                  {...register('excludedFeature')}
                  id="excludedFeature"
                  rows="3"
                  placeholder="Enter excluded features separated by ; (e.g., Excluded1; Excluded2)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  {selectedPricing ? "Update" : "Add"} Pricing
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Cancel
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
