function TaskForm({ newTodo, handleInputChange, handleSubmit }) {
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={handleInputChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
