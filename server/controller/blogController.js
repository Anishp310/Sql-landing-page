import multer from "multer";
import pool from "../db.js";
import slugify from "slugify";

// Configure multer to store files in memory with file type and size restrictions
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Helper function for validation
const validateBlogData = (data) => {
  const { title, description, image_data } = data;
  if (!title?.trim()) return "Title is required";
  if (!description?.trim()) return "Description is required";
  if (image_data && !Buffer.isBuffer(image_data)) return "Invalid image data";
  return null;
};

// Create Blog
export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  const image_data = req.file ? req.file.buffer : null;
  const slug = slugify(title, { lower: true, strict: true });

  const error = validateBlogData({ title, description, image_data });
  if (error) return res.status(400).json({ message: error });

  try {
    const [result] = await pool.query(
      "INSERT INTO blog (title, description, image_data, slug) VALUES (?, ?, ?, ?)",
      [title, description, image_data, slug]
    );

    const [newBlogData] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [result.insertId]);

    res.status(201).json({
      message: "Blog created successfully",
      data: newBlogData[0],
    });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  const { blog_id } = req.params;
  const { title, description } = req.body;
  const image_data = req.file ? req.file.buffer : null;

  if (!blog_id) return res.status(400).json({ message: "Blog ID is required" });

  try {
    const [existingBlog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    if (existingBlog.length === 0)
      return res.status(404).json({ message: `Blog with ID ${blog_id} not found` });

    const currentBlog = existingBlog[0];

    const updatedTitle = title || currentBlog.title;
    const updatedDescription = description || currentBlog.description;
    const updatedImageData = image_data || currentBlog.image_data;
    const updatedSlug = title ? slugify(title, { lower: true, strict: true }) : currentBlog.slug;

    const [updatedBlog] = await pool.query(
      "UPDATE blog SET title = ?, description = ?, image_data = ?, slug = ? WHERE blog_id = ?",
      [updatedTitle, updatedDescription, updatedImageData, updatedSlug, blog_id]
    );

    if (updatedBlog.affectedRows === 0)
      return res.status(500).json({ message: "Failed to update blog" });

    const [blog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    res.status(200).json({ message: "Blog updated successfully", data: blog[0] });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const [blogs] = await pool.query("SELECT * FROM blog");

    blogs.forEach((blog) => {
      if (blog.image_data) {
        blog.image_data = `data:image/jpeg;base64,${blog.image_data.toString("base64")}`;
      }
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving blogs:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  const { blog_id } = req.params;

  // Ensure blog_id is provided
  if (!blog_id)
    return res.status(400).json({ message: "Blog ID is required" });

  try {
    // Prepare the query to get the blog by ID
    const query = "SELECT * FROM blog WHERE blog_id = ?";
    const param = [blog_id];

    // Execute the query to retrieve the blog
    const [gBlog] = await pool.query(query, param);

    // Check if the blog was found
    if (gBlog.length === 0)
      return res.status(404).json({ message: "Blog not found" });

    const blog = gBlog[0];

    // If image_data exists, convert it to Base64 string
    if (blog.image_data) {
      blog.image_data = `data:image/jpeg;base64,${blog.image_data.toString("base64")}`;
    }

    // Return the blog data
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error retrieving blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Delete Blog
export const deleteBlog = async (req, res) => {
  const { blog_id } = req.params;

  if (!blog_id) return res.status(400).json({ message: "Blog ID is required" });

  try {
    const [blog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    if (!blog.length)
      return res.status(404).json({ message: `Blog with ID ${blog_id} not found` });

    await pool.query("DELETE FROM blog WHERE blog_id = ?", [blog_id]);

    res.status(200).json({ message: `Blog deleted successfully`, data: blog[0] });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBlog = async (req, res) => {
  const { slug } = req.params;

  if (!slug)
    return res.status(400).json({ message: "Slug is required" });

  try {
    const [gBlog] = await pool.query("SELECT * FROM blog WHERE slug = ?", [slug]);

    if (gBlog.length === 0)
      return res.status(404).json({ message: "Blog not found" });

    const blog = gBlog[0];

    if (blog.image_data) {
      blog.image_data = `data:image/jpeg;base64,${blog.image_data.toString("base64")}`;
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error retrieving blog:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
