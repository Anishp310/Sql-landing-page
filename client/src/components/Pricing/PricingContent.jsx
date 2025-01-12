import { useEffect, useState } from "react";

const PricingContent = () => {
  const [selectedPlan, setSelectedPlan] = useState("Corporate Banking Plan");
  const [data, setData] = useState([]);

  const bankingPlanText = [
    { text: "Best for service-based businesses that require basic accounting" },
    {
      text: "Best for service-based businesses that require basic accounting2",
    },
    {
      text: "Best for service-based businesses that require basic accounting3",
    },
  ];

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
    <div className="container px-4 py-8 mx-auto">
      <div className="mx-auto text-center max-w-7xl">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Choose Your <span className="text-red-600">Pricing Plan</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Select a plan that suits your business needs.
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <div className="relative">
          <button
            className={`px-4 py-2 relative font-semibold focus:outline-none transition-opacity duration-200 ${
              selectedPlan === "Corporate Banking Plan"
                ? " text-red-900 border-b-2 bg-slate-50"
                : ""
            }`}
            onClick={() => setSelectedPlan("Corporate Banking Plan")}
          >
            Corporate Banking Plan
          </button>
          {selectedPlan === "Corporate Banking Plan" && (
            <hr className="absolute bottom-0 left-0 w-full border-b-2 border-slate-900 " />
          )}
        </div>
        <div className="relative">
          <button
            className={`py-2 relative font-semibold focus:outline-none transition-opacity duration-200 px-4 ${
              selectedPlan === "Trading Plan"
                ? "text-red-900 border-b-2 bg-slate-50 "
                : ""
            }`}
            onClick={() => setSelectedPlan("Trading Plan")}
          >
            Trading Plan
          </button>
          {selectedPlan === "Trading Plan" && (
            <hr className="absolute bottom-0 left-0 w-full border-b-2 border-slate-900 " />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 my-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {data.length > 0 ? (
          data.map((plan, index) => {
            const isPopularPlan = index === 1;
            return isPopularPlan ? (
              <div
                key={index}
                className="border border-red-900 rounded-lg bg-red-50"
              >
                <div className="text-white bg-red-900 rounded-t-lg ">
                  <h1 className="p-4 text-2xl">Most Value</h1>
                </div>
                <div className="p-6">
                  {/* Card Content */}
                  <h2 className="my-4 text-2xl font-semibold text-slate-900">
                    {plan.name}
                  </h2>
                  <p className="mb-2">
                    Best for service-based businesses that require basic
                    accounting
                  </p>

                  <div className="my-6 text-4xl font-semibold text-gray-800">
                    {plan.price} / {plan.duration}
                  </div>
                  <button className="w-full px-4 py-2 mb-4 font-semibold text-white bg-red-900 border-2 border-red-900 rounded">
                    Get Started
                  </button>
                  <ul className="space-y-2 text-slate-900">
                    {plan.features &&
                      JSON.parse(plan.features).map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-2 text-sm text-slate-900"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-green-900"
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
                  <ul className="mt-2 space-y-2 text-slate-900">
                    {(() => {
                      try {
                        const features =
                          plan?.excludedFeature &&
                          plan.excludedFeature.trim() !== ""
                            ? JSON.parse(plan.excludedFeature)
                            : [];
                        return features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start space-x-2 text-sm text-slate-900"
                          >
                            <svg
                              className="flex-shrink-0 w-5 h-5 text-red-900"
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
                          <p className="text-sm text-slate-900">
                            Invalid feature data.
                          </p>
                        );
                      }
                    })()}
                  </ul>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="p-6 mt-[4rem] bg-white border rounded-lg "
              >
                {/* Card Content */}
                <h2 className="my-4 text-2xl font-semibold text-slate-900">
                  {plan.name}
                </h2>
                <p className="mb-2 text-slate-900">
                  Best for service-based businesses that require basic
                  accounting
                </p>
                <div className="my-6 text-4xl font-semibold text-gray-800">
                  {plan.price} / {plan.duration}
                </div>

                <button className="w-full px-4 py-2 mb-4 font-semibold text-red-900 border-2 border-red-900 rounded ">
                  Get Started
                </button>
                <ul className="space-y-2 text-red-900">
                  {plan.features &&
                    JSON.parse(plan.features).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-2 text-sm text-slate-900"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-900"
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
                <ul className="mt-2 space-y-2 text-gray-600">
                  {(() => {
                    try {
                      const features =
                        plan?.excludedFeature &&
                        plan.excludedFeature.trim() !== ""
                          ? JSON.parse(plan.excludedFeature)
                          : [];
                      return features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-2 text-sm text-slate-900"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-red-900"
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
                        <p className="text-sm text-slate-900">
                          Invalid feature data.
                        </p>
                      );
                    }
                  })()}
                </ul>
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

export default PricingContent;
