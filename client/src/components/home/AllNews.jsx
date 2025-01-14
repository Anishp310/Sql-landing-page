import { useEffect, useState } from "react";

// import Digijoon from "../../Assets/digijoon.png";

const AllNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6); // Items per page
  const [hoveredCard, setHoveredCard] = useState(null); // Track which card is hovered

  // Fetch news data from the API
  const fetchNews = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/getAllNews"
      ); // Replace with your API endpoint
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Pagination calculations
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(newsList.length / newsPerPage);

  // Helper to ensure URL includes a protocol
  const ensureProtocol = (url) =>
    /^https?:\/\//i.test(url) ? url : `http://${url}`;

  return (
    <div className="relative min-h-screen px-3 py-10 bg-center bg-cover md:px-6">
      <div
        className="absolute inset-0 bg-opacity-50"
        // style={{ backgroundImage: `url(${Digijoon})`, backgroundSize: "cover" }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto bg-white rounded-lg bg-opacity-80">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800 hover:text-red-800">
          Latest News
        </h1>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {currentNews.length > 0 ? (
            currentNews.map((news) => (
              <div
                key={news.news_id}
                className="relative p-5 transition-shadow duration-300 bg-white border rounded-lg shadow hover:shadow-lg"
                onMouseEnter={() => setHoveredCard(news.news_id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h2 className="mb-2 text-lg font-semibold text-red-800">
                  <a
                    href={ensureProtocol(news.site)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-bold text-red-900 underline hover:text-red-600"
                  >
                    {hoveredCard === news.news_id
                    ? news.title
                    : news.title.length > 100
                    ? `${news.title.substring(0, 100)}...`
                    : news.title}
                  
                  </a>
                </h2>
                <p className="mb-1 text-sm text-gray-500">{news.source}</p>
                <p className="text-gray-700">
                  {hoveredCard === news.news_id
                    ? news.description
                    : news.description.length > 250
                    ? `${news.description.substring(0, 250)}...`
                    : news.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No news available at the moment.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 border rounded ${
                currentPage === 1
                  ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                  : "text-red-600 bg-red-100 hover:bg-red-200 border-red-300"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 border rounded ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "text-red-600 bg-red-100 hover:bg-red-200 border-red-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                  : "text-red-600 bg-red-100 hover:bg-red-200 border-red-300"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNews;
