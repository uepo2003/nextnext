"use server";
import React, { ReactNode } from "react";
import { useTodoList } from "../_hooks/useTodoList";
import Link from "next/link";
import { ArrowUpRightIcon } from "../_components/atoms/icons";
import { Todo } from "../../common/types/Todo";

const Page = async ({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) => {
  const { searchTodo } = useTodoList();
  const searchResults: Todo[] | null = await searchTodo(q);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 py-8">
      <div className="flex item-center">
        <div className="mx-auto text-3xl font-bold">『{q}』の検索結果</div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {searchResults!.map((result) => (
          <Link
            key={result.id}
            href={result.id}
            className="group rounded-lg bg-background p-4 shadow-lg transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            prefetch={false}
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">
              {result.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {result.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ArrowUpRightIcon className="h-4 w-4" />
              <span>Read more</span>
            </div>
          </Link>
        ))}
        <Link
          href="/home"
          className="flex group rounded-lg bg-background p-4 shadow-lg transition-all hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          prefetch={false}
        >
          <div className="mx-auto my-auto text-2xl font-bold">Back</div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
