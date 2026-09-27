import TaskItem from "./TaskItem.jsx";

function TaskList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return <p className="task-empty">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="task-list">
      {todos.map((todo) => (
        <TaskItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
