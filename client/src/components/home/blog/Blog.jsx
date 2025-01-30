import Slider from "react-slick";
import SummaryApi from "../../../common";
import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { abanner } from "../../../Assets";

const Blog = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topPosts, setTopPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Fetch blog data
  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.Blog.url);
      const jsonData = await response.json();
      const sortedData = jsonData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setBlogList(sortedData);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTopPosts = async () => {
    try {
      const response = await fetch(SummaryApi.Blogs_top_clicked.url);
      const topBlogs = await response.json();
      setTopPosts(topBlogs);
    } catch (error) {
      console.error("Failed to fetch top blogs:", error);
    }
  };

  const handleBlogClick = async (post) => {
    try {
      await fetch(`${SummaryApi.Blog.url}/${post.blog_id}/click`, {
        method: "PATCH",
      });
      navigate(`/blog/${post.blog_id}`, { state: post });
    } catch (error) {
      console.error("Failed to update click count:", error);
    }
  };

  useEffect(() => {
    getBlogs();
    getTopPosts();
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogList.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogList.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div>
        <div className="relative md:h-[200px] text-white overflow-hidden">
          <img src={abanner} alt="Banner" className="object-left-top w-full" />
          <div className="absolute lg:top-[40%] xl:left-[20%] lg:left-[15%] md:top-[30%] left-[0%] top-[25%] md:text-4xl 4k:left-[28%]">
            <div className="flex items-center">
              <hr className="rotate-90 w-[80px] border-white border-1" />
              <div>
                <p className="mt-2 text-sm md:text-lg">
                  Engaging Content & Brand Growth
                </p>
                <p className="text-2xl font-semibold md:text-4xl">Blog</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
          <div className="block lg:hidden mt-[2rem] md:mx-0 mx-[1rem]">
            <h3 className="text-lg font-bold md:text-2xl">Top Posts</h3>
            <Slider {...settings}>
              {topPosts?.map((post) => (
                <div key={post.blog_id} className="gap-4 border-b">
                  <div className="flex items-center gap-4 pt-2 pb-4">
                    <div className="w-16 h-16 mb-2 overflow-hidden md:w-[12rem] md:h-[5rem]">
                      <img
                        src={post.image_data}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <div>
                      <span className="p-2 text-base font-medium text-justify">
                        {post.title}
                      </span>
                      <div className="hidden px-2 md:block">
                        <p className="my-2 text-sm text-justify text-gray-600 lg:text-lg md:text-base">
                          {post.description.length > 300
                            ? `${post.description.substring(0, 150)}...`
                            : post.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>
                            {new Intl.DateTimeFormat("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(post.created_at))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="grid grid-cols-1 lg:gap-8 lg:grid-cols-3 mt-[2rem] md:mx-0 mx-[1rem]">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-[1.75rem] font-bold md:mb-8 md:text-3xl lg:text-4xl">
                Discover Our Latest Posts
              </h2>
              <div className="space-y-8">
                {currentPosts.map((post) => (
                  <div
                    key={post.blog_id}
                    className="flex flex-col items-start gap-4 pb-4 border-b md:flex-row"
                  >
                    <div className="md:w-[800px] md:h-[200px] w-[300px] h-[200px] ">
                      <img
                        src={post.image_data}
                        alt={post.title}
                        className="object-fill w-full h-full rounded-lg md:object-cover"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-black cursor-pointer lg:text-xl md:text-lg"
                        onClick={() => handleBlogClick(post)}
                      >
                        {post.title}
                      </h3>
                      <p className="my-2 text-sm text-justify text-gray-600 lg:text-lg md:text-base">
                        {post.description.length > 300
                          ? `${post.description.substring(0, 300)}...`
                          : post.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>
                          {new Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(post.created_at))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  {currentPage > 1 && (
                    <button
                      className="px-4 py-2 mx-1 bg-gray-200 border rounded"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      <GrPrevious />
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 mx-1 border rounded ${
                        currentPage === index + 1
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      className="px-4 py-2 mx-1 bg-gray-200 border rounded"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      <GrNext />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="hidden lg:block">
                <h3 className="mb-4 text-lg font-bold">Top Posts</h3>
                <ul className="space-y-2">
                  {topPosts?.map((post) => (
                    <li
                      key={post.blog_id}
                      className="flex items-center gap-2 border-b"
                    >
                      <img
                        src={post.image_data}
                        alt=""
                        className="w-8 h-8 mb-2 rounded-full"
                      />
                      <span
                        className="mb-2 cursor-pointer"
                        onClick={() => handleBlogClick(post)}
                      >
                        {post.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-xl text-blue-500"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="text-xl text-blue-700"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="text-xl text-pink-500"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
