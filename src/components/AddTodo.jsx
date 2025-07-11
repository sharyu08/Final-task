import { useState } from "react";

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority);  // ✅ Ensure this matches App.jsx
    setTitle("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">🔥 High</option>
        <option value="medium">📋 Medium</option>
        <option value="low">🌿 Low</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
