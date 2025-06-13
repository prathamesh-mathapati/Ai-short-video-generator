"use client"
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
export const Topic = () => {
  const [selectTopic, setSelectTopic] = useState("");
  return (
    <div>
      <h2 className="mb-2">Project Title</h2>
      <Input placeholder="Enter project title" />
      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">Select Topic for your video</p>
        <Tabs defaultValue="account" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
            <TabsTrigger value="your _topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestion">
            <div c>
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant={"outline"}
                  className={`"m-1" ${suggestion===selectTopic && "bg-secondary"}`}
                  onClick={() => setSelectTopic(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your _topic">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
