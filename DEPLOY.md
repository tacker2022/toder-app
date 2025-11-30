# Cloudflare Pages Deployment Guide

Bu projeyi Cloudflare Pages üzerinde yayınlamak için aşağıdaki adımları takip edebilirsiniz.

## 1. Hazırlık
Projenizin GitHub'a yüklü olduğundan emin olun.

## 2. Cloudflare Dashboard
1.  [Cloudflare Dashboard](https://dash.cloudflare.com/) adresine gidin ve giriş yapın.
2.  Sol menüden **Workers & Pages** seçeneğine tıklayın.
3.  **Create application** butonuna tıklayın.
4.  **Pages** sekmesine geçin ve **Connect to Git** butonuna tıklayın.
5.  GitHub hesabınızı bağlayın ve **toder-app** projesini seçin.

## 3. Kurulum Ayarları
Proje seçildikten sonra "Set up builds and deployments" ekranı gelecektir. Aşağıdaki ayarları yapın:

*   **Framework preset:** `Next.js` seçin.
*   **Build command:** `npx @cloudflare/next-on-pages` (Otomatik gelmezse bunu yazın)
*   **Build output directory:** `.vercel/output/static` (Otomatik gelmezse bunu yazın)

## 4. Çevresel Değişkenler (Environment Variables)
Aynı ekranda **Environment variables (advanced)** bölümünü açın ve `.env.local` dosyanızdaki değerleri buraya ekleyin:

| Variable Name | Value |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://jeglhzoaknjlawnuqefm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `(Sizin Anon Key'iniz - .env.local dosyasından kopyalayın)` |

> **Not:** `NODE_VERSION` değişkeni ekleyerek `20` değerini vermeniz önerilir.

## 5. Deploy
**Save and Deploy** butonuna tıklayın. Cloudflare projenizi derleyip yayına alacaktır. İşlem bittiğinde size `toder-app.pages.dev` gibi bir adres verecektir.

## 6. Özel Alan Adı (Custom Domain)
Yayına alındıktan sonra **Custom domains** sekmesinden `toder.org.tr` gibi kendi alan adınızı bağlayabilirsiniz.
