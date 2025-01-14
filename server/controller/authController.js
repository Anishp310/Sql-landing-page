import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Helper function to validate user data
const validateUserData = (data) => {
  const { username, email, password } = data;
  if (!username || username.trim() === "") return "Username is required";
  if (!email || email.trim() === "") return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";

  if (!password || password.length < 6) return "Password must be at least 6 characters long";
  return null;
};

// Register User/Admin
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input data
  const error = validateUserData({ username, email, password });
  if (error) return res.status(400).json({ message: error });

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await pool.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role || "user"]
    );

    // Retrieve the last inserted user by their ID
    const [result] = await pool.execute(
      "SELECT username, email, role FROM users WHERE user_id = LAST_INSERT_ID()"
    );

    const newUser = result[0]; // The newly inserted user

    res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      // Duplicate entry error
      return res.status(400).json({ message: "Email or username already exists" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0]; // Get the first row

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check for admin role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Generate JWT
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      secretKey,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Query the database for the user
    const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate and store the raw token
    const token = crypto.randomBytes(32).toString("hex");
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user's reset token and expiration in the database
    await pool.execute(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [token, expirationTime, email]
    );

    // Send email with the reset link
    const resetLink = `http://localhost:8080/resetPassword/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET route to handle resetPassword page access
export const getResetPasswordPage = async (req, res) => {
  const { token } = req.params;

  try {
    // Check if the token exists and is valid in the database
    const [result] = await pool.execute(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token]
    );

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // If valid, return a form for the user to reset their password
    res.send(`
      <html>
        <head>
          <title>Reset Password</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .form-container { max-width: 400px; margin: 0 auto; }
            input[type="password"] { width: 100%; padding: 10px; margin: 5px 0; }
            button { padding: 10px 15px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
          </style>
        </head>
        <body>
          <div class="form-container">
            <h2>Reset Your Password</h2>
            <p>Please enter your new password:</p>
            <form action="/resetPassword/${token}" method="POST">
              <input type="password" name="newPassword" placeholder="New Password" required />
              <button type="submit">Reset Password</button>
            </form>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error validating token:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    const [userQuery] = await pool.execute(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token]
    );

    if (userQuery.length === 0) {
      return res.status(400).json({ message: "No active reset token found" });
    }

    const user = userQuery[0];  // Assuming the first user is the correct one

    if (token !== user.reset_token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await pool.execute(
      "UPDATE users SET password = ?, reset_token = NULL WHERE user_id = ?", 
      [hashedPassword, user.user_id]
    );

    res.status(200).json({ message: "Password has been successfully reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
