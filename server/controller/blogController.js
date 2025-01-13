import pool from "../db.js";
import multer from "multer";

// Configure multer to store files in memory with file type and size restrictions
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    // Check if the file is an image (jpeg, png, or gif)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});
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
  const { title, description } = req.body;
  const image_data = req.file ? req.file.buffer : null; // This will be the image buffer from multer

  // Validate the data
  const error = validateBlogData({ title, description, image_data });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Insert the blog post into the database, `created_at` will auto-set due to the timestamp
    const [newBlog] = await pool.query(
      "INSERT INTO blog (title, description, image_data) VALUES(?, ?, ?)",
      [title, description, image_data]
    );

    const [newBlogData] = await pool.query(
      "SELECT * FROM blog WHERE blog_id = LAST_INSERT_ID()"
    );
    res.status(201).json({
      message: "Blog created successfully",
      data: newBlogData[0],
    });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({
      message: "Server error, unable to create blog",
      error: error.message,
    });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  const { blog_id } = req.params;
  const { title, description } = req.body;
  const image_data = req.file ? req.file.buffer : null; // Image buffer from multer

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



// Get All Blogs
// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const [getAllBlogs] = await pool.query("SELECT * FROM blog");

    // Convert the image buffer to a base64 string
    getAllBlogs.forEach(blog => {
      if (blog.image_data) {
        blog.image_data = `data:image/jpeg;base64,${blog.image_data.toString('base64')}`;
      }
    });

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

// // Update Blog
// export const updateBlog = async (req, res) => {
//   const { blog_id } = req.params;
//   const { title, description, image_data } = req.body;

//   // Validate input data
//   const error = validateBlogData({ title, description, image_data });
//   if (error) {
//     return res.status(400).json({ message: error });
//   }

//   try {
//     const [updatedBlog] = await pool.query(
//       "UPDATE blog SET title = ?, description = ?, image_data = ? WHERE blog_id = ?",
//       [title, description, image_data, blog_id]
//     );

//     if (updatedBlog.affectedRows === 0) {
//       return res.status(404).json({
//         message: `Blog with ID ${blog_id} not found`,
//       });
//     }

//     // Fetch the updated blog post
//     const [blog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

//     res.status(200).json({
//       message: "Blog updated successfully",
//       data: blog[0],
//     });
//   } catch (error) {
//     console.error("Error updating blog:", error.message);
//     res.status(500).json({
//       message: "Server error, unable to update blog",
//       error: error.message,
//     });
//   }
// };

// Delete Blog
export const deleteBlog = async (req, res) => {
  const { blog_id } = req.params;

  if (!blog_id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    // Fetch the blog before deleting (check if blog exists)
    const [blog] = await pool.query("SELECT * FROM blog WHERE blog_id = ?", [blog_id]);

    // Ensure the blog exists before attempting deletion
    if (!blog || blog.length === 0) {
      return res.status(404).json({
        message: `Blog with ID ${blog_id} not found`,
      });
    }

    // Proceed to delete the blog
    await pool.query("DELETE FROM blog WHERE blog_id = ?", [blog_id]);

    res.status(200).json({
      message: "Blog deleted successfully",
      data: blog[0],  // Return the deleted blog data
    });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete blog",
      error: error.message,
    });
  }
};



