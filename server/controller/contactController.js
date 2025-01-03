import pool from "../db.js";

// Helper function for validation
const validateContactData = (data) => {
  const { username, company, email, job, telephone, message, relationship, writingAbout } = data;

  if (!username || username.trim() === "") {
    return "Username is required";
  }
  if (!company || company.trim() === "") {
    return "Company name is required";
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return "A valid email is required";
  }
  if (!job || job.trim() === "") {
    return "Job title is required";
  }
  if (!telephone || !/^\d{10,15}$/.test(telephone)) {
    return "A valid phone number is required (10-15 digits)";
  }
  if (!message || message.trim() === "") {
    return "Message is required";
  }
  if (!relationship || relationship.trim() === "") {
    return "Relationship is required";
  }
  if (!writingAbout || writingAbout.trim() === "") {
    return "Writing about is required";
  }

  return null;
};

// Create Contact
export const createContact = async (req, res) => {
  const { username, company, email, job, telephone, message, relationship, writingAbout } = req.body;

  // Validate input data
  const error = validateContactData({ username, company, email, job, telephone, message, relationship, writingAbout });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    // Insert contact into database
    await pool.query(
      "INSERT INTO contact (Username, company, email, job, telephone, message, relationship, writingAbout) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [username, company, email, job, telephone, message, relationship, writingAbout]
    );

    // Fetch the inserted contact
    const [newContact] = await pool.query(
      "SELECT * FROM contact WHERE contact_id = LAST_INSERT_ID()"
    );

    res.status(201).json({
      message: "Contact created successfully",
      data: newContact[0],
    });
  } catch (error) {
    console.error("Error creating contact:", error.message);
    res.status(500).json({
      message: "Server error, unable to create contact",
      error: error.message,
    });
  }
};

// Get All Contacts
export const getAllContacts = async (req, res) => {
  try {
    const [getAllContacts] = await pool.query("SELECT * FROM contact");
    res.status(200).json(getAllContacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve contacts",
      error: error.message,
    });
  }
};

// Get Single Contact
export const getContact = async (req, res) => {
  const { contact_id } = req.params;

  if (!contact_id) {
    return res.status(400).json({ message: "Contact ID is required" });
  }

  try {
    const [gContact] = await pool.query("SELECT * FROM contact WHERE contact_id = ?", [contact_id]);

    if (gContact.length === 0) {
      return res.status(404).json({
        message: `Contact with ID ${contact_id} not found`,
      });
    }

    res.status(200).json(gContact[0]);
  } catch (error) {
    console.error("Error retrieving contact:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve contact",
      error: error.message,
    });
  }
};

// Update Contact
export const updateContact = async (req, res) => {
  const { contact_id } = req.params;
  const { username, company, email, job, telephone, message, relationship, writingAbout } = req.body;

  // Validate input data
  const error = validateContactData({ username, company, email, job, telephone, message, relationship, writingAbout });
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const [updatedContact] = await pool.query(
      "UPDATE contact SET username = ?, company = ?, email = ?, job = ?, telephone = ?, message = ?, relationship = ?, writingAbout = ? WHERE contact_id = ?",
      [username, company, email, job, telephone, message, relationship, writingAbout, contact_id]
    );

    if (updatedContact.affectedRows === 0) {
      return res.status(404).json({
        message: `Contact with ID ${contact_id} not found`,
      });
    }

    // Fetch the updated contact
    const [contact] = await pool.query("SELECT * FROM contact WHERE contact_id = ?", [contact_id]);

    res.status(200).json({
      message: "Contact updated successfully",
      data: contact[0],
    });
  } catch (error) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({
      message: "Server error, unable to update contact",
      error: error.message,
    });
  }
};

// Delete Contact
export const deleteContact = async (req, res) => {
  const { contact_id } = req.params;

  if (!contact_id) {
    return res.status(400).json({ message: "Contact ID is required" });
  }

  try {
    // Fetch the contact before deleting
    const [contact] = await pool.query("SELECT * FROM contact WHERE contact_id = ?", [contact_id]);

    if (contact.length === 0) {
      return res.status(404).json({
        message: `Contact with ID ${contact_id} not found`,
      });
    }

    // Delete the contact
    await pool.query("DELETE FROM contact WHERE contact_id = ?", [contact_id]);

    res.status(200).json({
      message: "Contact deleted successfully",
      data: contact[0],
    });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete contact",
      error: error.message,
    });
  }
};
