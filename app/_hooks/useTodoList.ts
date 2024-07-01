import axios from "axios";
import { Todo } from "../../common/types/Todo";

const API_URL = process.env.API_URL;
export const useTodoList = () => {
  const addTodo = async (todo: Todo) => {
    console.log(todo);
    try {
      await axios.post(`${API_URL}/todos`, { todo });
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = async (todo: Todo) => {
    try {
      await axios.put(`${API_URL}/edit/${todo.id}`, { todo });
    } catch (error) {
      console.error(error);
    }
  };

  const todoItem = async (id: string): Promise<Todo | null> => {
    try {
      const item = await axios.get(`${API_URL}/item/${id}`);
      console.log(item.data);
      return item.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const searchTodo = async (keyword: string): Promise<Todo[] | null> => {
    try {
      const result = await axios.get(`${API_URL}/search/${keyword}`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const changeCompleted = async (id: string, completed: boolean) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, {
        completed: !completed,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllCompleted = () => {
    axios.post(`${API_URL}/completed`);
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
