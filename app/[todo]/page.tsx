"use client";
import React, { useEffect, useState } from "react";
import { useTodoList } from "../_hooks/useTodoList";
import Link from "next/link";
import { BookIcon, MenuIcon, SearchIcon } from "../_components/atoms/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { View } from "./_component/view";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Todo } from "../../common/types/Todo";
import { useSearchParams } from "next/navigation";

type Props = {
  params: {
    todo: string;
  };
};

const Page = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const routeValue = searchParams!.get("from") as string;

  const { todoItem } = useTodoList();
  console.log(params.todo);
  // console.log(from, "おおおおおおおおおおおお");
  const [todoValue, setTodoValue] = useState<Todo>();
  useEffect(() => {
    const fetchData = async () => {
      const t = await todoItem(params.todo);
      console.log(t, "おはよう");
      setTodoValue(t!);
    };
    fetchData();
  }, [params.todo]);
  console.log(todoValue, "ohayou");

  if (!todoValue) return <div>読み込み中です</div>;

  return (
    <SessionProvider>
      <View todoValue={todoValue!} routeValue={routeValue} />
    </SessionProvider>
  );
};

export default Page;
