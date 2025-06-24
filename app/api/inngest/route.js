import { serve } from "inngest/next";
import { GenerateVideoData, helloWorld } from "./functions";
import { inngest } from "./client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    GenerateVideoData
    /* your functions will be passed here later! */
  ],
});
