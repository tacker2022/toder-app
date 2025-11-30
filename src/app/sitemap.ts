import { MetadataRoute } from "next";
// import { getPosts } from "@/actions/posts"; // We haven't implemented posts yet, so we'll comment this out for now

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://toder.net";

    // Static routes
    const routes = [
        "",
        "/about",
        "/contact",
        "/blog",
        "/apply",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic routes (e.g., blog posts)
    // const posts = await getPosts();
    // const postRoutes = posts.map((post) => ({
    //   url: `${baseUrl}/blog/${post.slug}`,
    //   lastModified: new Date(post.created_at),
    //   changeFrequency: "weekly" as const,
    //   priority: 0.7,
    // }));

    return [...routes /*, ...postRoutes */];
}
