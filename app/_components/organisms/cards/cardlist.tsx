import React from "react";
import { Card } from "./card";
import { useTodoFetch } from "../../../_hooks/useTodoFetch";
import { FaSpinner } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { fetchKeyState } from "../../../../common/states/todoFormState";

const Cardlist = () => {
  const fetchKeyValue = useRecoilValue(fetchKeyState);
  const { todos, isError, isLoading } = useTodoFetch(fetchKeyValue);


  if (isLoading) return <FaSpinner />;
  if (isError) return <div>An error has occurred</div>;

  return (
    <div>
      <ul className="space-y-4">
        {todos!.length === 0 ? (
          <p>No data available</p>
        ) : (
          todos!.map((todo) => <Card key={todo.id} todoData={todo} />)
        )}
      </ul>
    </div>
  );
};

export default Cardlist;
