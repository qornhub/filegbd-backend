const express = require("express");
const cors = require("cors");
const app = express();

// Load routes
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Environment variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // allow all
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api", authRoutes);        // /api/register, /api/login
app.use("/api/notes", noteRoutes);  // /api/notes CRUD

// Start Server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
