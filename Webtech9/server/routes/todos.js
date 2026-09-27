const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET /api/todos - fetch all tasks
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos", error: err.message });
  }
});

// POST /api/todos - add a new task
router.post("/", async (req, res) => {
  try {
    const { task, completed } = req.body;
    if (!task || !task.trim()) {
      return res.status(400).json({ message: "Task text is required" });
    }
    const newTodo = new Todo({ task: task.trim(), completed: completed || false });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: "Failed to add todo", error: err.message });
  }
});

// PUT /api/todos/:id - update a task (e.g. toggle completed)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo", error: err.message });
  }
});

// DELETE /api/todos/:id - remove a task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo", error: err.message });
  }
});

module.exports = router;
