import React from "react";
import { options } from "./VideoStyle";
import Image from "next/image";

export const Preview = ({ formData }) => {
  const selectedVideo =
    formData && options?.find((item) => item?.name === formData?.videoStyle);
  return (
    <div className=" relative">
      <h2 className="mb-3 text-2xl">Preview</h2>
      {selectedVideo?.url&&<Image
        src={selectedVideo?.url}
        alt="selected Video"
        width={1000}
        height={300}
        className="w-full h-[65vh] max-w-sm min-w-md object-cover rounded-xl "
      />}
      <h2
        className={`${formData?.caption?.style} absolute bottom-4 w-full text-center`}
      >
        {formData?.caption?.name}
      </h2>
    </div>
  );
};
