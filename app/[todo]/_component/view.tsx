"use client";
import { BookIcon } from "../../_components/atoms/icons";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Todo } from "../../../common/types/Todo";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useMemo } from "react";
import Link from "next/link";

type Props = {
  todoValue: Todo;
  routeValue: string;
};

export const View = ({ todoValue, routeValue }: Props) => {
  const { data: session } = useSession();
  const memoizedSession = useMemo(() => session, [session]);

  console.log(memoizedSession);
  console.log(routeValue, "ニコニコ");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 md:px-6 flex items-center h-14">
        <Link href="/home" className="flex items-center gap-2">
          <BookIcon className="h-6 w-6" />
          <span className="font-semibold">Detail</span>
        </Link>
      </header>
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="mt-16">
              <img
                src={todoValue.url || ""}
                width={800}
                height={600}
                alt="Article cover image"
                className="rounded-lg w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="mt-32 ">
              <div className="space-y-5 flex flex-col">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{todoValue.title}</h1>
                  <p className="text-muted-foreground">
                    {todoValue.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="border w-10 h-10">
                    <AvatarImage src={memoizedSession?.user?.image || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="font-medium">
                      {memoizedSession?.user?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {memoizedSession?.user?.email}
                    </div>
                  </div>
                </div>
                <div className="flex-1 mx-auto">
                  <Button variant="ghost">
                    <Link
                      href={
                        routeValue === "home"
                          ? "/home "
                          : `search/?q=${todoValue.title}`
                      }
                    >
                      back
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-background border-t px-4 md:px-6 py-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          &copy; 2024 Blog. All rights reserved.
        </div>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
};
