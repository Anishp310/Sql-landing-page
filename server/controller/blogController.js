import pool from "../db.js";

// Helper function for validation
const validateBlogData = (data) => {
  const { title, description, image_data } = data;

  if (!title || title.trim() === "") {
    return "Title is required";
  }
  if (!description || description.trim() === "") {
    return "Description is required";
  }
  if (image_data && !Buffer.isBuffer(image_data)) {
    return "Image data must be in valid binary format";
  }

  return null;
};

// Create Blog
export const createBlog = async (req, res) => {
  const { title, description, image_data } = req.body;

  // Validate input data
  const error = validateBlogData({ title, description, image_data });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Insert blog post into database
    await pool.query(
      "INSERT INTO blog (title, description, image_data) VALUES(?, ?, ?)",
      [title, description, image_data]
    );

    // Fetch the inserted blog post
    const [newBlog] = await pool.query(
      "SELECT * FROM blog WHERE blog_id = LAST_INSERT_ID()"
    );

    res.status(201).json({
      message: "Blog created successfully",
      data: newBlog[0],
    });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({
      message: "Server error, unable to create blog",
      error: error.message,
    });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const [getAllBlogs] = await pool.query("SELECT * FROM blog");
    res.status(200).json(getAllBlogs);
  } catch (error) {
    console.error("Error retrieving blogs:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve blogs",
      error: error.message,
    });
  }
};

// Get Single Blog
export const getBlog = async (req, res) => {
  const { blog_id } = req.params;

  if (!blog_id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    const [gBlog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    if (gBlog.length === 0) {
      return res.status(404).json({
        message: `Blog with ID ${blog_id} not found`,
      });
    }

    res.status(200).json(gBlog[0]);
  } catch (error) {
    console.error("Error retrieving blog:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve blog",
      error: error.message,
    });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  const { blog_id } = req.params;
  const { title, description, image_data } = req.body;

  // Validate input data
  const error = validateBlogData({ title, description, image_data });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedBlog] = await pool.query(
      "UPDATE blog SET title = ?, description = ?, image_data = ? WHERE blog_id = ?",
      [title, description, image_data, blog_id]
    );

    if (updatedBlog.affectedRows === 0) {
      return res.status(404).json({
        message: `Blog with ID ${blog_id} not found`,
      });
    }

    // Fetch the updated blog post
    const [blog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    res.status(200).json({
      message: "Blog updated successfully",
      data: blog[0],
    });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({
      message: "Server error, unable to update blog",
      error: error.message,
    });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  const { blog_id } = req.params;

  if (!blog_id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    // Fetch the blog before deleting
    const [blog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    if (blog.length === 0) {
      return res.status(404).json({
        message: `Blog with ID ${blog_id} not found`,
      });
    }

    // Delete the blog
    await pool.query("DELETE FROM blog WHERE blog_id = ?", [blog_id]);

    res.status(200).json({
      message: "Blog deleted successfully",
      data: blog[0],
    });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete blog",
      error: error.message,
    });
  }
};
