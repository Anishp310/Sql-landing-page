import pool from "../db.js";

// Helper function for validation
const validateTradingPlanData = (data) => {
  const { name, price, duration, features,  } = data;

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

// Create Trading Plan
export const createTradingPlan = async (req, res) => {
  try {
    const { name, price, duration, features, excludedFeature } = req.body;

    // Validate input data
    const error = validateTradingPlanData({ name, price, duration, features });
    if (error) {
      return res.status(400).json({ message: error });
    }

    // Insert into the database
    const query = `
      INSERT INTO tradingplan (name, price, duration, features, excludedFeature) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [insertResult] = await pool.query(query, [
      name,
      price,
      duration,
      JSON.stringify(features),
      JSON.stringify(excludedFeature) || "",
    ]);
console.log(insertResult)
    res.status(201).json({
      message: "Trading Plan created successfully",
      data: {
        tradingPlan_id: insertResult.insertId,
        name,
        price,
        duration,
        features,
        excludedFeature,
      },
    });
  } catch (error) {
    console.error("Error creating trading plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to create trading plan",
      error: error.message,
    });
  }
};

// Get All Trading Plans
export const getAllTradingPlans = async (req, res) => {
  try {
    const [plans] = await pool.query("SELECT * FROM tradingplan");
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error retrieving all trading plans:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve trading plans",
      error: error.message,
    });
  }
};

// Get Single Trading Plan
export const getTradingPlan = async (req, res) => {
  const { pricing_id  } = req.params;

  if (!pricing_id ) {
    return res.status(400).json({ message: "Trading Plan ID is required" });
  }

  try {
    const [plan] = await pool.query("SELECT * FROM tradingplan WHERE pricing_id = ?", [pricing_id ]);

    if (plan.length === 0) {
      return res.status(404).json({
        message: `Trading Plan with ID ${pricing_id } not found`,
      });
    }

    res.status(200).json(plan[0]);
  } catch (error) {
    console.error("Error retrieving trading plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve trading plan",
      error: error.message,
    });
  }
};

// Update Trading Plan
export const updateTradingPlan = async (req, res) => {
  const { pricing_id  } = req.params;
  const { name, price, duration, features, excludedFeature } = req.body;
console.log(pricing_id )
console.log( name, price, duration, features, excludedFeature )
  // Validate input data
  const error = validateTradingPlanData({ name, price, duration, features, excludedFeature });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updateResult] = await pool.query(
      `
      UPDATE tradingplan 
      SET name = ?, price = ?, duration = ?, features = ?, excludedFeature = ? 
      WHERE pricing_id = ?
    `,
      [name, price, duration, JSON.stringify(features), JSON.stringify(excludedFeature), pricing_id ]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        message: `Trading Plan with ID ${pricing_id } not found`,
      });
    }

    // Fetch updated plan
    const [plan] = await pool.query("SELECT * FROM tradingplan WHERE pricing_id = ?", [pricing_id ]);

    res.status(200).json({
      message: "Trading Plan updated successfully",
      data: plan[0],
    });
  } catch (error) {
    console.error("Error updating trading plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to update trading plan",
      error: error.message,
    });
  }
};

// Delete Trading Plan
export const deleteTradingPlan = async (req, res) => {
  const { pricing_id  } = req.params;
  if (!pricing_id ) {
    return res.status(400).json({ message: "Trading Plan ID is required" });
  }

  try {
    const [deleteResult] = await pool.query("DELETE FROM tradingplan WHERE pricing_id = ?", [pricing_id ]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        message: `Trading Plan with ID ${pricing_id } not found`,
      });
    }

    res.status(200).json({
      message: "Trading Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting trading plan:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete trading plan",
      error: error.message,
    });
  }
};
