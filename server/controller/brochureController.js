import pool from "../db.js";

// Helper function for validation
const validateBrochureData = (data) => {
  const { username, company, email, designation, phone, description, meeting } = data;

  if (!username || username.trim() === "") {
    return "Username is required";
  }
  if (!company || company.trim() === "") {
    return "Company name is required";
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return "A valid email is required";
  }
  if (!designation || designation.trim() === "") {
    return "Designation is required";
  }
  if (!phone || !/^\d{10,15}$/.test(phone)) {
    return "A valid phone number is required (10-15 digits)";
  }
  if (!description || description.trim() === "") {
    return "Description is required";
  }
  if (meeting === undefined) {
    return "Meeting status is required";
  }

  return null;
};

// Create Brochure
export const createBrochure = async (req, res) => {
  const { username, company, email, designation, phone, description, meeting } = req.body;

  // Validate input data
  const error = validateBrochureData({ username, company, email, designation, phone, description, meeting });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Check if email already exists
    const [emailCheck] = await pool.query("SELECT * FROM Brochure WHERE email = ?", [email]);

    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "Email already exists, please use a different email address." });
    }

    // Insert brochure if email does not exist
    await pool.query(
      "INSERT INTO Brochure (username, company, email, designation, phone, description, meeting) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [username, company, email, designation, phone, description, meeting]
    );

    // Fetch the inserted brochure
    const [newBrochure] = await pool.query(
      "SELECT * FROM Brochure WHERE brochure_id = LAST_INSERT_ID()"
    );

    res.status(201).json({
      message: "Brochure created successfully",
      data: newBrochure[0],
    });
  } catch (error) {
    console.error("Error creating brochure:", error.message);
    res.status(500).json({
      message: "Server error, unable to create brochure",
      error: error.message,
    });
  }
};

// Get All Brochures
export const getAllBrochures = async (req, res) => {
  try {
    const [getAllBrochures] = await pool.query("SELECT * FROM Brochure");
    res.status(200).json(getAllBrochures);
  } catch (error) {
    console.error("Error retrieving brochures:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve brochures",
      error: error.message,
    });
  }
};

// Get Single Brochure
export const getBrochure = async (req, res) => {
  const { brochure_id } = req.params;

  if (!brochure_id) {
    return res.status(400).json({ message: "Brochure ID is required" });
  }

  try {
    const [gBrochure] = await pool.query("SELECT * FROM Brochure WHERE brochure_id = ?", [brochure_id]);

    if (gBrochure.length === 0) {
      return res.status(404).json({
        message: `Brochure with ID ${brochure_id} not found`,
      });
    }

    res.status(200).json(gBrochure[0]);
  } catch (error) {
    console.error("Error retrieving brochure:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve brochure",
      error: error.message,
    });
  }
};

// Update Brochure
export const updateBrochure = async (req, res) => {
  const { brochure_id } = req.params;
  const { username, company, email, designation, phone, description, meeting } = req.body;

  // Validate input data
  const error = validateBrochureData({ username, company, email, designation, phone, description, meeting });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedBrochure] = await pool.query(
      "UPDATE Brochure SET username = ?, company = ?, email = ?, designation = ?, phone = ?, description = ?, meeting = ? WHERE brochure_id = ?",
      [username, company, email, designation, phone, description, meeting, brochure_id]
    );

    if (updatedBrochure.affectedRows === 0) {
      return res.status(404).json({
        message: `Brochure with ID ${brochure_id} not found`,
      });
    }

    // Fetch the updated brochure
    const [brochure] = await pool.query("SELECT * FROM Brochure WHERE brochure_id = ?", [brochure_id]);

    res.status(200).json({
      message: "Brochure updated successfully",
      data: brochure[0],
    });
  } catch (error) {
    console.error("Error updating brochure:", error.message);
    res.status(500).json({
      message: "Server error, unable to update brochure",
      error: error.message,
    });
  }
};

// Delete Brochure
export const deleteBrochure = async (req, res) => {
  const { brochure_id } = req.params;

  if (!brochure_id) {
    return res.status(400).json({ message: "Brochure ID is required" });
  }

  try {
    // Fetch the brochure before deleting
    const [brochure] = await pool.query("SELECT * FROM Brochure WHERE brochure_id = ?", [brochure_id]);

    if (brochure.length === 0) {
      return res.status(404).json({
        message: `Brochure with ID ${brochure_id} not found`,
      });
    }

    // Delete the brochure
    await pool.query("DELETE FROM Brochure WHERE brochure_id = ?", [brochure_id]);

    res.status(200).json({
      message: "Brochure deleted successfully",
      data: brochure[0],
    });
  } catch (error) {
    console.error("Error deleting brochure:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete brochure",
      error: error.message,
    });
  }
};
