import { useEffect, useState } from "react";

const Blog = () => {
    const [blogList, setBlogList] = useState([]);
      const [loading, setLoading] = useState(false);
    
    const getBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/blogs');
        const jsonData = await response.json();
        console.log(jsonData)
        setBlogList(jsonData);
      } catch (error) {
        toast.error("Failed to fetch blogs.");
      } 
    };
      useEffect(() => {
        getBlogs();
      }, []);


      const posts = [
        {
          id: 1,
          title: "How to... Host the best New Year's event",
          description:
            "We're listed top of Google for over 40k keywords and rank for over 280k which means more customers can find our website and your...",
          author: "Ryan Mooss",
          date: "29th Nov 2022",
          image: "path-to-image-1.jpg", // Replace with actual image path
        },
        {
          id: 2,
          title: "How to... List a screening event for the 2022 World Cup final",
          description:
            "The 2022 FIFA World Cup is in full swing, with brands across the country organising events, fan zones and fan parks so people can...",
          author: "Ryan Mooss",
          date: "29th Nov 2022",
          image: "path-to-image-2.jpg", // Replace with actual image path
        },
        {
          id: 3,
          title: "How to... Use content to get your events seen",
          description: "Get tips to promote your events effectively and ensure...",
          author: "Ryan Mooss",
          date: "29th Nov 2022",
          image: "path-to-image-3.jpg", // Replace with actual image path
        },
      ];
    
      const topPosts = [
        "Post-Event Survey Questions",
        "Welcome To Skiddle",
        "How to... Put on your own festival",
        "Everything you need to know about... Remittance",
        "How to... Sell tickets on your website",
      ];
    
  return (
    <div className="container px-4 py-8 mx-auto">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Blog Posts Section */}
      <div className="lg:col-span-2">
        <h2 className="mb-4 text-3xl font-bold">Discover Our Latest Posts</h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-start gap-4 pb-4 border-b md:flex-row"
            >
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full rounded-lg md:w-1/3"
              />
              <div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="my-2 text-gray-600">{post.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">|</span>
                  <span>{post.date}</span>
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
            {topPosts.map((post, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-8 h-8 bg-gray-200 rounded-lg"></span>
                <span>{post}</span>
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
  )
}

export default Blog


