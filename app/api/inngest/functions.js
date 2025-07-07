import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import ImagePromptFunction from "@/configs/Aimodes";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const ImagePromptScript = `Generate Image prompt of {style} style with all deatils for each scene for 30 seconds video : script: {script}
Just Give specifing image prompt depends on the story line
do not give camera angle image prompt
Follow the Folowing schema and return JSON data (Max 4-5 Images)
{

  imagePrompt:'',

  sceneContent: '<Script Content>'

}`;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech";

export const GenerateVideoData = inngest.createFunction(
  { id: "my-app-generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, voice, videoStyle, recordId,creadits } = event?.data;
    //  Make API call to generate audio
    const GenerateAudioFile = await step.run(
      "generate-video-data",
      async () => {
        const result = await axios.post(
          `${BASE_URL}/api/text-to-speech`,
          {
            input: script,
            voice: voice,
          },
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_AI_GURU_LAB,
              "Content-Type": "application/json",
            },
          }
        );

        return result.data.audio;
      }
    );

    // Make API captions to deepgram
    const GenerateCaptions = await step.run(
      "generate-caption-data",
      async () => {
        const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
        const { result, error } =
          await deepgram.listen.prerecorded.transcribeUrl(
            {
              url: GenerateAudioFile,
            },
            // STEP 3: Configure Deepgram options for audio analysis
            {
              model: "nova-3",
              smart_format: true,
            }
          );
        return result.results.channels[0].alternatives[0].words;
      }
    );

    // Make images promting by using from Script
    const GenerateImagePrompts = await step.run(
      "generate-image-prompts",
      async () => {
        const FINAL_PROMPTS = ImagePromptScript.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script);

        const result = await ImagePromptFunction(FINAL_PROMPTS); // ✅ FIXED USAGE

        // Genreate images

        return result;
      }
    );

    const GenerateImages = await step.run("generate-images", async () => {
      let images = [];
      images = await Promise.all(
        GenerateImagePrompts.map(async (ele) => {
          const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: ele.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AI_GURU_LAB, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          return result.data.image;
        })
      );
      return images;
    });

    // Save all data in DB

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    const UpdateDB = await step.run("update-dB", async () => {
      if (!recordId) throw new Error("Missing recordId");
      console.log(recordId, "recordIdrecordIdrecordId");

      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId, // ✅ must be a valid Convex Id<"videoData">
        audioUrl: GenerateAudioFile,
        images: GenerateImages,
        captionsJson: GenerateCaptions,
      });

      return result;
    });

    return "Executed Succesfully";
  }
);
