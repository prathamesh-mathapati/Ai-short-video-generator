import axios from "axios";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
const BASE_URL = 'https://aigurulab.tech';

export const GenerateVideoData = inngest.createFunction(
  { id: "my-app-generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, voice } = event?.data;
    // console.log("process.env.NEXT_PUBLIC_AI_GURU_LAB", script);


    const GenerateAudioFile = await step.run("generate-video-data", async () => {
      try {
        // console.log("Sending to API:", { input: script, voice });

        const result = await axios.post(
          BASE_URL + '/api/text-to-speech',
          { input: script, voice },
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_AI_GURU_LAB,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("Audio URL:", result.data);
        return result.data.audio;

      } catch (error) {
        if (error.response) {
          console.error("API returned error status:", error.response.status);
          console.error("Error body:", error.response.data); // <- see this
        } else {
          console.error("Network or unknown error:", error.message);
        }
        throw error;
      }
    });


    // Optional: Return or use `GenerateAudioFile`
    return {
      audioUrl: GenerateAudioFile,
    };
  }
);
