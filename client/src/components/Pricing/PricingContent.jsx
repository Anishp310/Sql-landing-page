import { useEffect, useState } from "react";

const PricingContent = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pricing data from the API
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch("https://fullstack-landing-page-1.onrender.com/pricing"); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch pricing plans");
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-600">Loading pricing plans...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">{error}</div>
    );
  }

  return (
    <div className="min-h-screen py-16 xl:mx-[10rem] lg:mx-[3rem]">
      <div className="container px-6 mx-auto">
        <h1 className="mb-8 text-5xl font-bold text-center text-red-700">
          Pricing Plans
        </h1>
        <p className="mb-12 text-center text-gray-600">
          Choose a plan that fits your needs. No hidden charges, cancel anytime.
        </p>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 justify-items-center lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-tl ${
                plan.isPopular
                  ? "from-red-600 to-red-500"
                  : "from-white to-gray-100 border"
              } rounded-xl shadow-xl p-4 flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-sm`}
            >
              {plan.isPopular && (
                <>
                  <div className="absolute top-0 px-3 py-1 text-xs font-bold text-white transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full left-1/2">
                    Popular
                  </div>
                  {/* Add Popular Heading */}
                  <h3 className="mt-4 text-xl font-semibold text-center text-yellow-400">
                    Popular Plan
                  </h3>
                </>
              )}
              <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700">
                {plan.name}
              </h2>
              <div className="mb-6 text-center">
                <span className="text-2xl font-bold text-red-700 md:text-3xl xl:text-4xl">
                  Rs.{plan.price}
                </span>
                <span className="text-gray-600"> / {plan.duration}</span>
              </div>
              <ul className="mb-6 space-y-2 text-gray-600">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Buy Now Button */}
              <button
                className={`w-full py-2 font-bold transition duration-300 ease-in-out rounded-lg ${
                  index === 0 || index === 2
                    ? "bg-white text-black border-2 border-gray-300 hover:bg-red-700 hover:text-white"
                    : "bg-green-600 text-white hover:bg-red-700"
                }`}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingContent;
