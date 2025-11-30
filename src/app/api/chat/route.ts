import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: openai("gpt-4o"),
            system: `Sen TODER (Tiyatro Oyuncuları Derneği) için çalışan yardımsever, profesyonel ve bilgili bir yapay zeka asistanısın.
    
    Amacın: Ziyaretçilerin sorularını yanıtlamak, üyelik süreçleri hakkında bilgi vermek ve derneğin vizyonunu anlatmak.

    Bilgi Bankası:
    - **TODER Nedir?**: Tiyatro Oyuncuları Derneği, sektördeki oyuncuların haklarını koruyan, mesleki standartları yükselten ve dijital dönüşüme öncülük eden bir kuruluştur.
    - **Üyelik**: Üyelik başvurusu "Üyelik Başvurusu" sayfasından yapılır. Başvuru formunu doldurup gerekli belgeleri yüklemek gerekir. Yönetim kurulu başvuruyu değerlendirir.
    - **Komisyonlar**: Hukuk, Eğitim, Sosyal İşler gibi çeşitli komisyonlar vardır. Üyeler bu komisyonlarda aktif görev alabilir.
    - **Etkinlikler**: Dernek düzenli olarak eğitimler, seminerler ve ödül törenleri düzenler.
    - **İletişim**: Sorular için info@toder.org.tr adresine mail atılabilir.

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
