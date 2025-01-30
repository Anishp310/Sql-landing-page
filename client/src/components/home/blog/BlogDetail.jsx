import React from "react";
import Slider from "react-slick";
import SummaryApi from "../../../common";
import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { abanner } from "../../../Assets";

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state;
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getTopPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.Blogs_top_clicked.url);
      if (!response.ok) throw new Error("Failed to fetch top blogs");
      const topBlogs = await response.json();
      setTopPosts(topBlogs);
    } catch (error) {
      setError("Unable to load top posts. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
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
    getTopPosts();
  }, []);

  if (!blog) {
    return <p>Blog data not found!</p>;
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="relative md:h-[200px] text-white overflow-hidden">
        <img
          src={abanner}
          alt="Blog Banner"
          className="object-left-top w-full"
        />
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
      <div className="max-w-[1600px] mx-auto">
        {/* Content Section */}
        <div className="mb-6 xl:mx-[10rem] lg:mx-[3rem] md:mx-[2.5rem] mx-[1rem]">
          {/* Top Posts Carousel */}
          <div className="mt-[2rem] md:mx-0 mx-[1rem]">
            <h3 className="mb-2 text-lg font-bold md:text-2xl">Top Posts</h3>
            {loading && <p>Loading top posts...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <Slider {...settings}>
                {topPosts?.map((post) => (
                  <div key={post.blog_id} className="px-4 border-b">
                    <div className="flex items-center gap-4 pt-2 pb-4">
                      <div className="w-16 h-16 mb-2 overflow-hidden">
                        <img
                          src={post.image_data}
                          alt={post.title}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div className="flex-col">
                        <span
                          className="text-base font-medium text-justify cursor-pointer"
                          onClick={() => handleBlogClick(post)}
                        >
                          {post.title.length > 30
                            ? `${post.title.substring(0, 40)}...`
                            : post.title}
                        </span>
                        <br />
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
              </Slider>
            )}
          </div>

          {/* Blog Details */}
          <div className="lg:mt-[4rem] md:mt-[3rem] mt-[2rem] clearfix">
            <h1 className="mb-8 font-bold lg:text-4xl md:text-3xl">
              {blog.title}
            </h1>

            <div className="relative">
              <div className="flex justify-center w-full mb-4 mr-4 image-wrapper md:float-left md:w-1/3 md:mb-0">
                <img
                  src={blog.image_data}
                  alt={blog.title}
                  className="object-cover w-full h-auto rounded-md"
                />
              </div>

              <div className="text-content">
                {(() => {
                  const paragraphs = blog.description.split("\n");

                  return paragraphs
                    .filter((paragraph) => paragraph.trim() !== "")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="mb-2 text-sm text-justify text-gray-800 md:text-base lg:text-lg"
                      >
                        {paragraph.trim()}
                      </p>
                    ));
                })()}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(blog.created_at))}
              </span>
            </div>

            {/* Social Sharing */}
            <div className="flex gap-4 mt-4">
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={`https://linkedin.com/shareArticle?url=${window.location.href}&title=${blog.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
