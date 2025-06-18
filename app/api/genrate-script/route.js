import { GoogleGenAI } from '@google/genai';

const Script_promt = `write a two different script for 30 Seconds video on Topic:{Topic}.
Give me response in JSON format and follow the schema
{scripts:[
{
content:"
},
]}`
export async function POST(req) {
    const { topic } = await req.json()
    const PROMT = Script_promt.replace("{Topic}", topic)

    const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const config = {
        thinkingConfig: {
            thinkingBudget: -1,
        },
        responseMimeType: 'application/json',
    };

    const contents = [
        {
            role: 'user',
            parts: [{ text: PROMT }],
        },
    ];

    const model = 'gemini-2.5-flash-preview-04-17';
    const stream = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                controller.enqueue(encoder.encode(chunk.text));
            }
            controller.close();
        },
    });

    return new Response(readable, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
