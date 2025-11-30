import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/login/"], // Disallow admin and login pages
        },
        sitemap: "https://toder.net/sitemap.xml",
    };
}
