import { useEffect, useState } from "react";

const News = () => {
  const [allNews, setAllNews] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const getNews = async () => { 
    try {
      const response = await fetch("http://localhost:8080/getAllNews");
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
      const sortedData = jsonData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setAllNews(sortedData);
    } catch (error) {
      console.log(error.message);         
    }
  };

  const getImages = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllImages");
      const textData = await response.text();
      const jsonData = textData ? JSON.parse(textData) : [];
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
    <div className="py-5 text-black xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
      <div className="grid grid-cols-1 md:gap-4 lg:grid-cols-2 items-stretch">
        {/* Image Section */}
        <div className="flex-1">
          {imageList[0] && (
            <div key={imageList[0].image_id} className="h-full">
              <img
                src={imageList[0].image_data}
                alt="Corporate News"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* News Section */}
        <div className="flex-1 overflow-hidden px-2 flex flex-col justify-between">
          <p className="mb-2 text-xl font-bold text-red-900 lg:mb-5 md:text-2xl">
            Corporate News
          </p>

          {allNews.slice(0, visibleNewsCount).map((news, index) => (
            <div className="mt-2 lg:mt-6 xl:mt-3" key={index}>
              <a
                href={ensureProtocol(news.site)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold text-justify text-black underline lg:text-base xl:text-lg hover:text-rose-700"
              >
                {news.title.length > 100 ? `${news.title.substring(0, 100)}...` : news.title}
              </a>
              <p className="mt-1 text-sm text-gray-600 lg:mt-2 xl:mt-1 lg:text-lg">
                {news.source}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-justify text-gray-700 lg:mt-3 xl:mt-3 lg:text-sm">
                {news.description.length > 300 ? `${news.description.substring(0, 300)}...` : news.description}
              </p>
            </div>
          ))}

          <div className="xl:mt-[2rem] lg:mt-[1.5rem] md:mt-3 mt-[1rem]">
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