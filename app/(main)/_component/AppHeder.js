"use client";
import { useAuthContext } from "@/app/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

const AppHeder = () => {
  const { user } = useAuthContext()

  return (
    <div className="p-3 flex justify-between">
      <SidebarTrigger />
      <Image
        src={user?.photoURL}
        height={30}
        width={30}
        alt="profile"
        className=" rounded-full"
      />
    </div>
  );
};

export default AppHeder;
