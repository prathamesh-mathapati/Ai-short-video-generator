"use client";
import React, { useState } from "react";
import { Topic } from "./_component/Topic";
import { VideoStyle } from "./_component/VideoStyle";
import { Voice } from "./_component/Voice";
import { Captions } from "./_component/Captions";
import { Button } from "@/components/ui/button";
import { WandSparkles, Loader2 } from "lucide-react";
import { Preview } from "./_component/Preview";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/app/provider";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const CreateInitialVideoRecore = useMutation(api.videoData.CreateVideoData);
  const { user } = useAuthContext();

  const onHandleInputChange = (filedName, filedValue) => {
    setFormData((prev) => ({
      ...prev,
      [filedName]: filedValue,
    }));
  };

  const GenerateVideo = async () => {
    if (
      !formData?.Title ||
      !formData?.caption ||
      !formData?.topic ||
      !formData?.videoStyle ||
      !formData?.voice
    ) {
      console.log("error", "Enter all Fields");
      return;
    }

    try {
      setLoading(true);
      const resp = await CreateInitialVideoRecore({
        title: formData?.Title,
        caption: formData?.caption,
        topic: formData?.topic,
        videoStyle: formData?.videoStyle,
        voice: formData?.voice,
        script: formData?.script,
        captionsJson: formData?.captionsJson,
        uid: user?._id,
        createdBy: user?.email,
        images: formData?.images,
        audioUrl: formData?.audioUrl,
      });
      
        await axios.post("/api/genrate-video-data", { ...formData,recordId :resp});    
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-15">
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto">
          <Topic onHandleInputChange={onHandleInputChange} />
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <Voice onHandleInputChange={onHandleInputChange} />
          <Captions onHandleInputChange={onHandleInputChange} />

          <Button
            className="w-full mt-5"
            onClick={GenerateVideo}
            disabled={loading} // 👈 disable when loading
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              <>
                <WandSparkles className="mr-2" />
                Generate Video
              </>
            )}
          </Button>
        </div>

        <div className="col-span-1">
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
