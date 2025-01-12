import { useEffect, useState } from "react";

const StaticPopularPricingPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("Corporate Banking Plan");
  const [data, setData] = useState([]);
  
  const bankingPlanText = [{text: "Best for service-based businesses that require basic accounting"},
    {text: "Best for service-based businesses that require basic accounting2"},
    {text: "Best for service-based businesses that require basic accounting3"}

  ]

  useEffect(() => {
    // Fetch data based on the selected plan
    const fetchData = async () => {
      const endpoint =
        selectedPlan === "Corporate Banking Plan"
          ? "http://localhost:8080/pricing"
          : "http://localhost:8080/pricing1";

      try {
        const response = await fetch(endpoint);
        const textData = await response.text(); // First, get the raw response as text
        const jsonData = textData ? JSON.parse(textData) : []; // Parse only if data is not empty
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPlan]);

  return (
    <div className="min-h-screen xl:px-4 py-16 xl:mx-[10rem] lg:mx-[3rem]">
      <div className="mx-auto text-center max-w-7xl">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Choose Your <span className="text-red-600">Pricing Plan</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Select a plan that suits your business needs.
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <div className="relative">
          <button
            className={`px-6 py-3 relative font-semibold focus:outline-none transition-opacity duration-200 ${
              selectedPlan === "Corporate Banking Plan"
                ? "opacity-80 bg-red-200 text-black shadow-lg hover:bg-red-200"
                : "opacity-30 bg-red-200 text-black hover:opacity-45"
            }`}
            onClick={() => setSelectedPlan("Corporate Banking Plan")}
          >
            Corporate Banking Plan
          </button>
          {selectedPlan === "Corporate Banking Plan" && (
            <hr className="absolute bottom-0 left-0 border-b-2 border-red-500 mt-1 w-full opacity-40" />
          )}
        </div>
        <div className="relative">
          <button
            className={`px-6 py-3 relative font-semibold focus:outline-none transition-opacity duration-200 ${
              selectedPlan === "Trading Plan"
                ? "opacity-80 bg-red-200 text-black shadow-lg hover:bg-red-200"
                : "opacity-30 bg-red-200 text-black hover:opacity-45"
            }`}
            onClick={() => setSelectedPlan("Trading Plan")}
          >
            Trading Plan
          </button>
          {selectedPlan === "Trading Plan" && (
            <hr className="absolute bottom-0 left-0 border-b-2 border-red-500 mt-1 w-full opacity-40" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {data.length > 0 ? (
          data.map((plan, index) => {
            const isPopularPlan = index === 1; // Highlight the second plan
            return (
              <div
                key={index}
                className={`relative bg-gradient-to-tl ${
                  isPopularPlan
                    ? "from-white to-gray-200 border"
                    : "from-white to-gray-100 border"
                } rounded-xl shadow-xl p-4 flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-sm`}
              >
                {isPopularPlan && (
                  <div className="absolute top-0 px-3 py-1 text-xs font-bold text-white transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full left-1/2">
                    Most Value Plan
                  </div>
                )}
                <h2 className="mb-4 text-2xl font-semibold text-red-700">
                  {plan.name}
                </h2>
                <p className="mb-2">
                  Best for service-based businesses that require basic
                  accounting
                </p>
                <div className="mb-6">
                  <span className="text-2xl font-bold text-red-700 md:text-3xl xl:text-4xl">
                    Rs.{plan.price}
                  </span>
                  <span className="text-gray-600"> / {plan.duration}</span>
                </div>
                <button className="border-2 border-red-500 p-4 mx-5 mb-2 hover:bg-red-700 hover:text-white">
                  <span>Get Started</span>
                </button>
                <ul className="space-y-2 text-gray-600">
  {plan.features &&
    JSON.parse(plan.features).map((feature, i) => (
      <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
        <svg
          className="w-5 h-5 text-red-500 flex-shrink-0"
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
<ul className="space-y-2 text-gray-600 mt-2">
  {(() => {
    try {
      const features =
        plan?.excludedFeature && plan.excludedFeature.trim() !== ""
          ? JSON.parse(plan.excludedFeature)
          : [];
      return features.map((feature, i) => (
        <li
          key={i}
          className="flex items-start space-x-2 text-sm text-gray-700"
        >
          <svg
            className="w-5 h-5 text-red-500 flex-shrink-0"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.293 4.293a1 1 0 011.414 0L10 7.586l2.293-2.293a1 1 0 111.414 1.414L11.414 9l2.293 2.293a1 1 0 11-1.414 1.414L10 10.414l-2.293 2.293a1 1 0 11-1.414-1.414L8.586 9 6.293 6.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>{feature}</span>
        </li>
      ));
    } catch (error) {
      console.error("Error parsing excludedFeature:", error);
      return (
        <p className="text-gray-500 text-sm">
          Invalid feature data.
        </p>
      );
    }
  })()}
</ul>

                <button
                  className={`mt-6 w-full py-2 font-bold transition duration-300 ease-in-out rounded-lg ${
                    isPopularPlan
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-white text-black border-2 border-gray-300 hover:bg-red-700 hover:text-white"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-lg text-gray-600">Loading plans...</p>
        )}
      </div>
    </div>
  );
};

export default StaticPopularPricingPlan;
