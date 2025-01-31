import SummaryApi from "../../common";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import DataTable from "react-data-table-component";

const PricingList = () => {
  const [pricingList, setPricingList] = useState([]);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Fetch all pricing data
  const getPricing = async () => {
    try {
      const response = await fetch(SummaryApi.Pricing_List.url);
      const jsonData = await response.json();
      setPricingList(jsonData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const truncate = (str, length) => {
    // Check if str is a valid string before accessing length
    if (str && str.length > length) {
      return str.slice(0, length) + "...";
    }
    return str || ""; // Return empty string if str is null/undefined
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
        name: data.name.trim(),
        price: data.price.trim(),
        duration: data.duration.trim(),
        features: data.features.trim().split(";"),
        excludedFeature: data.excludedFeature.trim().split(";"),
      };

      const url = selectedPricing
        ? `${SummaryApi.UpdatePricing.url}/${selectedPricing.pricing_id}`
        : SummaryApi.addPricing.url;

      const response = await fetch(url, {
        method: selectedPricing ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error(
          selectedPricing ? "Failed to update pricing" : "Failed to add pricing"
        );
        return;
      }

      toast.success(
        selectedPricing
          ? "Pricing updated successfully!"
          : "Pricing added successfully!"
      );
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
      name: pricing.name, // Ensure the trim method is called
      price: pricing.price,
      duration: pricing.duration,
      features: Array.isArray(JSON.parse(pricing.features))
        ? JSON.parse(pricing.features).join("; ")
        : pricing.features.trim(),
      excludedFeature: Array.isArray(JSON.parse(pricing.excludedFeature))
        ? JSON.parse(pricing.excludedFeature).join("; ")
        : pricing.excludedFeature,
    });
  };

  const handleDeleteClick = async (pricingId) => {
    try {
      const response = await fetch(
        `${SummaryApi.deletePricing.url}/${pricingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete pricing");
      }

      setPricingList(
        pricingList.filter((pricing) => pricing.pricing_id !== pricingId)
      );
      toast.success("Pricing deleted successfully!");
    } catch (error) {
      toast.error(
        error.message || "Failed to delete pricing. Please try again."
      );
    }
  };

  // Define the columns for the DataTable
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Features",
      selector: (row) =>
        Array.isArray(JSON.parse(row.features))
          ? truncate(JSON.parse(row.features).join(";"), 50)
          : truncate(row.features, 50),
    },
    {
      name: "Excluded Features",
      selector: (row) =>
        Array.isArray(JSON.parse(row.excludedFeature))
          ? truncate(JSON.parse(row.excludedFeature).join(";"), 50)
          : truncate(row.excludedFeature, 50),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          onClick={() => handleUpdateClick(row)}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          onClick={() => handleDeleteClick(row.pricing_id)}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-5 overflow-hidden bg-gray-100 rounded shadow-lg pricing-list-container">
      <Toaster position="top-left" />
      <h1 className="mb-5 text-2xl font-bold">
        Pricing List for Corporate Banking Plan
      </h1>

      <button
        onClick={() => {
          setSelectedPricing(null);
          reset({
            // Reset the form fields to be empty
            name: "",
            price: "",
            duration: "",
            features: "",
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
          responsive
        />
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50 modal"
          open
        >
          <div className="relative modal-content bg-white text-black p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
              {selectedPricing ? "Update Pricing Plan" : "Add Pricing Plan"}
            </h2>
            <div className="absolute top-3 right-2">
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit(handlePricingSubmit)}
              className="space-y-6"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  {...register("price", { required: "Price is required" })}
                  id="price"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  id="duration"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="features"
                  className="block text-sm font-medium text-gray-700"
                >
                  Features (separated with semi-colon ;)
                </label>
                <textarea
                  {...register("features", {
                    required: "Features are required",
                  })}
                  id="features"
                  rows="3"
                  placeholder="Enter features separated by ; (e.g., Feature1; Feature2; Feature3)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="excludedFeature"
                  className="block text-sm font-medium text-gray-700"
                >
                  Excludedfeatures (separated with semi-colon ;)
                </label>
                <textarea
                  {...register("excludedFeature")}
                  id="excludedFeature"
                  placeholder="Enter excluded features separated by ; (e.g., Excluded1; Excluded2)"
                  rows="3"
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
                  {selectedPricing ? "Update Pricing Plan" : "Add Pricing Plan"}
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
