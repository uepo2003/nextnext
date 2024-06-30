import React from "react";
import { FaFilePen } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { FiTrash } from "react-icons/fi";
import { Todo } from "../../../../common/types/Todo";
import { useSetRecoilState } from "recoil";
import {
  editTodoState,
  showEditTodoFormState,
} from "../../../../common/states/todoFormState";
import { useTodoList } from "../../../_hooks/useTodoList";
import { useRouter } from "next/navigation";

interface TodoDataProps {
  todoData: Todo;
}

export const Card = ({ todoData }: TodoDataProps) => {
  const tags = ["engineering", "auth"];
  const { id, title, description, completed } = todoData;
  const { changeCompleted, deleteTodo } = useTodoList();
  const setShowEditTodoForm = useSetRecoilState(showEditTodoFormState);
  const setEditTodoState = useSetRecoilState(editTodoState);
  const router = useRouter();

  return (
    <div
      key={id}
      className="flex items-center gap-3 rounded-md bg-white p-3 shadow-lg dark:bg-gray-900 dark:shadow-lg"
    >
      <Checkbox
        checked={completed}
        className="border-2 border-primary rounded-md w-6 h-6"
        onClick={() => {
          changeCompleted(id, completed);
          router.push("/home");
        }}
      />
      <div className="flex-1" onClick={() => router.push(`/${id}?from=home`)}>
        <h3
          className={`text-base font-bold ${
            completed ? "line-through text-gray-500 dark:text-gray-400" : ""
          }`}
        >
          {title}
        </h3>
        {description && (
          <p
            className={`text-base font-semibold text-gray-500 dark:text-gray-400 ${completed ? "line-through" : ""}`}
          >
            {description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-1 bg-gray-400 text-sm font-medium dark:bg-primary/40 dark:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setShowEditTodoForm(true),
              setEditTodoState({ id, title, description, completed });
          }}
        >
          <FaFilePen className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (window.confirm("本当に削除しますか？")) {
              deleteTodo(id);
              router.push("/home");
            }
          }}
        >
          <FiTrash className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
