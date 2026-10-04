import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", posts);

// Basic health check
app.get("/", (req, res) => {
  res.send("Blog API is running");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Uh oh! An unexpected error occurred.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
