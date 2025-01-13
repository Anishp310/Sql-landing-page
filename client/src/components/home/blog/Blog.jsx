import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topPosts, setTopPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch blog data
  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/blogs');
      const jsonData = await response.json();
      const sortedData = jsonData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log(sortedData)
      setBlogList(sortedData);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get the top 5 most clicked blogs from the backend
  const getTopPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/blogs/top-clicked');
      const topBlogs = await response.json();
      console.log(topBlogs)
      setTopPosts(topBlogs);
    } catch (error) {
      console.error("Failed to fetch top blogs:", error);
    }
  };

  // Handle blog click: increment the click count on the backend
  const handleBlogClick = async (post) => {
    try {
      // Update the click count for the blog on the backend
      await fetch(`http://localhost:8080/blogs/${post.blog_id}/click`, { method: 'PATCH' });

      // Navigate to the blog detail page
      navigate(`/blog/${post.blog_id}`, { state: post });
    } catch (error) {
      console.error("Failed to update click count:", error);
    }
  };

  useEffect(() => {
    getBlogs();
    getTopPosts();  // Fetch the top 5 clicked blogs
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Blog Posts Section */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-3xl font-bold">Discover Our Latest Posts</h2>
          <div className="space-y-8">
            {blogList.map((post) => (
              <div
                key={post.blog_id}
                className="flex flex-col items-start gap-4 pb-4 border-b md:flex-row"
              >
                <img
                  src={post.image_data}
                  alt={post.title}
                  className="object-cover w-full rounded-lg md:w-1/3"
                />
                <div>
                  <h3
                    className="text-xl font-bold cursor-pointer text-blue-600"
                    onClick={() => handleBlogClick(post)}
                  >
                    {post.title}
                  </h3>
                  <p className="my-2 text-gray-600">{post.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>John Wick</span>
                    <span className="mx-2">|</span>
                    <span>{post.created_at.replace("T", " ").split(".")[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Top Posts */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Top Posts</h3>
            <ul className="space-y-2">
              {topPosts?.map((post) => (
                <li key={post.blog_id} className="flex items-center gap-2">
                 <img src={post.image_data} alt="" className="rounded-full w-8 h-8 " />
                  <span>{post.title}</span>
                  <h2></h2>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-xl text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-xl text-blue-700">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-xl text-pink-500">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
