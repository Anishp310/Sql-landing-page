import { useLocation } from "react-router-dom";

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state;

  if (!blog) {
    return <p>Blog data not found!</p>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-4xl font-bold">{blog.title}</h1>
      <img
        src={blog.image_data}
        alt={blog.title}
        className="object-cover w-[60%] h-[400px] mb-4 rounded-lg"
      />
      <p className="text-gray-600">{blog.description}</p>
      <div className="mt-4 text-sm text-gray-500">
        <span>John Wick</span>
        <span className="mx-2">|</span>
        <span>{blog.created_at.replace("T", " ").split(".")[0]}</span>
      </div>
    </div>
  );
};

export default BlogDetail;
