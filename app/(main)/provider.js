"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { AppSidebar } from "./_component/AppSidebar";
import AppHeder from "./_component/AppHeder";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";

const DashboardProvider = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    user && CheckedUserAuthenticated();
  }, [user]);
  const CheckedUserAuthenticated = () => {
    if(!user) router.replace('/')
  };

  return (
    <div>
      {" "}
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <AppHeder />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};
export default DashboardProvider;
