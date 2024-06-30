import { useTodoFetch } from "../../_hooks/useTodoFetch";
import { fetchKeyState } from "../../../common/states/todoFormState";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import React from "react";
import { useRecoilValue } from "recoil";

export const StatusCard = () => {
  const fetchKeyValue = useRecoilValue(fetchKeyState);
  const { todos } = useTodoFetch(fetchKeyValue);
  const w = (todos!.length / 10) * 128;
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span>{todos!.length}</span> Posts
          </div>
          <div className="relative w-full h-4 rounded-full bg-gray-300">
            　
            <div
              className={`absolute left-0 top-0 h-full  bg-black rounded-full`}
              style={{ width: `${w}px` }}
            />{" "}
            　　　　　
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
