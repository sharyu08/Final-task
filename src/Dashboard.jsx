import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import ProgressBar from "./components/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [dark, setDark] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortMethod, setSortMethod] = useState("default");
  const [showMenu, setShowMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (title, priority = "medium") => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to add task");
      }

      const newTodo = await res.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      toast.success("✅ Task added!");
    } catch (err) {
      toast.error("❌ Could not add task!");
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.warn("Task deleted!");
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const updated = { ...todo, completed: !todo.completed };

    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();
    setTodos(todos.map((t) => (t.id === id ? data : t)));
  };

  const editTodo = async (id, newTitle) => {
    const todo = todos.find((t) => t.id === id);
    const updated = { ...todo, title: newTitle };

    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();
    setTodos(todos.map((t) => (t.id === id ? data : t)));
    toast.info("Task updated!");
  };

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const getFilteredTodos = () => {
    let filtered = todos;
    if (filter === "completed") filtered = todos.filter((t) => t.completed);
    else if (filter === "active") filtered = todos.filter((t) => !t.completed);
    return sortTodos(filtered);
  };

  const sortTodos = (list) => {
    if (sortMethod === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      return [...list].sort((a, b) => order[a.priority] - order[b.priority]);
    }
    return list;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="dashboard">
      <div className="header">
        <div
          className="hamburger"
          onClick={() => {
            setShowMenu(!showMenu);
            if (showCalendar) setShowCalendar(false);
          }}
        >
          ☰
        </div>
        <h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            alt="logo"
            style={{
              width: "24px",
              marginRight: "10px",
              verticalAlign: "middle",
              filter: dark ? "invert(1)" : "none",
            }}
          />
          FocusFlow
        </h1>
        <div className="header-right">
          <button className="toggle-theme" onClick={toggleTheme}>
            {dark ? "🌞" : "🌙"}
          </button>
          <img
            src="https://api.dicebear.com/7.x/lorelei/png?seed=avatargirl&size=64"
            alt="Profile"
            className="profile-avatar"
          />
        </div>
      </div>

      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => setShowCalendar(!showCalendar)}>📅 Calendar</li>
            <li>📊 Stats</li>
            <li>⚙️ Settings</li>
            <li>🔒 Logout</li>
          </ul>
        </div>
      )}

      {showCalendar && (
        <div className="calendar-wrapper">
          <Calendar />
        </div>
      )}

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <select onChange={(e) => setSortMethod(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="priority">Sort: Priority</option>
        </select>
      </div>

      <ProgressBar
        completed={todos.filter((todo) => todo.completed).length}
        total={todos.length}
      />

      <AddTodo onAdd={addTodo} />

      <TodoList
        todos={getFilteredTodos()}
        onDelete={deleteTodo}
        onComplete={toggleComplete}
        onEdit={editTodo}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Dashboard;
