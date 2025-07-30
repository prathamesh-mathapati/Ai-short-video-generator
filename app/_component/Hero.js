"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Authentication } from "./Authentication";
import { useAuthContext } from "../provider";
import Link from "next/link";

export const Hero = () => {
    const { user } = useAuthContext();

  return (
    <div className="p-10 flex flex-col items-center justify-center  mt-24 md:px-20 lg:px-36 xl:px-48">
      <h2 className="font-bold text-6xl text-center">
        AI Youtube Short Video Generator
      </h2>
      <p className="mt-4 text-2xl text-center text-gray-500">
        🤖 AI generates scripts, images, and voiceovers in seconds. <br />⚡
        Create, edit, and publish engaging shorts with ease!
      </p>
      <div className="mt-7 gap-8 flex">
        <Button variant="secondary">Explore</Button>


         {!user ? (
        <Authentication>
          <Button>Get Start</Button>
        </Authentication>
      ) : (
        <div className="flex items-center gap-3">
          {" "}
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};
