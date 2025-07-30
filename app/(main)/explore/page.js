"use client";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [videoAllData, setVideoAllData] = useState([]);
  const convex = useConvex();

  const GetVideoList = async () => {
    const result = await convex.query(api.videoData.GetAllVideo);
    setVideoAllData(result);
  };
  useEffect(() => {
    GetVideoList();
  }, []);

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">Explore Other Creators Video</h2>
      <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4  p-5">
        {videoAllData?.length !== 0 &&
          videoAllData?.map((video, index) => (
            <div className=" relative" key={index}>
              <Link href={`/play-video/${video?._id}`}>
                <Image
                  src={video?.images[0]}
                  alt={video.title}
                  width={500}
                  height={500}
                  className="w-full object-cover rounded-lg aspect-[2/3]"
                />
              </Link>
              <div className="bottom-3 px-5 w-full absolute">
                <h2>{video?.title}</h2>
                <h2 className="text-sm">
                  {moment(video?._creationTime).fromNow()}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Explore;
