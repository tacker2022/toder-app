import Navbar from "@/components/Navbar";

import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Management from "@/components/Management";
import SupervisoryBoard from "@/components/SupervisoryBoard";
import Commissions from "@/components/Commissions";
import Events from "@/components/Events";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getEvents } from "@/actions/events";
import { getMembers } from "@/actions/members";
import BlogSection from "@/components/BlogSection";
import Associations from "@/components/Associations";
import Contact from "@/components/Contact";
import Videos from "@/components/Videos";
import SplashScreen from "@/components/SplashScreen";

export const revalidate = 0;

export default async function Home() {
  const events = await getEvents();
  const members = await getMembers(undefined, undefined, "board");
  const supervisoryMembers = await getMembers(undefined, undefined, "supervisory");

  return (
    <main>
      <SplashScreen members={members} />
      <Hero />
      <Vision />
      <Management members={members} />
      <SupervisoryBoard members={supervisoryMembers} />
      <Commissions />
      <Events events={events} />
      <Videos />
      <BlogSection />
      <Associations />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
