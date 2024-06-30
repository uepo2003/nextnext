import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  editTodoState,
  showEditTodoFormState,
} from "../../../../common/states/todoFormState";
import { useTodoList } from "../../../_hooks/useTodoList";
import { useRouter } from "next/navigation";

const EditTodoForm = () => {
  const { editTodo } = useTodoList();
  const editTodoValue = useRecoilValue(editTodoState);
  const [editTodoTitle, setEditTodoTitle] = useState<string>(
    editTodoValue.title,
  );
  const [editTodoDescription, setEditTodoDescription] = useState<string>(
    editTodoValue.description,
  );
  const setShowEditTodoForm = useSetRecoilState(showEditTodoFormState);

  const router = useRouter();

  const handleEditTodo = (id: string, completed: boolean) => {
    editTodo({
      id: id,
      title: editTodoTitle,
      description: editTodoDescription,
      completed: completed,
    });
    setShowEditTodoForm(false);
    router.push("/home");
  };

  return (
    <div>
      <div className="rounded-lg bg-[#f0f0f0] p-6 shadow-lg dark:bg-[#3e3e3e]">
        <h2 className="mb-4 text-lg font-medium text-[#2e2e2e] dark:text-[#f0f0f0]">
          Edit Todo
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="title"
                className="text-sm font-medium text-[#4c4c4c] dark:text-[#f0f0f0]"
              >
                Title
              </Label>
              <Input
                id="title"
                value={editTodoTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditTodoTitle(e.target.value)
                }
                className="mt-1 w-full rounded-lg border border-[#c0c0c0] bg-[#f0f0f0] px-4 py-3 text-[#2e2e2e] shadow-md focus:border-[#4c4c4c] focus:outline-none focus:ring-2 focus:ring-[#4c4c4c] dark:border-[#4c4c4c] dark:bg-[#2e2e2e] dark:text-[#f0f0f0] dark:focus:border-[#f0f0f0] dark:focus:ring-[#f0f0f0]"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium text-[#4c4c4c] dark:text-[#f0f0f0]"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={editTodoDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setEditTodoDescription(e.target.value)
                }
                className="mt-1 w-full rounded-lg border border-[#c0c0c0] bg-[#f0f0f0] px-4 py-3 text-[#2e2e2e] shadow-md focus:border-[#4c4c4c] focus:outline-none focus:ring-2 focus:ring-[#4c4c4c] dark:border-[#4c4c4c] dark:bg-[#2e2e2e] dark:text-[#f0f0f0] dark:focus:border-[#f0f0f0] dark:focus:ring-[#f0f0f0]"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              className="bg-[#f0f0f0] text-[#4c4c4c] hover:bg-[#e0e0e0] rounded-lg shadow-md dark:bg-[#2e2e2e] dark:text-[#f0f0f0] dark:hover:bg-[#3e3e3e] transition-all duration-300 ease-in-out"
              onClick={() => {
                setShowEditTodoForm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#4c4c4c] text-[#f0f0f0] hover:bg-[#5c5c5c] rounded-lg shadow-md transition-all duration-300 ease-in-out"
              onClick={() =>
                handleEditTodo(editTodoValue.id, editTodoValue.completed)
              }
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoForm;
