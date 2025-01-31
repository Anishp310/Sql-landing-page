import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./db.js";
import router from "./routes/newsRoute.js";

const app = express();
dotenv.config();


// Middleware setup
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // const allowedOrigins = ["https://jooneli.com", "https://www.jooneli.com"];
//       const allowedOrigins = process.env.FRONTEND_SITE;
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     allowedHeaders: "Content-Type, Authorization",
//   })
// );
app.use(cors());

app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // Built-in middleware for parsing URL-encoded data

// Use your routes (assuming 'router' is properly set up in routes/newsRoute.js)
app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on PORT: ${PORT}`);
});

app.patch("/blogs/:id/click", async (req, res) => {
  try {
    const { id } = req.params;
    // Increment the click count for the specific blog post
    await pool.query(
      "UPDATE blog SET click_count = click_count + 1 WHERE blog_id = ?",
      [id]
    );
    res.status(200).send("Click count updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating click count.");
  }
});

app.get("/blogs/top-clicked", async (req, res) => {
  try {
    // Query to get the top 5 most clicked blogs, sorted by click_count in descending order
    const [result] = await pool.query(
      "SELECT * FROM blog ORDER BY click_count DESC LIMIT 5"
    );

    // Convert the image data from binary to base64 string
    result.forEach((blog) => {
      if (blog.image_data) {
        blog.image_data = `data:image/jpeg;base64,${blog.image_data.toString(
          "base64"
        )}`;
      }
    });

    // Send the top 5 blogs with the highest click counts
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching top clicked blogs.");
  }
});
