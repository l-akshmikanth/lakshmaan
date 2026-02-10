import { useState } from "react";
import CurtainReveal from "@/components/CurtainReveal";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import FamiliesSection from "@/components/FamiliesSection";
import CountdownTimer from "@/components/CountdownTimer";
import AddToCalendar from "@/components/AddToCalendar";
import EventsSection from "@/components/EventsSection";
import EngagementGallery from "@/components/EngagementGallery";
import BlessingsSection from "@/components/BlessingsSection";
import VenueSection from "@/components/VenueSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {!curtainOpen && <CurtainReveal onOpen={() => setCurtainOpen(true)} />}

      {curtainOpen && (
        <>
          <NavBar />
          <main>
            <div className="animate-cascade" style={{ animationDelay: "0s" }}>
              <HeroSection />
            </div>
            <div className="animate-cascade" style={{ animationDelay: "0.15s" }}>
              <SectionDivider />
            </div>
            <div className="animate-cascade" style={{ animationDelay: "0.3s" }}>
              <FamiliesSection />
            </div>
            <div className="animate-cascade" style={{ animationDelay: "0.45s" }}>
              <SectionDivider />
            </div>
            <div className="animate-cascade" style={{ animationDelay: "0.6s" }}>
              <CountdownTimer />
              <AddToCalendar />
            </div>
            <div className="animate-cascade" style={{ animationDelay: "0.75s" }}>
              <SectionDivider />
            </div>
            <div className="animate-cascade" style={{ animationDelay: "0.9s" }}>
              <EventsSection />
            </div>
            <SectionDivider />
            <EngagementGallery />
            <SectionDivider />
            <BlessingsSection />
            <SectionDivider />
            <VenueSection />
            <SectionDivider />
            <RSVPSection />
            <Footer />
          </main>
          <MusicPlayer />
        </>
      )}
    </div>
  );
};

export default Index;
