"use client";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React from "react";

export const ClickLink = ({name}: {name: string}) => {
  return (
    <>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
        prefetch={false}
        onClick={() => {
          toast({
            title: "このページは建設中です",
            description: "Sinup & Get StartedよりHomeページに移動して下さい",
          });
        }}
      >
       {name}
      </Link>
    </>
  );
};
