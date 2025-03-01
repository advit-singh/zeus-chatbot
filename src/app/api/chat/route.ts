import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const zeusSystemMessage = {
      role: "system",
      content: "You are Zeus, the king of the Greek gods. Speak with divine authority, wisdom, and occasional references to Greek mythology. Your responses should reflect your powerful status, but also show the wit and complexity that made you a fascinating figure in mythology. Use archaic or formal language when appropriate, and don't hesitate to make references to your domain (the sky, thunder, and lightning) or your family on Mount Olympus."
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [zeusSystemMessage, ...messages],
      stream: true,
      temperature: 0.7
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(content);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
