import React, { useState } from "react";

const option = [
  {
    name: "Youtuber",
    style:
      " text-yellow-400 text-5xl font-extrabold uppercase tracking-wider shadow-md px-3 py-1 rounded-md",
  },
  {
    name: "Superme",
    style:
      " text-white text-5xl font-bold italic px-3 py-1 rounded-md shadow-[4px_4px_6px_rgba(0,0,0,0.25)]",
  },
  {
    name: "Neon",
    style:
      " text-green-500 text-5xl font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-[4px_4px_6px_rgba(0,0,0,0.25)]",
  },
  {
    name: "Glitch",
    style:
      " ttext-pink-500 text-5xl font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.2)]",
  },
  {
    name: "Fire",
    style:
      " text-red-500 text-5xl font-extrabold uppercase px-3 py-1 rounded-md",
  },
  {
    name: "Futuristic",
    style:
      " text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-300 bg-clip-text text-transparent shadow-[2px_2px_4px_rgba(0,0,0,0.25)]",
  },
];
export const Captions = ({ onHandleInputChange }) => {
  const [selectedStyle, setSelectedStyle] = useState("");

  return (
    <div className="mt-5">
      <h2>Captions style</h2>
      <p className="text-sm text-gray-400">Select Caption style</p>
      <div className="flex flex-wrap gap-4">
        {option.map((item, index) => (
          <div
            key={index}
            className={`p-2 hover:border border-gray-300 cursor-pointer bg-slate-900 rounded-lg ${selectedStyle == item.name && "border"}`}
            onClick={() => {
              setSelectedStyle(item.name);
              onHandleInputChange("caption", item);
            }}
          >
            <h2 className={item.style}>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
