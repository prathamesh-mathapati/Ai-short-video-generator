"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Authentication } from "./Authentication";
import { useAuthContex } from "../provider";

export const Header = () => {
  const { user } = useAuthContex();
  return (
    <div className=" flex items-center justify-between p-4">
      {" "}
      <div className=" flex items-center gap-3">
        <Image src={"/Ai-short.png"} height={50} width={50} alt="log" />
        <h2 className="text-xl font-bold">Video Gen</h2>
      </div>
      {!user ? (
        <Authentication>
          <Button>Get Start</Button>
        </Authentication>
      ) : (
        <div className="flex items-center gap-3">
          {" "}
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>{" "}
          <Image
            src={user.photoURL}
            height={40}
            width={40}
            alt="profile"
            className=" rounded-full"
          />
        </div>
      )}
    </div>
  );
};
