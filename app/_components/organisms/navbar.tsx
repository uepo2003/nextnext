import React from "react";
import { CiCircleList } from "react-icons/ci";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { UserInfo } from "../molecules/userInfo";
import { StatusCard } from "../molecules/StatusCard";
import { useSetRecoilState } from "recoil";
import { fetchKeyState } from "../../../common/states/todoFormState";
import dynamic from "next/dynamic";

const SearchCard = dynamic(() => import("../molecules/SearchCard"), {
  ssr: true,
});

export const Navbar = () => {
  const setFetchKeyState = useSetRecoilState(fetchKeyState);
  return (
    <div>
      <nav className="space-y-2">
        <button
          className="w-60 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#4c4c4c] hover:bg-[#e0e0e0] hover:text-[#2e2e2e] dark:text-[#f0f0f0] dark:hover:bg-[#3e3e3e] dark:hover:text-[#f0f0f0] shadow-md"
          onClick={() => setFetchKeyState("all")}
        >
          <IconContext.Provider value={{ color: "#333" }}>
            <CiCircleList className="h-4 w-4" />
          </IconContext.Provider>
          All
        </button>
        <button
          className="w-60 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#4c4c4c] transition-colors hover:bg-[#e0e0e0] hover:text-[#2e2e2e] dark:text-[#f0f0f0] dark:hover:bg-[#3e3e3e] dark:hover:text-[#f0f0f0] shadow-md"
          onClick={() => setFetchKeyState("complete")}
        >
          <IconContext.Provider value={{ color: "#333" }}>
            <FaCheck className="h-4 w-4" />
          </IconContext.Provider>
          Completed
        </button>
        <button
          className="w-60 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#4c4c4c] transition-colors hover:bg-[#e0e0e0] hover:text-[#2e2e2e] dark:text-[#f0f0f0] dark:hover:bg-[#3e3e3e] dark:hover:text-[#f0f0f0] shadow-md"
          onClick={() => setFetchKeyState("incomplete")}
        >
          <IconContext.Provider value={{ color: "#333" }}>
            <RxCross2 className="h-4 w-4" />
          </IconContext.Provider>
          Incomplete
        </button>
        <div style={{ height: "30px" }}></div>
        <StatusCard />
        <div style={{ height: "30px" }}></div>
        <SearchCard />

        <div className="fixed bottom-8 left-2">
          <UserInfo />
        </div>
      </nav>
    </div>
  );
};
