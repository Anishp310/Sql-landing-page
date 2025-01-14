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
  methods: "GET,POST,PUT,DELETE,PATCH",
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


app.patch('/blogs/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    // Increment the click count for the specific blog post
    await pool.query('UPDATE blog SET click_count = click_count + 1 WHERE blog_id = ?', [id]);
    res.status(200).send('Click count updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating click count.');
  }
});

app.get('/blogs/top-clicked', async (req, res) => {
  try {
    // Query to get the top 5 most clicked blogs, sorted by click_count in descending order
    const [result] = await pool.query('SELECT * FROM blog ORDER BY click_count DESC LIMIT 5');

    // Convert the image data from binary to base64 string
    result.forEach(blog => {
      if (blog.image_data) {
        blog.image_data = `data:image/jpeg;base64,${blog.image_data.toString('base64')}`;
      }
    });

    // Send the top 5 blogs with the highest click counts
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching top clicked blogs.');
  }
});

