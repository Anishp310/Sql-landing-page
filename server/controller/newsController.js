import pool from "../db.js";

// Helper function for validation
const validateNewsData = (data) => {
  const { title, site, description, source } = data;

  if (!title || title.trim() === "") {
    return "Title is required";
  }

  if (!description || description.trim() === "") {
    return "Description is required";
  }

  if (!source || source.trim() === "") {
    return "Source is required";
  }

  // Optionally, validate title and description lengths
  if (title.length > 255) {
    return "Title should not exceed 255 characters";
  }

  if (description.length > 2000) {
    return "Description should not exceed 2000 characters";
  }

  return null;
};

// Create News
export const createNews = async (req, res) => {
  try {
    const { title, site, description, source } = req.body;

    // Validate input data
    const error = validateNewsData({ title, site, description, source });
    if (error) {
      return res.status(400).json({ message: error });
    }

    // Insert news into the database
    await pool.query(
      "INSERT INTO news (title, site, description, source) VALUES (?, ?, ?, ?)",
      [title, site, description, source]
    );

    // Fetch the inserted row to return
    const [newNews] = await pool.query(
      "SELECT * FROM news WHERE news_id = LAST_INSERT_ID()"
    );

    res.status(201).json({
      message: "News created successfully",
      data: newNews[0],
    });
  } catch (error) {
    console.error("Error creating news:", error.message);
    res.status(500).json({
      message: "Server error, unable to create news",
      error: error.message,
    });
  }
};

// Get All News
export const getAllNews = async (req, res) => {
  try {
    const [getAllNews] = await pool.query("SELECT * FROM news");
    res.status(200).json(getAllNews);
  } catch (error) {
    console.error("Error retrieving all news:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve all news",
      error: error.message,
    });
  }
};

// Get Single News
export const getNews = async (req, res) => {
  const { news_id } = req.params;

  if (!news_id) {
    return res.status(400).json({ message: "News ID is required" });
  }

  try {
    const [gNews] = await pool.query("SELECT * FROM news WHERE news_id = ?", [news_id]);

    if (gNews.length === 0) {
      return res.status(404).json({
        message: `News with ID ${news_id} not found`,
      });
    }

    res.status(200).json(gNews[0]);
  } catch (error) {
    console.error("Error retrieving news:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve news",
      error: error.message,
    });
  }
};

// Update News
export const UpdateNews = async (req, res) => {
  const { news_id } = req.params;
  const { title, site, description, source } = req.body;

  // Validate input data
  const error = validateNewsData({ title, site, description, source });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedNews] = await pool.query(
      "UPDATE news SET title = ?, site = ?, description = ?, source = ? WHERE news_id = ?",
      [title, site, description, source, news_id]
    );

    if (updatedNews.affectedRows === 0) {
      return res.status(404).json({
        message: `News with ID ${news_id} not found`,
      });
    }

    // Fetch the updated row
    const [news] = await pool.query("SELECT * FROM news WHERE news_id = ?", [news_id]);

    res.status(200).json({
      message: "News updated successfully",
      data: news[0],
    });
  } catch (error) {
    console.error("Error updating news:", error.message);
    res.status(500).json({
      message: "Server error, unable to update news",
      error: error.message,
    });
  }
};

// Delete News
export const DeleteNews = async (req, res) => {
  const { news_id } = req.params;

  if (!news_id) {
    return res.status(400).json({ message: "News ID is required" });
  }

  try {
    // Fetch the row before deleting
    const [news] = await pool.query("SELECT * FROM news WHERE news_id = ?", [news_id]);

    if (news.length === 0) {
      return res.status(404).json({
        message: `News with ID ${news_id} not found`,
      });
    }

    // Delete the row
    await pool.query("DELETE FROM news WHERE news_id = ?", [news_id]);

    res.status(200).json({
      message: "News deleted successfully",
      data: news[0],
    });
  } catch (error) {
    console.error("Error deleting news:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete news",
      error: error.message,
    });
  }
};
