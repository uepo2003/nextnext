import { Todo } from "../types/Todo";
import { atom } from "recoil";

export const showAddTodoFormState = atom<boolean>({
  key: "showAddTodoFormState",
  default: false,
});

export const showEditTodoFormState = atom<boolean>({
  key: "showEditTodoFormState",
  default: false,
});

export const editTodoState = atom<Todo>({
  key: "editTodoState",
  default: { id: "", title: "", description: "", completed: false },
});

export const fetchKeyState = atom<string>({
  key: "fetchKeyState",
  default: "all",
});
