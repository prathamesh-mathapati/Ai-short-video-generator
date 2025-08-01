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
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({ topic: "Historic Story" });
  const [loading, setLoading] = useState(false);
  const CreateInitialVideoRecore = useMutation(api.videoData.CreateVideoData);
  const { user } = useAuthContext();
  const router = useRouter();

  const onHandleInputChange = (filedName, filedValue) => {
    setFormData((prev) => ({
      ...prev,
      [filedName]: filedValue,
    }));
  };

  const GenerateVideo = async () => {
    if (user?.credits <= 0) {
      toast.error("Please add more credits!");
      return;
    }

    const missingFields = [];

    if (!formData?.Title) missingFields.push("Title");
    if (!formData?.script) missingFields.push("Script");
    if (!formData?.caption) missingFields.push("Caption");
    if (!formData?.videoStyle) missingFields.push("Video Style");
    if (!formData?.voice) missingFields.push("Voice");

    if (missingFields.length > 0) {
      toast.error(`Please fill out: ${missingFields.join(", ")}`);
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
        credits: user?.credits,
      });

      await axios.post("/api/genrate-video-data", {
        ...formData,
        recordId: resp,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("API error:", err);
      toast.error("Something went wrong while generating the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <motion.div
        className="p-15"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl mb-6"
          variants={sectionVariants}
        >
          Create New Video
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
          <motion.div
            className="col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto"
            variants={sectionVariants}
          >
            <Topic onHandleInputChange={onHandleInputChange} />
            <VideoStyle onHandleInputChange={onHandleInputChange} />
            <Voice onHandleInputChange={onHandleInputChange} />
            <Captions onHandleInputChange={onHandleInputChange} />

            <motion.div whileTap={{ scale: 0.95 }}>
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
            </motion.div>
          </motion.div>

          <motion.div className="col-span-1" variants={sectionVariants}>
            <Preview formData={formData} />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CreateNewVideo;