import axios from "axios";
import { Todo } from "../../common/types/Todo";

export const useTodoList = () => {
  const addTodo = async (todo: Todo) => {
    console.log(todo);
    try {
      await axios.post("http://localhost:5000/todos", { todo });
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = async (todo: Todo) => {
    try {
      await axios.put(`http://localhost:5000/edit/${todo.id}`, { todo });
    } catch (error) {
      console.error(error);
    }
  };

  const todoItem = async (id: string): Promise<Todo | null> => {
    try {
      const item = await axios.get(`http://localhost:5000/item/${id}`);
      console.log(item.data);
      return item.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const searchTodo = async (keyword: string): Promise<Todo[] | null> => {
    console.log(keyword, "おはようございます");
    try {
      const result = await axios.get(`http://localhost:5000/search/${keyword}`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const changeCompleted = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !completed,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllCompleted = () => {
    axios.post("http://localhost:5000/completed");
  };

  return {
    addTodo,
    editTodo,
    todoItem,
    searchTodo,
    changeCompleted,
    deleteTodo,
    deleteAllCompleted,
  };
};
