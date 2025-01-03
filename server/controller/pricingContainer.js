import pool from "../db.js";

// Helper function for validation
const validatePricingData = (data) => {
  const { name, price, duration, features } = data;

  if (!name || name.trim() === "") {
    return "Name is required";
  }
  if (!price || price.trim() === "") {
    return "Price is required";
  }

  // Validate price is a number
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return "Price must be a valid number greater than zero";
  }

  if (!duration || duration.trim() === "") {
    return "Duration is required";
  }
  if (!features || features.length === 0) {
    return "At least one feature is required";
  }

  // Optionally, validate that each feature is a non-empty string
  if (features.some((feature) => !feature.trim())) {
    return "Each feature must be a non-empty string";
  }

  return null;
};

// Create Pricing
export const createPricing = async (req, res) => {
  try {
    const { name, price, duration, features } = req.body;

    // Validate input data
    const error = validatePricingData({ name, price, duration, features });
    if (error) {
      return res.status(400).json({ message: error });
    }

    // Insert pricing into the database (MySQL query)
    const query = "INSERT INTO pricing (name, price, duration, features) VALUES (?, ?, ?, ?)";
    const [insertPricing] = await pool.query(query, [name, price, duration, JSON.stringify(features)]);

    res.status(201).json({
      message: "Pricing created successfully",
      data: {
        pricing_id: insertPricing.insertId,
        name,
        price,
        duration,
        features,
      },
    });
  } catch (error) {
    console.error("Error creating pricing:", error.message);
    res.status(500).json({
      message: "Server error, unable to create pricing",
      error: error.message,
    });
  }
};

// Get All Pricing
export const getAllPricing = async (req, res) => {
  try {
    const [getAllPricing] = await pool.query("SELECT * FROM pricing");
    res.status(200).json(getAllPricing);
  } catch (error) {
    console.error("Error retrieving all pricing:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve pricing",
      error: error.message,
    });
  }
};

// Get Single Pricing
export const getPricing = async (req, res) => {
  const { pricing_id } = req.params;

  if (!pricing_id) {
    return res.status(400).json({ message: "Pricing ID is required" });
  }

  try {
    const [gPricing] = await pool.query("SELECT * FROM pricing WHERE pricing_id = ?", [pricing_id]);

    if (gPricing.length === 0) {
      return res.status(404).json({
        message: `Pricing with ID ${pricing_id} not found`,
      });
    }

    res.status(200).json(gPricing[0]);
  } catch (error) {
    console.error("Error retrieving pricing:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve pricing",
      error: error.message,
    });
  }
};

// Update Pricing
export const updatePricing = async (req, res) => {
  const { pricing_id } = req.params;
  const { name, price, duration, features } = req.body;

  // Validate input data
  const error = validatePricingData({ name, price, duration, features });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedPricing] = await pool.query(
      "UPDATE pricing SET name = ?, price = ?, duration = ?, features = ? WHERE pricing_id = ?",
      [name, price, duration, JSON.stringify(features), pricing_id]
    );

    if (updatedPricing.affectedRows === 0) {
      return res.status(404).json({
        message: `Pricing with ID ${pricing_id} not found`,
      });
    }

    // Fetch updated pricing
    const [pricing] = await pool.query("SELECT * FROM pricing WHERE pricing_id = ?", [pricing_id]);

    res.status(200).json({
      message: "Pricing updated successfully",
      data: pricing[0],
    });
  } catch (error) {
    console.error("Error updating pricing:", error.message);
    res.status(500).json({
      message: "Server error, unable to update pricing",
      error: error.message,
    });
  }
};

// Delete Pricing
export const deletePricing = async (req, res) => {
  const { pricing_id } = req.params;

  if (!pricing_id) {
    return res.status(400).json({ message: "Pricing ID is required" });
  }

  try {
    const [deletedPricing] = await pool.query("DELETE FROM pricing WHERE pricing_id = ?", [pricing_id]);

    if (deletedPricing.affectedRows === 0) {
      return res.status(404).json({
        message: `Pricing with ID ${pricing_id} not found`,
      });
    }

    res.status(200).json({
      message: "Pricing deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting pricing:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete pricing",
      error: error.message,
    });
  }
};
