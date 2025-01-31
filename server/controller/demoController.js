import pool from "../db.js";

// Helper function for validation
const validateDemoData = (data) => {
  const { username, company, email, designation, phone, description } = data;

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

  return null;
};

// Create Demo
export const createDemo = async (req, res) => {
  const { username, company, email, designation, phone, description, meeting = false } = req.body;

  // Validate input data
  const error = validateDemoData({ username, company, email, designation, phone, description });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Check if email already exists
    const [emailCheck] = await pool.query("SELECT * FROM Demo WHERE email = ?", [email]);

    if (emailCheck.length > 0) {
      return res.status(400).json({
        message: "Email already exists, please use a different email address.",
      });
    }

    // Insert demo data, including the meeting column
    await pool.query(
      "INSERT INTO Demo (username, company, email, designation, phone, description, meeting) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [username, company, email, designation, phone, description, meeting]
    );

    // Fetch the inserted demo
    const [newDemo] = await pool.query("SELECT * FROM Demo WHERE demo_id = LAST_INSERT_ID()");

    res.status(201).json({
      message: "Demo created successfully",
      data: newDemo[0],
    });
  } catch (error) {
    console.error("Error creating demo:", error.message);
    res.status(500).json({
      message: "Server error, unable to create demo",
      error: error.message,
    });
  }
};

// Get All Demos
export const getAllDemos = async (req, res) => {
  try {
    const [getAllDemos] = await pool.query("SELECT * FROM Demo");
    res.status(200).json(getAllDemos);
  } catch (error) {
    console.error("Error retrieving demos:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve demos",
      error: error.message,
    });
  }
};

// Get Single Demo
export const getDemo = async (req, res) => {
  const { demo_id } = req.params;

  if (!demo_id) {
    return res.status(400).json({ message: "Demo ID is required" });
  }

  try {
    const [gDemo] = await pool.query("SELECT * FROM Demo WHERE demo_id = ?", [demo_id]);

    if (gDemo.length === 0) {
      return res.status(404).json({
        message: `Demo with ID ${demo_id} not found`,
      });
    }

    res.status(200).json(gDemo[0]);
  } catch (error) {
    console.error("Error retrieving demo:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve demo",
      error: error.message,
    });
  }
};

// Update Demo
export const updateDemo = async (req, res) => {
  const { demo_id } = req.params;
  const { username, company, email, designation, phone, description, meeting } = req.body;

  // Validate input data
  const error = validateDemoData({ username, company, email, designation, phone, description });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedDemo] = await pool.query(
      "UPDATE Demo SET username = ?, company = ?, email = ?, designation = ?, phone = ?, description = ?, meeting = ? WHERE demo_id = ?",
      [username, company, email, designation, phone, description, meeting, demo_id]
    );

    if (updatedDemo.affectedRows === 0) {
      return res.status(404).json({
        message: `Demo with ID ${demo_id} not found`,
      });
    }

    // Fetch the updated demo
    const [demo] = await pool.query("SELECT * FROM Demo WHERE demo_id = ?", [demo_id]);

    res.status(200).json({
      message: "Demo updated successfully",
      data: demo[0],
    });
  } catch (error) {
    console.error("Error updating demo:", error.message);
    res.status(500).json({
      message: "Server error, unable to update demo",
      error: error.message,
    });
  }
};

// Delete Demo
export const deleteDemo = async (req, res) => {
  const { Demo_id } = req.params;

  if (!Demo_id) {
    return res.status(400).json({ message: "Demo ID is required" });
  }

  try {
    // Fetch the demo before deleting
    const [demo] = await pool.query("SELECT * FROM Demo WHERE demo_id = ?", [Demo_id]);

    if (demo.length === 0) {
      return res.status(404).json({
        message: `Demo with ID ${Demo_id} not found`,
      });
    }

    // Delete the demo
    await pool.query("DELETE FROM Demo WHERE demo_id = ?", [Demo_id]);

    res.status(200).json({
      message: "Demo deleted successfully",
      data: demo[0],
    });
  } catch (error) {
    console.error("Error deleting demo:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete demo",
      error: error.message,
    });
  }
};
