import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set in environment variables");
        }

        const result = streamText({
            model: openai("gpt-4o-mini"),
    - ** İletişim **: Sorular için info@toder.org.tr adresine mail atılabilir.

            Kurallar:
            - Her zaman nazik ve saygılı ol.
    - Bilmediğin bir konu olursa "Bu konuda şu an net bir bilgim yok, lütfen iletişim sayfasından yetkililere ulaşın" de.
    - Cevapların kısa, öz ve anlaşılır olsun.
    - Türkçe konuş.
    `,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
