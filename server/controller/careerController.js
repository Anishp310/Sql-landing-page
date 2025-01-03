import pool from "../db.js";

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
    Salary, SkillsRequired
  } = req.body;

  // Validate input data
  const error = validateCareerData({ Title, JobType, ApplyBefore });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Insert into the career table
    await pool.query(
      `INSERT INTO career 
        (job_type, experience, qualification, category, location, title, apply_before, description, salary, skills_required)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, // Updated to match column names in the table
      [JobType, Experience, Qualification, Category, Location, Title, ApplyBefore, Description, Salary, SkillsRequired]
    );
    
    
    // Get the last inserted ID
    const careerId = await pool.query("SELECT LAST_INSERT_ID() AS career_id");

    // Retrieve the inserted career data
    const createdCareer = await pool.query("SELECT * FROM career WHERE career_id = ?", [careerId[0].career_id]);
    
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

// Update Career
export const updateCareer = async (req, res) => {
  const { career_id } = req.params;
  const {
    JobType, Experience, Qualification, Category,
    Location, Title, ApplyBefore, Description,
    Salary, SkillsRequired
  } = req.body;

  // Validate input data
  const error = validateCareerData({ Title, JobType, ApplyBefore });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Update career data
    const updatedCareer = await pool.query(
      `UPDATE career SET 
        job_type = ?, experience = ?, qualification = ?, 
        category = ?, location = ?, title = ?, apply_before = ?, 
        description = ?, salary = ?, skills_required = ?
        WHERE career_id = ?`, 
      [JobType, Experience, Qualification, Category, Location, Title, ApplyBefore, Description, Salary, SkillsRequired, career_id]
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
