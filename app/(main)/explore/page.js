"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    transition: { duration: 0.3 },
  },
};

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

const SkeletonCard = () => (
  <motion.div
    className="relative rounded-lg aspect-[2/3] bg-gray-300"
    variants={skeletonVariants}
    animate="pulse"
  />
);

const Explore = () => {
  const [videoAllData, setVideoAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const convex = useConvex();

  const GetVideoList = async () => {
    setLoading(true);
    const result = await convex.query(api.videoData.GetAllVideo);
    setVideoAllData(result);
    setLoading(false);
  };

  useEffect(() => {
    GetVideoList();
  }, []);

  return (
    <motion.div
      className="p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="font-bold text-3xl mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Explore Other Creators Video
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 p-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading
          ? Array(10)
              .fill(0)
              .map((_, idx) => <SkeletonCard key={idx} />)
          : videoAllData?.length !== 0
          ? videoAllData.map((video, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg overflow-hidden cursor-pointer"
                variants={itemVariants}
                whileHover="hover"
              >
                <Link href={`/play-video/${video?._id}`} className="block">
                  <Image
                    src={video?.images[0]}
                    alt={video.title}
                    width={500}
                    height={750}
                    className="w-full h-full object-cover rounded-lg aspect-[2/3]"
                    priority={index < 3} // prioritize first few images
                  />
                </Link>

                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-b-lg px-5 py-3"
                  initial={{ y: 50, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2
                    className="text-white text-lg font-semibold truncate"
                    title={video?.title}
                  >
                    {video?.title}
                  </h2>
                  <h2 className="text-gray-300 text-sm mt-1">
                    {moment(video?._creationTime).fromNow()}
                  </h2>
                </motion.div>
              </motion.div>
            ))
          : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No videos available yet.
            </p>
          )}
      </motion.div>
    </motion.div>
  );
};

export default Explore;
