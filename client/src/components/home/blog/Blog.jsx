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
    
  return (
    
    <div>Blog</div>
  )
}

export default Blog