import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onComplete, onEdit }) {
  return (
    <ul>
      {todos.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.6 }}>No tasks yet</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onComplete={onComplete}
            onEdit={onEdit}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;
