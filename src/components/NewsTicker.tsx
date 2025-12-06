import { getEvents } from "@/actions/events";
import { getPosts } from "@/actions/posts";
import { getLegislations } from "@/actions/legislations";
import NewsTickerClient, { TickerItem } from "./NewsTickerClient";

export default async function NewsTicker() {
    // Fetch data in parallel
    const [postsData, legislationsData, eventsData] = await Promise.all([
        getPosts(),
        getLegislations(),
        getEvents()
    ]);

    const tickerItems: TickerItem[] = [];

    // Map posts to ticker items (take latest 3)
    if (postsData && Array.isArray(postsData)) {
        postsData.slice(0, 3).forEach((post: any) => {
            tickerItems.push({
                id: `post-${post.id}`,
                title: post.title,
                type: "haber",
                url: `/blog/${post.slug}`,
                date: post.created_at
            });
        });
    }

    // Map legislations to ticker items (take latest 3)
    if (legislationsData && Array.isArray(legislationsData)) {
        legislationsData.slice(0, 3).forEach((leg: any) => {
            tickerItems.push({
                id: `leg-${leg.id}`,
                title: leg.title,
                type: "mevzuat",
                url: leg.pdf_url || `/legislation`, // Fallback if no PDF
                date: leg.published_date
            });
        });
    }

    // Map events to ticker items (take latest 3)
    if (eventsData && Array.isArray(eventsData)) {
        eventsData.slice(0, 3).forEach((event: any) => {
            tickerItems.push({
                id: `event-${event.id}`,
                title: event.title,
                type: "duyuru",
                url: `/events/${event.id}`,
                date: event.date // Using event date, or created_at if preferred
            });
        });
    }

    // Sort by date descending
    tickerItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return <NewsTickerClient items={tickerItems} />;
}
