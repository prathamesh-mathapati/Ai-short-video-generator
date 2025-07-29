"use client";

import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionCompotions = ({ videoData, setDurationInFrames }) => {
  const captions = videoData?.captionsJson;
  const imagesList = videoData?.images;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const [durationFrame, setDurationFrame] = useState(0);

  // Calculate total duration in frames from captions
  useEffect(() => {
    if (captions && captions.length > 0) {
      const totalDuration = captions[captions.length - 1].end * fps;
      if (totalDuration > 0) {
        setDurationFrame(totalDuration);
        setDurationInFrames(totalDuration);
      }
    }
  }, [captions, fps, setDurationInFrames]);

  const getCurrentCaption = () => {
    if (!captions || captions.length === 0) return "";
    const currentTime = frame / fps;
    const currentCaption = captions.find(
      (item) => currentTime >= item.start && currentTime <= item.end
    );
    return currentCaption?.word || "";
  };

  // Prevent rendering until duration is valid
  if (durationFrame <= 0 || !imagesList?.length) {
    return null; // Optionally render a loading UI
  }

  return (
    <div>
      <AbsoluteFill>
        {imagesList.map((item, index) => {
          const startTime = (index * durationFrame) / imagesList.length;

          // Ensure input range is strictly increasing
          const inputRange = [
            startTime,
            startTime + durationFrame / 2,
            startTime + durationFrame,
          ];

          if (inputRange[0] === inputRange[1] || inputRange[1] === inputRange[2]) {
            console.warn("Invalid inputRange for interpolate:", inputRange);
            return null; // Skip broken image
          }

          const scale = interpolate(
            frame,
            inputRange,
            index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <Sequence key={item} from={Math.floor(startTime)} durationInFrames={Math.floor(durationFrame)}>
              <AbsoluteFill>
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale})`,
                  }}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          color: "#fff",
          justifyContent: "center",
          bottom: 200,
          height: 150,
          textAlign: "center",
          top: undefined,
        }}
      >
        <h2 className={videoData?.caption?.style}>{getCurrentCaption()}</h2>
      </AbsoluteFill>

      {videoData?.audioUrl && <Audio src={videoData.audioUrl} />}
    </div>
  );
};

export default RemotionCompotions;
