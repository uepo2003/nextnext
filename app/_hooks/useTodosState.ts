import { useState } from "react";

export const useTodoStates = () => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "todo-1",
      title: "Finish the Todo App UI",
      description:
        "Design a clean and modern Todo App UI using the shadcn design system.",
      completed: true,
    },
    {
      id: "todo-2",
      title: "Write the Todo App documentation",
      description: "Document the features and usage of the Todo App.",
      completed: false,
    },
    {
      id: "todo-3",
      title: "Deploy the Todo App to production",
      description:
        "Set up the necessary infrastructure and deploy the Todo App.",
      completed: false,
    },
  ]);

  return {
    editingTodo,
    setEditingTodo,
    newTodoTitle,
    setNewTodoTitle,
    newTodoDescription,
    setNewTodoDescription,
    todos,
    setTodos,
  };
};
