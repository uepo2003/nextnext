import { FaPlus } from "react-icons/fa6";
import { Button } from "../../../components/ui/button";
import { useSetRecoilState } from "recoil";
import { showAddTodoFormState } from "../../../common/states/todoFormState";
export const Header = () => {
  const setShowAddTodoForm = useSetRecoilState(showAddTodoFormState);

  return (
    <>
      <header className="bg-[#4c4c4c] px-10 py-4 shadow-sm dark:bg-[#2e2e2e]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#f0f0f0]">Notion-like Todo</h1>
          <Button
            size="sm"
            className="bg-[#4c4c4c] text-[#f0f0f0] hover:bg-[#5c5c5c] rounded-lg shadow-md transition-all duration-300 ease-in-out"
            onClick={() => setShowAddTodoForm(true)}
          >
            <FaPlus className="mr-2 h-4 w-4" />
            AddTodo
          </Button>
        </div>
      </header>
    </>
  );
};
