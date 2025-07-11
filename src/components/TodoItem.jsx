import { useState } from "react";

function TodoItem({ todo, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing && newTitle.trim()) {
      onEdit(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onComplete(todo.id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        ) : (
          <>
            <span className="text">{todo.title}</span>
            <span className={`priority-badge ${todo.priority}`}>
              {todo.priority}
            </span>
          </>
        )}
      </div>

      <div className="actions">
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
