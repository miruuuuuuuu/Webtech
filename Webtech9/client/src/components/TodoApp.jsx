import { useState, useEffect } from "react";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";

const API_URL = "/api/todos";

function TodoApp() {
  // State: todos array + newTodo string, as per the algorithm
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // componentDidMount equivalent: fetch existing tasks from MongoDB on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      // Update todos state with the retrieved data
      setTodos(data);
      setError("");
    } catch (err) {
      setError("Could not load tasks. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  // Update newTodo state as the user types
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If input is empty, return
    if (!newTodo.trim()) return;

    // Create new task object
    const taskObject = { task: newTodo.trim(), completed: false };

    try {
      // Send POST request to add the new task to the database
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskObject),
      });
      if (!response.ok) throw new Error("Failed to add task");
      const savedTodo = await response.json();

      // Update state with the newly added task and reset input field
      setTodos([...todos, savedTodo]);
      setNewTodo("");
      setError("");
    } catch (err) {
      setError("Could not add task. Is the backend server running?");
    }
  };

  const handleToggle = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const updated = await response.json();
      setTodos(todos.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError("Could not update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError("Could not delete task.");
    }
  };

  return (
    <section className="todo-section">
      <div className="section-title">
        <div>
          <p className="eyebrow">MERN STACK DEMO</p>
          <h2>Task Tracker</h2>
        </div>
        <p>A simple to-do list backed by Express, MongoDB Atlas and React.</p>
      </div>

      <div className="todo-card">
        <TaskForm
          newTodo={newTodo}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {error && <p className="todo-error">{error}</p>}
        {loading ? (
          <p className="task-empty">Loading tasks...</p>
        ) : (
          <TaskList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>
    </section>
  );
}

export default TodoApp;
