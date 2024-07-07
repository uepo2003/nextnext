import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import React, { useRef } from "react";
import { SearchIcon } from "../atoms/icons";
import { Button } from "../../../components/ui/button";
import { useTodoList } from "../../_hooks/useTodoList";
import { redirect } from "next/navigation";

const SearchCard = () => {

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <>
      <Card className="flex w-full max-w-md p-6 bg-background shadow-xl rounded-2xl">
        <form
          action={async (data: FormData) => {
            const keyword = data.get("keyword");
            formRef.current?.reset();
            redirect(`/search?q=${keyword}`);
          }}
          ref={formRef}
        >
        <div className="space-y-4 flex flex-col">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Discover Something Todo</h2>
          </div>
          <div className="relative">
            <Input
              autoComplete="off"
              name="keyword"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          <div className="mx-auto">
            <Button
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
        </form>
      </Card>
    </>
  );
};

export default SearchCard;
