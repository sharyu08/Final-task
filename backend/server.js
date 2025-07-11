const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const DATA_FILE = "./data/todos.json";

app.use(cors());
app.use(bodyParser.json());

function getTodos() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

app.get("/api/todos", (req, res) => {
  const todos = getTodos();
  res.json(todos);
});

// POST new todo
app.post("/api/todos", (req, res) => {
  try {
    console.log("Received new task:", req.body);
    const todos = getTodos();

    const newTodo = {
      id: Date.now().toString(),
      title: req.body.title,
      priority: req.body.priority || "medium",
      completed: false,
    };

    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error adding todo:", error.message);
    res.status(500).json({ error: "Server error while adding todo" });
  }
});



app.put("/api/todos/:id", (req, res) => {
  const todos = getTodos();
  const index = todos.findIndex(todo => todo.id === req.params.id);

  if (index !== -1) {
    const updated = {
      ...todos[index],
      title: req.body.title ?? todos[index].title,
      completed: typeof req.body.completed === "boolean" ? req.body.completed : todos[index].completed,
      priority: req.body.priority ?? todos[index].priority
    };
    todos[index] = updated;
    saveTodos(todos);
    res.json(updated);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const todos = getTodos();
  const updatedTodos = todos.filter(todo => todo.id !== req.params.id);
  saveTodos(updatedTodos);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
