"use client";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Header } from "./_component/Header";
import { Hero } from "./_component/Hero";
import { motion } from "framer-motion";

export default function Home() {
  const [videoAllData, setVideoAllData] = useState([]);
  const convex = useConvex();

  const GetVideoList = async () => {
    const result = await convex.query(api.videoData.GetAllVideo);
    console.log(result, "resultresultresult");
    setVideoAllData(result);
  };

  useEffect(() => {
    GetVideoList();
  }, []);

  // Animation variants for each card
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

  return (
    <div className="container m-auto mb-9">
      <Header />
      <Hero />

      {/* all video */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 p-5">
        {videoAllData?.length > 0 ? (
          videoAllData.map((video, index) => (
            <motion.div
              key={video._id || index}
              className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={video?.images[0]}
                alt={video.title}
                width={500}
                height={750}
                className="w-full h-full object-cover rounded-lg aspect-[2/3]"
              />
              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent px-4 py-3">
                <h3
                  className="text-white text-lg font-semibold truncate"
                  title={video?.title}
                >
                  {video?.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {moment(video?._creationTime).fromNow()}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No videos available yet.
          </p>
        )}
      </div>
    </div>
  );
}
