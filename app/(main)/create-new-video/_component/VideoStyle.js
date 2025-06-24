import Image from "next/image";
import React, { useState } from "react";
export const options = [
  {
    url: "/realistic.webp",
    name: "realistic",
  },

  {
    url: "/cinematic.webp",
    name: "cinematic",
  },

  {
    url: "/3d.webp",
    name: "3d",
  },
  {
    url: "/watercolor.webp",
    name: "watercolor",
  },
  ,
  {
    url: "/cyberpunk.webp",
    name: "cyberpunk",
  },
  {
    url: "/gta.webp",
    name: "gta",
  },
  {
    url: "/anim.webp",
    name: "anim",
  },
];

export const VideoStyle = ({ onHandleInputChange }) => {
  const [selectedStyle, setSelectedStyle] = useState("");
  return (
    <div className="mt-5">
      <h2>Video Style</h2>
      <p className="tect-sm text-gray-400 mb-1">Select video style</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {options?.map((option, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => {
              setSelectedStyle(option.name);
              onHandleInputChange("videoStyle", option.name);
            }}
          >
            <Image
              src={option?.url}
              alt={option?.name}
              width={500}
              height={120}
              className={`object-cover h-[90px] lg:h-[130px] xl:h-[180px] rounded-lg p-1 hover:border border-gray-300 cursor-pointer w-full ${selectedStyle == option.name && "border"}`}
            />
            <h2 className=" absolute bottom-1 text-center w-full">
              {option?.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
