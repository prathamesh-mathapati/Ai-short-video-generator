"use client"
import React, { useEffect, useState } from "react";
import RemotionPlayer from "../_component/RemotionPlayer";
import VideoInfo from "../_component/VideoInfo";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";

 const Playpage = () => {
  const convex=useConvex();
  const {videoId}=useParams()
  const [videoData,setVideoData]=useState()
  
  useEffect(()=>{
    videoId && GetVideaDataId()
  },[videoId])

  const GetVideaDataId=async()=>{
    const result= await convex.query(api.videoData.GetVideoByID,{
      videoId:videoId
    })
    setVideoData(result)
  }
  
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
      <div>
        <RemotionPlayer videoData={videoData}/>
      </div>
      <div>
        <VideoInfo videoData={videoData}/>
      </div>
    </div>
  );
};

export default Playpage