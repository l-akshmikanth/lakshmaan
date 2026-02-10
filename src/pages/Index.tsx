import { useState } from "react";
import CurtainReveal from "@/components/CurtainReveal";
import HeroSection from "@/components/HeroSection";
import FamiliesSection from "@/components/FamiliesSection";
import CountdownTimer from "@/components/CountdownTimer";
import EventsSection from "@/components/EventsSection";
import EngagementGallery from "@/components/EngagementGallery";
import VenueSection from "@/components/VenueSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {!curtainOpen && <CurtainReveal onOpen={() => setCurtainOpen(true)} />}

      <main
        className={`transition-opacity duration-500 ${
          curtainOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroSection />
        <FamiliesSection />
        <CountdownTimer />
        <EventsSection />
        <EngagementGallery />
        <VenueSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
