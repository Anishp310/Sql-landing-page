import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Log the user info only in development mode for debugging purposes
    if (process.env.NODE_ENV === "development") {
      console.log("Authenticated user:", req.user);
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message);

    // Handle specific errors like expired tokens
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }

    return res.status(400).json({ message: "Invalid token." });
  }
};

export default authenticateToken;
