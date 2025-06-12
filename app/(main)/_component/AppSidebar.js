"use client"
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Gem, HomeIcon, LucideFile, Share, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuItems = [
  { title: "Home", url: "/dashboard", icon: HomeIcon },
  { title: "Create new Video", url: "/create-new-video", icon: LucideFile },
  { title: "Explore", url: "/explore", icon: Share },
  { title: "Billing", url: "/billing", icon: Wallet },
];

export const AppSidebar = () => {
  const path=usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className=" flex items-center gap-3 p-3">
            <Image src={"/Ai-short.png"} height={50} width={50} alt="log" />
            <h2 className="text-xl font-bold">Video Gen</h2>
          </div>
          <p className="text-lg text-gray-400 text-center mt-3">
            Ai Video short generator
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
        <div className="flex text-center mx-5 mt-10">
          <Button className="W-full">+ Create New Video</Button>
        </div>
        <SidebarMenu>
      {MenuItems.map((menu,index)=>(
        <SidebarMenuItem className='mt-3'>
          <SidebarMenuButton className='px-8 py-5' isActive={path===menu?.url?true:false}>
            <Link href={menu?.url} className="flex gap-4 items-center w-full">
            <menu.icon/>
            <span>{menu?.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
        </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-5 border rounderd-lg mb-6 bg-gray-800">
          <div className="flex items-center justify-between">
            <Gem className="text-gray-400"/>
            <h2 className="text-gray-400">
              5 Credits Left
            </h2>
          </div>
          <Button className=
          "w-full mt-3">
            By More Creates
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
