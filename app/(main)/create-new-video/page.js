"use client"
import React, { useState } from "react";
import { Topic } from "./_component/Topic";
import { VideoStyle } from "./_component/VideoStyle";
import { Voice } from "./_component/Voice";
import { Captions } from "./_component/Captions";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { Preview } from "./_component/Preview";
import axios from "axios";

const CreateNewVideo = () => {
  const [formData,setFormData]=useState({})
  const onHandleInputChange=(filedName,filedValue)=>{
    setFormData(per=>({
      ...per,[filedName]:filedValue
    }))
  }
const GenerateVideo = async () => {
  console.log(formData,"formDataformData");
  
  if (
    !formData?.Title ||
    !formData?.caption ||
    !formData?.topic ||
    !formData?.videoStyle ||
    !formData?.voice
  ) {
    console.log("error", "Enter all Fields");
    return; // ⛔ stop further execution
  }

  try {
    const result = await axios.post("/api/genrate-video-data", {
      ...formData
    });
    console.log(result, "result");
  } catch (err) {
    console.error("API error:", err);
  }
}

  
  return (
    <div className="p-15">
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className=" col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto ">
          <Topic onHandleInputChange={onHandleInputChange}/>
          <VideoStyle onHandleInputChange={onHandleInputChange}/>
          <Voice onHandleInputChange={onHandleInputChange}/>
          <Captions onHandleInputChange={onHandleInputChange}/>
          <Button className='w-full mt-5' onClick={GenerateVideo}><WandSparkles/>Generate Video</Button>
        </div>
        <div  className="col-span-1">
        <Preview formData={formData}/>  
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
