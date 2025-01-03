import mysql from "mysql2/promise";  // Import promise-based version
import dotenv from 'dotenv';

dotenv.config(); 
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,         // Replace with your MySQL username
  password: process.env.PASSWORD,         // Replace with your MySQL password
  database: process.env.DATABASE,   // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
});

const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully!");
    connection.release(); // Release connection back to pool
  } catch (err) {
    console.error("Failed to connect to MySQL database:");
    console.error(err.message);
  }
};

connectToDatabase();

export default pool;
