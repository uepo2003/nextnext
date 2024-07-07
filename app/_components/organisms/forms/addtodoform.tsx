"use client";
import React, { useState, useTransition } from "react";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { showAddTodoFormState } from "../../../../common/states/todoFormState";
import { useSetRecoilState } from "recoil";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodoList } from "../../../_hooks/useTodoList";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { PhotoUploader } from "./photocreateform";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addData } from "@/actions/fireFetch";

export const AddTodoForm = () => {
  const [isPending, startTransition] = useTransition();
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const setShowAddTodoForm = useSetRecoilState(showAddTodoFormState);
  const { addTodo } = useTodoList();
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().min(10).max(50),
    description: z.string().min(10).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [photoData, setPhotoData] = useState<Blob>();

  const handleChangeFile = (file: Blob) => {
    setPhotoData(file);
  };

  const handleUploadFile = async (file: Blob) => {
    console.log(file, "写真のファイルです！！！");

    const base64Data = await blobToBase64(file);
    const jsonData = {
      fileData: base64Data,
    };

    console.log(jsonData, "これが私の全力だーーーーーー");
    const res = await fetch("/api/uploadFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };

  const handleAddTodo = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    startTransition(async () => {
      const result = await handleUploadFile(photoData!);
      await addData({
        id: uuid(),
        title: values.title,
        description: values.description,
        url: result.url,
        completed: false,
      });

      console.log(result, "おちんちん");
      setShowAddTodoForm(false);
      router.push("/home");
    });
  };

  return (
    <>
      <div className="rounded-lg bg-[#f0f0f0] p-6 shadow-lg dark:bg-[#3e3e3e]">
        <h2 className="mb-4 text-lg font-medium text-[#2e2e2e] dark:text-[#f0f0f0]">
          Add Todo
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddTodo)}
            className="space-y-8"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#4c4c4c] dark:text-[#f0f0f0]">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-1 w-full rounded-lg border border-[#c0c0c0] bg-[#f0f0f0] px-4 py-3 text-[#2e2e2e] shadow-md focus:border-[#4c4c4c] focus:outline-none focus:ring-2 focus:ring-[#4c4c4c] dark:border-[#4c4c4c] dark:bg-[#2e2e2e] dark:text-[#f0f0f0] dark:focus:border-[#f0f0f0] dark:focus:ring-[#f0f0f0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#4c4c4c] dark:text-[#f0f0f0]">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="mt-1 w-full rounded-lg border border-[#c0c0c0] bg-[#f0f0f0] px-4 py-3 text-[#2e2e2e] shadow-md focus:border-[#4c4c4c] focus:outline-none focus:ring-2 focus:ring-[#4c4c4c] dark:border-[#4c4c4c] dark:bg-[#2e2e2e] dark:text-[#f0f0f0] dark:focus:border-[#f0f0f0] dark:focus:ring-[#f0f0f0]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PhotoUploader onChange={handleChangeFile} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                className="bg-[#f0f0f0] text-[#4c4c4c] hover:bg-[#e0e0e0] rounded-lg shadow-md dark:bg-[#2e2e2e] dark:text-[#f0f0f0] dark:hover:bg-[#3e3e3e] transition-all duration-300 ease-in-out"
                onClick={() => setShowAddTodoForm(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#4c4c4c] text-[#f0f0f0] hover:bg-[#5c5c5c] rounded-lg shadow-md transition-all duration-300 ease-in-out">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve((reader.result as string).split(",")[1]); // Data URLからBase64部分を取り出す
    };
    reader.onerror = reject;
  });
}
