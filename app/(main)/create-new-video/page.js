"use client"
import React, { useState } from "react";
import { Topic } from "./_component/Topic";
import { VideoStyle } from "./_component/VideoStyle";
import { Voice } from "./_component/Voice";

const CreateNewVideo = () => {
  const [formData,setFormData]=useState({})
  const onHandleInputChange=(filedName,filedValue)=>{
    setFormData(per=>({
      ...per,[filedName]:filedValue
    }))
  }
  
  return (
    <div className="p-15">
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
        <div className=" col-span-2 p-7 border rounded-xl">
          <Topic onHandleInputChange={onHandleInputChange}/>
          <VideoStyle onHandleInputChange={onHandleInputChange}/>
          <Voice onHandleInputChange={onHandleInputChange}/>
        </div>
        <div  className=" col-span-2"></div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
