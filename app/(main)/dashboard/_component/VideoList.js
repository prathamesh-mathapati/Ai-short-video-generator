"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { RefreshCcw } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const { user } = useAuthContext();
  const convex = useConvex();
  const GetUserVideoList = async () => {
    const result =
      user?._id &&
      (await convex.query(api.videoData.GetVideoData, {
        uid: user._id,
      }));
    const isPendingVideo = result?.find((item) => item?.status === "P");
    isPendingVideo && GetPendingVideoStatus(isPendingVideo);
    setVideoList(result);
  };

  useEffect(() => {
    user && GetUserVideoList();
  }, [user]);

  const GetPendingVideoStatus = (pendingVideo) => {
    const intervalId = setInterval(async () => {
      const result = await convex.query(api.videoData.GetVideoByID, {
        videoId: pendingVideo?._id,
      });
      if (result?.status == "C") {
        clearInterval(intervalId);
        console.log("Video Process Completed");
        GetUserVideoList();
      }
      console.log("Still Pending...");
    }, 5000);
  };

  return (
    <div className="h-full">
      {videoList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
          <Image src={"/Ai-short.png"} alt="logo" width={60} height={60} />
          <h2 className=" text-gray-400 text-lg">
            You don't have any video created. Create new one
          </h2>
          <Link href={"/create-new-video"}>
            <Button>+ Create New Video</Button>
          </Link>
        </div>
      ) : (
        <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4  p-5">
          {videoList?.map((video, index) => (
            <div className=" relative" key={index}>
              {video?.status === "C" ? (
                <Link href={`/play-video/${video?._id}`}>
                  <Image
                    src={video?.images[0]}
                    alt={video.title}
                    width={500}
                    height={500}
                    className="w-full object-cover rounded-lg aspect-[2/3]"
                  />
                </Link>
              ) : (
                <div className="aspect-[2/3] p-5 w-full rounded-xl bg-slate-500 flex items-center justify-center gap-2">
                  <RefreshCcw className="animate-spin" /> <h2>Generating...</h2>
                </div>
              )}
              <div className="bottom-3 px-5 w-full absolute">
                <h2>{video?.title}</h2>
                <h2 className="text-sm">
                  {moment(video?._creationTime).fromNow()}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
