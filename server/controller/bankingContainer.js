import pool from "../db.js";

// Helper function for validation
const validateBankingPlanData = (data) => {
  const { name, price, duration, features, excludedFeature } = data;

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

  // Validate each feature is a non-empty string
  if (features.some((feature) => !feature.trim())) {
    return "Each feature must be a non-empty string";
  }

  // // Validate excludedFeature is provided
  // if (!excludedFeature || excludedFeature.length === 0) {
  //   return "At least one excluded feature is required";
  // }

  return null;
};

// Create Banking Plan
export const createBankingPlan = async (req, res) => {
  try {
    const { name, price, duration, features, excludedFeature } = req.body;

    // Validate input data
    const error = validateBankingPlanData({ name, price, duration, features, excludedFeature });
    if (error) {
      return res.status(400).json({ message: error });
    }

    // Insert into the database
    const query = `
      INSERT INTO bankingPlan (name, price, duration, features, excludedFeature) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [insertResult] = await pool.query(query, [
      name,
      price,
      duration,
      JSON.stringify(features),
      JSON.stringify(excludedFeature),
    ]);

    res.status(201).json({
      message: "Banking Plan created successfully",
      data: {
        bankingPlan_id: insertResult.insertId,
        name,
        price,
        duration,
        features,
        excludedFeature,
      },
    });
  } catch (error) {
    console.error("Error creating banking plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to create banking plan",
      error: error.message,
    });
  }
};

// Get All Banking Plans
export const getAllBankingPlans = async (req, res) => {
  try {
    const [plans] = await pool.query("SELECT * FROM bankingPlan");
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error retrieving all banking plans:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve banking plans",
      error: error.message,
    });
  }
};

// Get Single Banking Plan
export const getBankingPlan = async (req, res) => {
  const { pricing_id  } = req.params;

  if (!pricing_id ) {
    return res.status(400).json({ message: "Banking Plan ID is required" });
  }

  try {
    const [plan] = await pool.query("SELECT * FROM bankingPlan WHERE pricing_id = ?", [pricing_id ]);

    if (plan.length === 0) {
      return res.status(404).json({
        message: `Banking Plan with ID ${pricing_id } not found`,
      });
    }

    res.status(200).json(plan[0]);
  } catch (error) {
    console.error("Error retrieving banking plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve banking plan",
      error: error.message,
    });
  }
};

// Update Banking Plan
export const updateBankingPlan = async (req, res) => {
  const { pricing_id  } = req.params;
  const { name, price, duration, features, excludedFeature } = req.body;

  // Validate input data
  const error = validateBankingPlanData({ name, price, duration, features, excludedFeature });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updateResult] = await pool.query(
      `
      UPDATE bankingPlan 
      SET name = ?, price = ?, duration = ?, features = ?, excludedFeature = ? 
      WHERE pricing_id = ?
    `,
      [name, price, duration, JSON.stringify(features), JSON.stringify(excludedFeature), pricing_id ]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        message: `Banking Plan with ID ${pricing_id } not found`,
      });
    }

    // Fetch updated plan
    const [plan] = await pool.query("SELECT * FROM bankingPlan WHERE pricing_id = ?", [pricing_id ]);

    res.status(200).json({
      message: "Banking Plan updated successfully",
      data: plan[0],
    });
  } catch (error) {
    console.error("Error updating banking plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to update banking plan",
      error: error.message,
    });
  }
};

// Delete Banking Plan
export const deleteBankingPlan = async (req, res) => {
  const { pricing_id  } = req.params;

  if (!pricing_id ) {
    return res.status(400).json({ message: "Banking Plan ID is required" });
  }

  try {
    const [deleteResult] = await pool.query("DELETE FROM bankingPlan WHERE pricing_id = ?", [pricing_id ]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        message: `Banking Plan with ID ${pricing_id } not found`,
      });
    }

    res.status(200).json({
      message: "Banking Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting banking plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete banking plan",
      error: error.message,
    });
  }
};
