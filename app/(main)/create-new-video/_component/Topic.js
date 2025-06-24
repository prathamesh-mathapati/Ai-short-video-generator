"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SparkleIcon, SparklesIcon } from "lucide-react";
import axios from "axios";
const suggestions = [
  "Historic Story",
  "Kids Story",
  "Movie Stories",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  " Tech Breakthroughs",
  "True Crime Stories",
  "Fantasy Adventures",
  "Science Experiments",
  "Motivational Stories",
];
export const Topic = ({ onHandleInputChange }) => {
  const [selectTopic, setSelectTopic] = useState("Historic Story");
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(null);
  const [script, setScript] = useState([]);
  const [loding, setLoding] = useState(false);
  const GenrateScript = async () => {
    setLoding(true);
    setSelectedScriptIndex(null);
    const result = await axios.post("/api/genrate-script", {
      topic: selectTopic,
    });
    setScript(result.data?.scripts);
    setLoding(false);
  };
  
  return (
    <div>
      <h2 className="mb-2">Project Title</h2>
      <Input
        placeholder="Enter project title"
        onChange={(e) => onHandleInputChange("Title", e.target.value)}
      />
      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600 ">Select Topic for your video</p>
        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
            <TabsTrigger value="your _topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestion">
            <div>
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant={"outline"}
                  className={`m-1 ${suggestion === selectTopic && "bg-secondary"}`}
                  onClick={() => {
                    setSelectTopic(suggestion),
                      onHandleInputChange("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your _topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Enter your topic"
                onChange={(e) => onHandleInputChange("topic", e.target.value)}
                className={"mt-2"}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    {
      !script.length > 0 &&<Button
          className="mt-5"
          size="sm"
          onClick={() => GenrateScript()}
          disabled={loding}
        >
          {loding ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />}{" "}
          Genrate Script
        </Button>
    }
        
      
      {script?.length > 0 && (
        <div className="mt-5">
          <h2>Select the script</h2>
          <div className="grid grid-cols-2 gap-5">
            {script.map((item, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg mt-1 cursor-pointer ${selectedScriptIndex === index && "bg-secondary border-gray-200"}`}
                onClick={() => {setSelectedScriptIndex(index), onHandleInputChange("script", item.content)}}
              >
                <h2 className=" line-clamp-4 text-sm text-gray-300 ">
                  {item.content}
                </h2>
              </div>
            ))}{" "}
          </div>
        </div>
      )}
    </div>
  );
};
