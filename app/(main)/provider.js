import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_component/AppSidebar";
import AppHeder from "./_component/AppHeder";

const DashboardProvider = ({ children }) => {
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
