const mongoose = require("mongoose");

// Schema for tasks (Todo) as per the algorithm: task text + completed flag
const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
