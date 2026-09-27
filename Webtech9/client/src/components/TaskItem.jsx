function TaskItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? "task-item completed" : "task-item"}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <span>{todo.task}</span>
      </label>
      <button className="task-delete" onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
