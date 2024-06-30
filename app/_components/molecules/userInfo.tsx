import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

export const UserInfo = () => {
  const { data: session } = useSession();
  const memoizedSession = useMemo(() => session, [session]);

  return (
    <div
      className="flex items-center gap-4 pl-2 pr-5 py-4 transition-colors duration-200 hover:bg-gray-300 rounded-lg"
      style={{ width: "270px" }}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={memoizedSession?.user?.image || ""} />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 text-base">
        <div className="font-semibold">{memoizedSession?.user?.name}</div>
        <div className="text-muted-foreground text-sm">
          {memoizedSession?.user?.email}
        </div>
      </div>
    </div>
  );
};
