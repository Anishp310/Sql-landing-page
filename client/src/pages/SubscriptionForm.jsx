import PricingCoverPage from "../components/Pricing/PricingCoverPage";
import SummaryApi from "../common";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const SubscriptionForm = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const subscriptionData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
    };

    try {
      const response = await fetch(SummaryApi.createSubscription.url, {
        method: "POST",
        body: JSON.stringify(subscriptionData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Subscription created successfully!");
        reset({
          name: "",
          email: "",
          phone: "",
          type: "",
        });
      } else {
        toast.error(result.message || "Failed to create subscription.");
      }
    } catch (error) {
      toast.error("Error while submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const getPricingtrading = async () => {
    try {
      const response = await fetch(SummaryApi.tradingPricing_List.url);
      const jsonData = await response.json();
      const tradingOptions = jsonData.map((item) => `trading-${item.name}`);
      setDropdownData((prevData) => [
        ...new Set([...prevData, ...tradingOptions]),
      ]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getPricingbanking = async () => {
    try {
      const response = await fetch(SummaryApi.Pricing_List.url);
      const jsonData = await response.json();
      const bankingOptions = jsonData.map((item) => `banking-${item.name}`);
      setDropdownData((prevData) => [
        ...new Set([...prevData, ...bankingOptions]),
      ]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPricingtrading();
    getPricingbanking();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">
    
    <PricingCoverPage/>
      <Toaster position="top-right" />
      <div className="flex justify-center py-5">
        <div className="px-4 my-4 lg:mt-0">
          <h2 className="mb-6 text-lg font-bold lg:text-2xl md:text-xl">Create Subscription</h2>
          <p className="mb-6">Fill out the form below to create your subscription.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">Name is required</span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="text-sm text-red-500">Phone is required</span>
              )}
            </div>

            {/* Subscription Type */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register("type", { required: true })}
              >
                <option value="">Select Subscription Type *</option>
                {dropdownData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.type && (
                <span className="text-sm text-red-500">Subscription type is required</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-red-900 rounded-md hover:bg-blue-200 hover:text-black focus:outline-none"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Create Subscription"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
