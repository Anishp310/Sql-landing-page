import express from "express";
import cors from "cors";
import pool from "./db.js"; // Assuming you're importing a database pool setup
import router from "./routes/newsRoute.js"; // Assuming you're using a router for the routes
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",  // Allow requests from your frontend's origin
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // Built-in middleware for parsing URL-encoded data

// Use your routes (assuming 'router' is properly set up in routes/newsRoute.js)
app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`);
});
