require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("MERN Market API is running.");
});

// Connect to MongoDB Atlas, then start the server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
