import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export default async function ImagePromptFunction(imagePrompt) {
const config = {
    responseMimeType: "application/json",
  };
  const contents = [
    {
      role: "user",
      parts: [{ text: imagePrompt }],
    },
  ];

  const model = "gemini-1.5-flash";

  const stream = await genAI.models.generateContentStream({
    model,
    config,
    contents,
  });

  let finalText = "";

  for await (const chunk of stream) {
    if (chunk.text) {
      finalText += chunk.text;
    }
  }
  console.log(typeof finalText.trim());
  

  return  JSON.parse(finalText.trim())
}
