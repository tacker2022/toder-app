import Navbar from "@/components/Navbar";

import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Management from "@/components/Management";
import Commissions from "@/components/Commissions";
import Events from "@/components/Events";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getEvents } from "@/actions/events";
import { getMembers } from "@/actions/members";
import BlogSection from "@/components/BlogSection";
import Associations from "@/components/Associations";

export default async function Home() {
  const events = await getEvents();
  const members = await getMembers();

  return (
    <main>
      <Navbar />
      <Hero />
      <Vision />
      <Management members={members} />
      <Commissions />
      <Events events={events} />
      <BlogSection />
      <Associations />
      <CTA />
      <Footer />
    </main>
  );
}
