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
import VenueSection from "@/components/VenueSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);

  const handleCurtainOpen = () => {
    // Content starts rendering underneath; curtain fades out on top
    setCurtainOpen(true);
    // Unmount the curtain overlay after the fade animation completes
    setTimeout(() => setCurtainDone(true), 100);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Curtain overlay — stays mounted during fade-out, then unmounts */}
      {!curtainDone && <CurtainReveal onOpen={handleCurtainOpen} />}

      {/* Main content renders underneath the curtain during crossfade */}
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
            <VenueSection />
            <Footer />
          </main>
          <MusicPlayer />
        </>
      )}
    </div>
  );
};

export default Index;
