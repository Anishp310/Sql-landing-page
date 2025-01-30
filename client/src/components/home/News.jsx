import SummaryApi from "../../common";
import { useEffect, useState } from "react";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const getNews = async () => { 
    try {
      const response = await fetch(SummaryApi.GetAllNews.url);
      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      const sortedData = jsonData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAllNews(sortedData);
    } catch (error) {
      console.log(error.message);         
    }
  };
  const getImages = async () => {
    try {
      const response = await fetch(SummaryApi.HomeNewsImage.url);
      const textData = await response.text();  // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
      setImageList(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateVisibleNewsCount = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setVisibleNewsCount(4); // For `xl` size
    } else if (width >= 768) {
      setVisibleNewsCount(4); // For `md` size
    } else {
      setVisibleNewsCount(4); // For `sm` size
    }
  };

  useEffect(() => {
    getNews();
    getImages();

    // Set initial count
    updateVisibleNewsCount();

    // Update count on resize
    window.addEventListener("resize", updateVisibleNewsCount);

    return () => {
      window.removeEventListener("resize", updateVisibleNewsCount);
    };
  }, []);

  // Function to ensure the URL includes a protocol
  const ensureProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`; // Add http:// if no protocol is present
    }
    return url; // Return URL as is if it already contains http:// or https://
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="relative grid grid-cols-1 md:gap-2 lg:gap-4 md:grid-cols-2 py-5 text-black xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
        {/* Image Section */}
        <div className="">
          {imageList[0] && (
            <div key={imageList[0].image_id} className="">
              <img
                src={imageList[0].image_data} // Assuming image_data is a valid URL or base64 string
                alt="Corporate News"
                className="w-full rounded-lg object-cover h-[250px] sm:h-[300px] lg:h-[1000px] xl:h-[900px] md:h-[900px] "
              />
            </div>
          )}
        </div>

        {/* News Section */}
        <div className="max-w-full lg:h-[950px] xl:h-[865px] md:h-[820px] overflow-hidden px-2">
          <p className="mb-2 text-xl font-bold text-red-900 lg:mb-5 md:text-2xl">
            Corporate News
          </p>

          {/* Articles Section - Only Display 3 News */}
          {allNews.slice(0, visibleNewsCount).map((news, index) => (
            <div className="mt-2 lg:mt-6 xl:mt-3" key={index}>
              {/* External link using <a> */}
              <a
                href={ensureProtocol(news.site)} // Ensure the URL has the protocol
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold text-black underline decoration-1 lg:text-base xl:text-lg hover:text-rose-700"
              >
              {news.title.length > 100
                  ? `${news.title.substring(0, 100)}...` // Truncate to 100 characters
                  : news.title}
                
              </a>
              <p className="mt-1 text-sm text-gray-600 lg:mt-2 xl:mt-1 lg:text-lg ">
                {news.source}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-justify text-gray-700 lg:mt-3 xl:mt-3 lg:text-sm">
                {news.description.length > 300
                  ? `${news.description.substring(0, 300)}...` // Truncate to 350 characters
                  : news.description}
              </p>
            </div>
          ))}

          <div className="xl:mt-[2rem] lg:mt-[1.5rem] md:mt-3 mt-[1rem] ">
            <a href="/media">
              <button className="px-4 py-2 text-base text-center text-white transition duration-200 bg-green-500 rounded-full md:py-1 lg:px-6 lg:text-lg hover:bg-red-700 md:px-4 md:text-base lg:py-2">
                Read More <span className="text-base md:text-xl lg:text-2xl">+</span>   
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
