"use client";
import { Header } from "../_components/organisms/header";
import { useRecoilValue } from "recoil";
import {
  showAddTodoFormState,
  showEditTodoFormState,
} from "../../common/states/todoFormState";
import { AddTodoForm } from "../_components/organisms/forms/addtodoform";
import EditTodoForm from "../_components/organisms/forms/edittodoform";
import { Navbar } from "../_components/organisms/navbar";
import Cardlist from "../_components/organisms/cards/cardlist";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { DoorOpenIcon } from "../_components/atoms/icons";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export const HomePage = () => {
  const showAddTodoFormValue = useRecoilValue(showAddTodoFormState);
  const showEditTodoFormValue = useRecoilValue(showEditTodoFormState);
  const { status } = useSession();

  
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect('/');
    }
  }, [status]);

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex h-full flex-1 overflow-hidden">
        <div className="w-1/5 border-r-2 border-[#4c4c4c] border-r p-6 dark:border-[#2e2e2e] dark:bg-[#2e2e2e]">
          <Navbar />
        </div>
        <div className="flex-1 overflow-auto p-10">
          {showAddTodoFormValue ? (
            <AddTodoForm />
          ) : showEditTodoFormValue ? (
            <EditTodoForm />
          ) : (
            <Cardlist />
          )}
        </div>
      </div>
      <div className="fixed bottom-8 right-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <DoorOpenIcon className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
