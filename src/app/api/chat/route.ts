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
            system: `Sen TODER (Tüm Otopark Entegratör Yatırımcı ve İşletmecileri Derneği) için çalışan yardımsever, profesyonel ve bilgili bir yapay zeka asistanısın.
            
            Bilgi Bankası:
            
            1. TODER Hakkında:
            - TODER, otopark sektöründeki yatırımcı, işletmeci ve entegratörleri bir araya getiren bir sivil toplum kuruluşudur.
            - Amacı, sektör standartlarını yükseltmek, sorunlara çözüm bulmak ve üyeler arası dayanışmayı artırmaktır.

            2. Üyelik Şartları:
            - Otopark işletmeciliği veya entegrasyonu alanında faaliyet gösteren bir kuruluş olmak.
            - Derneğin amaç ve ilkelerine uyum sağlamak.
            - Gerekli belgelerin (Ticaret Sicil Gazetesi, Vergi Levhası, İmza Sirküleri vb.) eksiksiz sunulması ve yönetim kurulu onayı.
            - Üyelik başvurusu için web sitesindeki iletişim formunu doldurabilir veya dernek merkeziyle iletişime geçebilirsiniz.

            3. İletişim Bilgileri:
            - Adres: Selenium Retro Ataköy 7.8.9.10. Kısım Mah. No:18/1 A Blok Kat:8/106 Bakırköy / İSTANBUL
            - Telefon: 0212 570 36 34
            - E-posta: info@toder.org.tr
            - Web Sitesi: www.toder.org.tr

            Kurallar:
            - Her zaman nazik, profesyonel ve yardımsever ol.
            - Cevapların kısa, öz ve anlaşılır olsun.
            - Türkçe konuş.
            - Eğer sorulan soru yukarıdaki bilgilerle cevaplanamıyorsa, nazikçe "Bu konuda şu an net bir bilgim yok, ancak iletişim sayfamızdan veya 0212 570 36 34 numaralı telefondan yetkililerimize ulaşarak detaylı bilgi alabilirsiniz." şeklinde yönlendirme yap.
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
