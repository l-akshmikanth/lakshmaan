import { useRef, useState } from "react";
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
import FloatingPetals from "@/components/FloatingPetals";
import CalendarPromptDialog from "@/components/CalendarPromptDialog";
import HeartbeatButton from "@/components/HeartbeatButton";
import { usePreloadMedia } from "@/hooks/use-preload-media";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { MusicProvider } from "@/hooks/use-music";

const Index = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const loaded = usePreloadMedia();
  const { t } = useLanguage();

  // Auto-scroll the page if the user idles for 6 s after the curtain opens
  useAutoScroll(curtainDone);

  // Fired immediately when user clicks the ribbon — starts revealing the page
  const handleRevealStart = () => {
    setCurtainOpen(true);
  };

  // Fired after the curtain slide + fade animation fully completes
  const handleRevealComplete = () => {
    setCurtainDone(true);
  };

  return (
    <MusicProvider revealed={curtainOpen}>
      <div className="min-h-screen bg-background overflow-x-hidden">

      {/* Loading screen — visible until media is preloaded */}
      {!loaded && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-background">
          <p className="font-serif text-2xl md:text-4xl tracking-[0.2em] gold-text animate-pulse">
            {t("curtain.names")}
          </p>
          <div className="mt-6 h-0.5 w-24 overflow-hidden rounded-full bg-primary/20">
            <div className="h-full w-full origin-left animate-loading-bar bg-primary/60" />
          </div>
        </div>
      )}

      {/* Curtain overlay — stays mounted during animation, then unmounts */}
      {!curtainDone && loaded && (
        <CurtainReveal
          onRevealStart={handleRevealStart}
          onRevealComplete={handleRevealComplete}
          loaded={loaded}
        />
      )}

      {/*
        Main content is ALWAYS rendered (so images preload in the background).
        It starts invisible and transitions to visible when the curtain opens.
        Cascade animations are paused until curtainOpen is true.
      */}
      <div className={curtainOpen ? "main-content main-content--visible" : "main-content"}>
        <NavBar />
        {curtainDone && <FloatingPetals />}
        <main>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0s" }}>
            <HeroSection revealed={curtainOpen} />
          </div>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0.15s" }}>
            <SectionDivider />
          </div>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0.3s" }}>
            <FamiliesSection />
          </div>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0.45s" }}>
            <SectionDivider />
          </div>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0.6s" }}>
            <CountdownTimer />
            <AddToCalendar />
          </div>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0.75s" }}>
            <SectionDivider />
          </div>
          <div className={`animate-cascade ${curtainOpen ? "cascade--running" : ""}`} style={{ animationDelay: "0.9s" }}>
            <EventsSection />
          </div>
          <SectionDivider />
          <EngagementGallery />
          <SectionDivider />
          <VenueSection />
          <div ref={footerRef}>
            <Footer />
          </div>
        </main>
        <MusicPlayer />
        <HeartbeatButton />
        <CalendarPromptDialog targetRef={footerRef} />
      </div>
    </div>
    </MusicProvider>
  );
};

export default Index;
