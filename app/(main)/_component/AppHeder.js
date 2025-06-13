"use client";
import { useAuthContext } from "@/app/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AppHeder = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    CheckUserAuthenticated();
  }, [user]);

  const CheckUserAuthenticated = () => {
    if (!user) router.replace("/");
  };

  return (
    <div className="p-3 flex justify-between">
      <SidebarTrigger />
      <Image
        src={user?.photoURL || "/profile.png"}
        height={30}
        width={30}
        alt="profile"
        className=" rounded-full"
      />
    </div>
  );
};

export default AppHeder;
