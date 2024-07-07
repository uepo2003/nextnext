"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { View } from "./_component/view";
import { Todo } from "../../common/types/Todo";
import { useSearchParams } from "next/navigation";
import { getData } from "@/actions/fireFetch";

type Props = {
  params: {
    todo: string;
  };
};

const Page = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const routeValue = searchParams!.get("from") as string;
  const [todoValue, setTodoValue] = useState<Todo>();
  useEffect(() => {
    const fetchData = async () => {
      const t = await getData(params.todo);
      setTodoValue(t!);
    };
    fetchData();
  }, [params.todo]);
  if (!todoValue) return <div>読み込み中です</div>;

  return (
    <SessionProvider>
      <View todoValue={todoValue!} routeValue={routeValue} />
    </SessionProvider>
  );
};

export default Page;
