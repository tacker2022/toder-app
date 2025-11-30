# Vercel Deployment Guide

This project is optimized for deployment on [Vercel](https://vercel.com), the creators of Next.js.

## 1. Preparation
Ensure your project is pushed to your GitHub repository.

## 2. Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and log in (you can use your GitHub account).
2. Click on **"Add New..."** -> **"Project"**.
3. In the "Import Git Repository" section, find `toder-app` and click **Import**.

## 3. Configure Project
Vercel automatically detects Next.js. You only need to add your environment variables.

### Environment Variables
Expand the **"Environment Variables"** section and add the following from your `.env.local` file:

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://jeglhzoaknjlawnuqefm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Paste your Anon Key here)* |

## 4. Deploy
Click **Deploy**.

Vercel will build your application. Once finished, you will get a live URL (e.g., `toder-app.vercel.app`).

## 5. Custom Domain (Optional)
1. Go to your project dashboard on Vercel.
2. Click **Settings** -> **Domains**.
3. Add your custom domain (e.g., `toder.org.tr`) and follow the DNS configuration instructions.
