import pool from "../db.js";
import slugify from "slugify";

// Helper function for validation
const validateCareerData = (data) => {
  const { Title, JobType, ApplyBefore } = data;

  if (!Title || !JobType || !ApplyBefore) {
    return "Title, JobType, and ApplyBefore are required";
  }

  return null;
};

// Create Career
export const createCareer = async (req, res) => {
  const {
    JobType, Experience, Qualification, Category,
    Location, Title, ApplyBefore, Description,
    Salary, SkillsRequired, Responsibility
  } = req.body;

  // Validate input data
  const error = validateCareerData({ Title, JobType, ApplyBefore });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Insert into the career table without the slug
    const [insertResult] = await pool.query(
      `INSERT INTO career 
        (job_type, experience, qualification, category, location, title, apply_before, description, salary, skills_required, responsibility)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [JobType, Experience, Qualification, Category, Location, Title, ApplyBefore, Description, Salary, SkillsRequired, Responsibility]
    );

    // Get the career_id of the inserted row
    const careerId = insertResult.insertId;

    // Now generate the slug as career_id + Title
    const finalSlug = `${careerId}-${slugify(Title, { lower: true, strict: true })}`;

    // Update the career with the generated slug
    await pool.query("UPDATE career SET slug = ? WHERE career_id = ?", [finalSlug, careerId]);

    // Retrieve the newly created career data with the final slug
    const [createdCareer] = await pool.query("SELECT * FROM career WHERE career_id = ?", [careerId]);

    res.status(201).json({
      message: "Career created successfully",
      data: createdCareer[0],
    });
  } catch (error) {
    console.error("Error creating career:", error.message);
    res.status(500).json({
      message: "Server error, unable to create career",
      error: error.message,
    });
  }
};

// Update Career
export const updateCareer = async (req, res) => {
  const { career_id } = req.params;
  const {
    JobType, Experience, Qualification, Category,
    Location, Title, ApplyBefore, Description,
    Salary, SkillsRequired, Responsibility
  } = req.body;

  // Validate input data
  const error = validateCareerData({ Title, JobType, ApplyBefore });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Generate the slug as career_id + Title
    const slug = `${career_id}-${slugify(Title, { lower: true, strict: true })}`;

    // Update career data with the new slug
    const updatedCareer = await pool.query(
      `UPDATE career SET 
        job_type = ?, experience = ?, qualification = ?, 
        category = ?, location = ?, title = ?, apply_before = ?, 
        description = ?, salary = ?, skills_required = ?, responsibility = ?, slug = ?
        WHERE career_id = ?`, 
      [JobType, Experience, Qualification, Category, Location, Title, ApplyBefore, Description, Salary, SkillsRequired, Responsibility, slug, career_id]
    );

    if (updatedCareer.affectedRows === 0) {
      return res.status(404).json({ message: `Career with ID ${career_id} not found` });
    }

    // Retrieve the updated career data
    const [career] = await pool.query("SELECT * FROM career WHERE career_id = ?", [career_id]);

    res.status(200).json({
      message: "Career updated successfully",
      data: career[0],
    });
  } catch (error) {
    console.error("Error updating career:", error.message);
    res.status(500).json({
      message: "Server error, unable to update career",
      error: error.message,
    });
  }
};


// Get All Careers
export const getAllCareers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM career");  // Directly use pool.query() as it's promise-based
    res.status(200).json(rows);  // Send rows as the response
  } catch (error) {
    console.error("Error retrieving careers:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve careers",
      error: error.message,
    });
  }
};

// Get Single Career
export const getCareer = async (req, res) => {
  const { career_id } = req.params;

  if (!career_id) {
    return res.status(400).json({ message: "Career ID is required" });
  }

  try {
    const [career] = await pool.query("SELECT * FROM career WHERE career_id = ?", [career_id]);

    if (career.length === 0) {
      return res.status(404).json({ message: `Career with ID ${career_id} not found` });
    }

    res.status(200).json(career[0]);
  } catch (error) {
    console.error("Error retrieving career:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve career",
      error: error.message,
    });
  }
};



// Delete Career
export const deleteCareer = async (req, res) => {
  const { career_id } = req.params;

  if (!career_id) {
    return res.status(400).json({ message: "Career ID is required" });
  }

  try {
    // Check if the career exists before deletion
    const [deletedCareer] = await pool.query("SELECT * FROM career WHERE career_id = ?", [career_id]);

    if (deletedCareer.length === 0) {
      return res.status(404).json({ message: `Career with ID ${career_id} not found` });
    }

    // Delete the career from the database
    await pool.query("DELETE FROM career WHERE career_id = ?", [career_id]);

    res.status(200).json({
      message: "Career deleted successfully",
      data: deletedCareer[0],
    });
  } catch (error) {
    console.error("Error deleting career:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete career",
      error: error.message,
    });
  }
};
