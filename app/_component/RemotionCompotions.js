"use client";

import React, { useEffect } from "react";
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
  const freme = useCurrentFrame();

  useEffect(() => {
    videoData && getDurationFrame();
  }, [videoData]);

  const getDurationFrame = () => {
    if (captions) {
      const totaleDUration = captions[captions?.length - 1]?.end * fps;
      setDurationInFrames(totaleDUration);
      return totaleDUration;
    }

  };

  const getCurrentCaption = () => {
    if (captions) {
      const currentTime = freme / 30;
      const currentCaption = captions.find(
        (item) => currentTime >= item?.start && currentTime <= item?.end
      );
      return currentCaption ? currentCaption?.word : "";
    }
  };
  console.log(videoData?.audioUrl, "captionscaptions", getCurrentCaption());

  return (
    <div>
      <AbsoluteFill>
        {imagesList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imagesList?.length;
          const duration = getDurationFrame();
          const scale = (i) =>
            interpolate(
              freme,
              [startTime, startTime + duration / 2, startTime + duration],
              i % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
          return (
            <Sequence key={item} from={startTime} durationInFrames={duration}>
              <AbsoluteFill>
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
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
      {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
    </div>
  );
};

export default RemotionCompotions;
