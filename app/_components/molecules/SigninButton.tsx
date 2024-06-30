"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { signIn } from "next-auth/react";

export function SigninButton({
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button
      {...props}
      onClick={async () => {
        await signIn("GitHub", { callbackUrl: "/home" });
      }}
    >
      Sinup & Get Started
    </Button>
  );
}
