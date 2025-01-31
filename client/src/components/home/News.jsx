import { useEffect, useState } from "react";
import SummaryApi from "../../common";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const getNews = async () => {
    try {
      const response = await fetch(SummaryApi.GetAllNews.url);
      const textData = await response.text(); // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : []; // Parse only if data is not empty
      const sortedData = jsonData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setAllNews(sortedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getImages = async () => {
    try {
      const response = await fetch(SummaryApi.HomeNewsImage.url);
      const textData = await response.text(); // First, get the raw response as text
      const jsonData = textData ? JSON.parse(textData) : []; // Parse only if data is not empty
      setImageList(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateVisibleNewsCount = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setVisibleNewsCount(4);
    } else if (width >= 768) {
      setVisibleNewsCount(4);
    } else {
      setVisibleNewsCount(4);
    }
  };

  useEffect(() => {
    getNews();
    getImages();
    updateVisibleNewsCount();
    window.addEventListener("resize", updateVisibleNewsCount);

    return () => {
      window.removeEventListener("resize", updateVisibleNewsCount);
    };
  }, []);

  const ensureProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="relative grid grid-cols-1 md:gap-2 lg:gap-6 lg:grid-cols-2 py-5 text-black xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem] items-stretch">
        {/* Image Section */}
        <div className="flex items-stretch h-full">
          {imageList[0] && (
            <div key={imageList[0].image_id} className="flex-grow">
              <img
                src={imageList[0].image_data}
                alt="Corporate News"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          )}
        </div>

        {/* News Section */}
        <div className="flex flex-col justify-between h-full max-w-full gap-0 px-2">
          <p className="text-xl font-bold text-red-900 md:text-2xl">
            Corporate News
          </p>

          {/* News Articles */}
          {allNews.slice(0, visibleNewsCount).map((news, index) => (
            <div key={index} className="py-1 ">
              <a
                href={ensureProtocol(news.site)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold text-black underline md:text-base xl:text-lg hover:text-rose-900"
              >
                {news.title.length > 100
                  ? `${news.title.substring(0, 100)}...`
                  : news.title}
              </a>
              <p className="text-xs text-gray-600 md:text-base">
                {news.source}
              </p>
              <p className="text-sm text-gray-700 lg:text-base">
                {news.description.length > 300
                  ? `${news.description.substring(0, 300)}...`
                  : news.description}
              </p>
            </div>
          ))}

          <div className="mt-2">
            <a href="/media">
              <button className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-red-700">
                Read More{" "}
                <span className="text-base md:text-xl lg:text-2xl">+</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;