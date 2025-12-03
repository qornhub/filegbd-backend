// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

// --- Create a MySQL connection pool with auto-reconnect ---
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- Test the connection once at startup ---
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database (Pool)");
    connection.release();
  } catch (err) {
    console.error(" Database connection FAILED:", err.message);
  }
})();

module.exports = pool;
