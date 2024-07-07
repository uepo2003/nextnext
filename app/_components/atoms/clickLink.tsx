"use client";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React from "react";

export const ClickLink = () => {
  return (
    <>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
        prefetch={false}
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        About
      </Link>
    </>
  );
};
