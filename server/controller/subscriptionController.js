import pool from "../db.js";
import nodemailer from "nodemailer";

// Helper function to validate subscription data
const validateSubscriptionData = (data) => {
  const { name, email, phone, type } = data;

  if (!name || name.trim() === "") {
    return "Name is required";
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return "A valid email is required";
  }
  if (!phone || !/^\d{10,15}$/.test(phone)) {
    return "A valid phone number is required (10-15 digits)";
  }
  if (!type || type.trim() === "") {
    return "Subscription type is required";
  }

  return null;
};

// Create Subscription
export const createSubscription = async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Validate input data
  const error = validateSubscriptionData({ name, email, phone, type });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Check if email already exists
    const [emailCheck] = await pool.query("SELECT * FROM subscriptions WHERE email = ?", [email]);

    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "Email already exists, please use a different email address." });
    }

    // Insert subscription if email does not exist
    await pool.query(
      "INSERT INTO subscriptions (Name, email, phone, type) VALUES(?, ?, ?, ?)",
      [name, email, phone, type]
    );

    // Fetch the inserted subscription
    const [newSubscription] = await pool.query(
      "SELECT * FROM subscriptions WHERE subs_id = LAST_INSERT_ID()"
    );

    // Send email to the user
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Send email to the person who subscribed
      subject: "Subscription Confirmation",
      html: `<p>Hello ${name},</p>
             <p>Thank you for subscribing to our service. We will get back to you soon.</p>
             <p>Best regards,</p>
             <p>The Team</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Subscription created successfully, and email sent",
      data: newSubscription[0],
    });
  } catch (error) {
    console.error("Error creating subscription:", error.message);
    res.status(500).json({
      message: "Server error, unable to create subscription",
      error: error.message,
    });
  }
};

// Get All Subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const [subscriptions] = await pool.query("SELECT * FROM subscriptions");
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error retrieving subscriptions:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve subscriptions",
      error: error.message,
    });
  }
};

// Get Single Subscription
export const getSubscription = async (req, res) => {
  const { subs_id } = req.params;

  if (!subs_id) {
    return res.status(400).json({ message: "Subscription ID is required" });
  }

  try {
    const [subscription] = await pool.query("SELECT * FROM subscriptions WHERE subs_id = ?", [subs_id]);

    if (subscription.length === 0) {
      return res.status(404).json({
        message: `Subscription with ID ${subs_id} not found`,
      });
    }

    res.status(200).json(subscription[0]);
  } catch (error) {
    console.error("Error retrieving subscription:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve subscription",
      error: error.message,
    });
  }
};

// Update Subscription
export const updateSubscription = async (req, res) => {
  const { subs_id } = req.params;
  const { name, email, phone, type } = req.body;

  // Validate input data
  const error = validateSubscriptionData({ name, email, phone, type });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedSubscription] = await pool.query(
      "UPDATE subscriptions SET Name = ?, email = ?, phone = ?, type = ? WHERE subs_id = ?",
      [name, email, phone, type, subs_id]
    );

    if (updatedSubscription.affectedRows === 0) {
      return res.status(404).json({
        message: `Subscription with ID ${subs_id} not found`,
      });
    }

    // Fetch the updated subscription
    const [subscription] = await pool.query("SELECT * FROM subscriptions WHERE subs_id = ?", [subs_id]);

    res.status(200).json({
      message: "Subscription updated successfully",
      data: subscription[0],
    });
  } catch (error) {
    console.error("Error updating subscription:", error.message);
    res.status(500).json({
      message: "Server error, unable to update subscription",
      error: error.message,
    });
  }
};

// Delete Subscription
export const deleteSubscription = async (req, res) => {
  const { subs_id } = req.params;

  if (!subs_id) {
    return res.status(400).json({ message: "Subscription ID is required" });
  }
  try {
    // Fetch the subscription before deleting
    const [subscription] = await pool.query("SELECT * FROM subscriptions WHERE subs_id = ?", [subs_id]);

    if (subscription.length === 0) {
      return res.status(404).json({
        message: `Subscription with ID ${subs_id} not found`,
      });
    }

    // Delete the subscription
    await pool.query("DELETE FROM subscriptions WHERE subs_id = ?", [subs_id]);

    res.status(200).json({
      message: "Subscription deleted successfully",
      data: subscription[0],
    });
  } catch (error) {
    console.error("Error deleting subscription:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete subscription",
      error: error.message,
    });
  }
};
