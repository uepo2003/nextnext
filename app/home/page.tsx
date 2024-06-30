"use client";
import React from "react";
import { HomePage } from "../_pages/home";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

const Home = () => {
  return (
    <SessionProvider>
      <RecoilRoot>
        <HomePage />
      </RecoilRoot>
    </SessionProvider>
  );
};

export default Home;
