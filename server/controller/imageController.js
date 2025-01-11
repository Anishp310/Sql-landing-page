import pool from "../db.js";
import multer from "multer";

// Configure multer to store files in memory with file type and size restrictions
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    // Check if the file is an image (jpeg, png, or gif)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// Create Image (using multer)
export const createImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageData = req.file.buffer;  // Image data buffer from multer

    // Insert image into database
    await pool.query(
      "INSERT INTO images (image_data) VALUES (?)",
      [imageData]
    );

    // Fetch the inserted image (manually after insert)
    const [newImage] = await pool.query("SELECT * FROM images ORDER BY image_id DESC LIMIT 1");

    res.status(201).json({
      message: "Image created successfully",
      data: newImage[0],  // Return the inserted image record
    });
  } catch (error) {
    console.error("Error creating image:", error.message);
    res.status(500).json({
      message: "Server error, unable to create image",
      error: error.message,
    });
  }
};
// Get All Images
export const getAllImages = async (req, res) => {
  try {
    const [getAllImages] = await pool.query("SELECT * FROM images");

    // Convert binary image data to Base64 for each image
    const imagesWithBase64 = getAllImages.map((image) => ({
      ...image,
      image_data: `data:image/jpeg;base64,${image.image_data.toString('base64')}`,  // Assuming image data is binary
    }));

    res.status(200).json(imagesWithBase64);  // Return all images with Base64 data
  } catch (error) {
    console.error("Error retrieving images:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve images",
      error: error.message,
    });
  }
};

// Get Single Image
export const getImage = async (req, res) => {
  const { image_id } = req.params;

  if (!image_id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  try {
    const [gImage] = await pool.query("SELECT * FROM images WHERE image_id = ?", [image_id]);

    if (gImage.length === 0) {
      return res.status(404).json({
        message: `Image with ID ${image_id} not found`,
      });
    }

    // Send image data as base64 (assuming image is jpeg)
    const imageBase64 = gImage[0].image_data.toString('base64');
    res.status(200).json({
      image_id: gImage[0].image_id,
      image_data: `data:image/jpeg;base64,${imageBase64}`,
      created_at: gImage[0].created_at,  // Assuming created_at field exists
    });
  } catch (error) {
    console.error("Error retrieving image:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve image",
      error: error.message,
    });
  }
};

// Update Image (using multer)
export const updateImage = async (req, res) => {
  const { image_id } = req.params;

  if (!image_id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  try {
    const imageData = req.file.buffer;  // Image data buffer from multer

    // Update image data in the database
    const [updatedImage] = await pool.query(
      "UPDATE images SET image_data = ? WHERE image_id = ?",
      [imageData, image_id]
    );

    if (updatedImage.affectedRows === 0) {
      return res.status(404).json({
        message: `Image with ID ${image_id} not found`,
      });
    }

    // Fetch the updated image (manually after update)
    const [image] = await pool.query("SELECT * FROM images WHERE image_id = ?", [image_id]);

    res.status(200).json({
      message: "Image updated successfully",
      data: image[0],  // Return updated image data
    });
  } catch (error) {
    console.error("Error updating image:", error.message);
    res.status(500).json({
      message: "Server error, unable to update image",
      error: error.message,
    });
  }
};

// Delete Image
export const deleteImage = async (req, res) => {
  const { image_id } = req.params;

  if (!image_id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  try {
    // Fetch the image before deleting
    const [image] = await pool.query("SELECT * FROM images WHERE image_id = ?", [image_id]);

    if (image.length === 0) {
      return res.status(404).json({
        message: `Image with ID ${image_id} not found`,
      });
    }

    // Delete the image
    await pool.query("DELETE FROM images WHERE image_id = ?", [image_id]);

    res.status(200).json({
      message: "Image deleted successfully",
      data: image[0],  // Return deleted image data
    });
  } catch (error) {
    console.error("Error deleting image:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete image",
      error: error.message,
    });
  }
};
