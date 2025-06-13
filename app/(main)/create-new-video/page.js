import React from "react";
import { Topic } from "./_component/Topic";

const CreateNewVideo = () => {
  return (
    <div className="p-15">
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
        <div className=" col-span-2 p-7 border rounded-xl">
          <Topic />
        </div>
        <div  className=" col-span-2"></div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
