"use client";
import { useAuthContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useConvex } from "convex/react";
import { RefreshCcw } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const convex = useConvex();

  const GetUserVideoList = async () => {
    setLoading(true);
    const result =
      user?._id &&
      (await convex.query(api.videoData.GetVideoData, {
        uid: user._id,
      }));
    const isPendingVideo = result?.find((item) => item?.status === "P");
    isPendingVideo && GetPendingVideoStatus(isPendingVideo);
    setVideoList(result || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) GetUserVideoList();
  }, [user]);

  const GetPendingVideoStatus = (pendingVideo) => {
    const intervalId = setInterval(async () => {
      const result = await convex.query(api.videoData.GetVideoByID, {
        videoId: pendingVideo?._id,
      });
      if (result?.status === "C") {
        clearInterval(intervalId);
        console.log("Video Process Completed");
        GetUserVideoList();
      }
      console.log("Still Pending...");
    }, 5000);
  };

  // Animation variants for each video card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Skeleton loader card variant for animation
  const skeletonVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Number of skeleton placeholders to show
  const skeletonCount = 6;

  return (
    <div className="h-full">
      {loading ? (
        // Skeleton loading cards
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 p-5">
          {[...Array(skeletonCount)].map((_, i) => (
            <motion.div
              key={i}
              className="relative rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700 aspect-[2/3]"
              variants={skeletonVariants}
              animate="pulse"
            >
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-400/80 to-transparent rounded-b-lg"></div>
            </motion.div>
          ))}
        </div>
      ) : videoList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
          <Image src={"/Ai-short.png"} alt="logo" width={60} height={60} />
          <h2 className="text-gray-400 text-lg">
            You don't have any video created. Create new one
          </h2>
          <Link href={"/create-new-video"}>
            <Button>+ Create New Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 p-5">
          {videoList?.map((video, index) => (
            <motion.div
              key={video._id || index}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              {video?.status === "C" ? (
                <Link href={`/play-video/${video?._id}`}>
                  <Image
                    src={video?.images[0]}
                    alt={video.title}
                    width={500}
                    height={500}
                    className="w-full object-cover rounded-lg aspect-[2/3]"
                    priority={index < 3} // prioritize first images loading
                  />
                </Link>
              ) : (
                <div className="aspect-[2/3] p-5 w-full rounded-xl bg-slate-500 flex items-center justify-center gap-2 text-white font-semibold text-lg">
                  <RefreshCcw className="animate-spin" size={24} />
                  Generating...
                </div>
              )}
              <div className="bottom-3 px-5 w-full absolute bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-b-lg">
                <h2
                  className="text-white font-semibold truncate"
                  title={video?.title}
                >
                  {video?.title}
                </h2>
                <h2 className="text-sm text-gray-300">
                  {moment(video?._creationTime).fromNow()}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
