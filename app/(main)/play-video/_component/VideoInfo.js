import { Button } from "@/components/ui/button";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const VideoInfo = ({ videoData }) => {
  console.log(videoData, "videoData");

  return (
    <div className="p-5 border rounded-xl">
      <Link href={"/dashboard"}>
        <h2>
          <ArrowLeft /> Back to Dashboard
        </h2>
      </Link>
      <div className="flex flex-col gap-3">
        <h2 className="mt-5">Project Name: {videoData?.title}</h2>
        <p className="text-gray-500">Vide Style: {videoData?.script}</p>
        <h2>Vide Style: {videoData?.videoStyle}</h2>

        <div className="relative group inline-block w-full">
          <div
            className="absolute bottom-[-40px] mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap 
                  rounded bg-gray-800 text-white text-xs px-2 py-1 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 z-10 pointer-events-none"
          >
           Upgrade your account to enable downloads.
          </div>

          <Button disabled className="cursor-not-allowed w-full">
            <DownloadIcon />
            Export & Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
