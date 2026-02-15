import { useCallback, useMemo, useRef, useState } from "react";
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
import TypingIntro from "@/components/TypingIntro";
import HeartbeatButton from "@/components/HeartbeatButton";
import { usePreloadMedia } from "@/hooks/use-preload-media";
import { useLanguage } from "@/i18n/LanguageContext";
import { MusicProvider } from "@/hooks/use-music";

const Index = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  // Typing intro disabled — skip straight to curtain
  const [typingDone, setTypingDone] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [introHidden, setIntroHidden] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const loaded = usePreloadMedia();
  const { t } = useLanguage();

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  const introSequence = useMemo(
    () => [t("intro.step1"), t("intro.step2"), t("intro.step3"), t("intro.step4")],
    [t]
  );

  const readyForCurtain = loaded && typingDone;

  // Fired immediately when user clicks the ribbon — starts revealing the page
  const handleRevealStart = () => {
    setCurtainOpen(true);
    setIntroFading(true);
    window.setTimeout(() => setIntroHidden(true), 700);
  };

  // Fired after the curtain slide + fade animation fully completes
  const handleRevealComplete = () => {
    setCurtainDone(true);
  };

  return (
    <MusicProvider revealed={curtainOpen}>
      <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Typing intro disabled — kept for future use
      {!introHidden && (
        <TypingIntro
          sequence={introSequence}
          onComplete={handleTypingComplete}
          fading={introFading}
          showBackdrop={!readyForCurtain}
          subtitle={t("intro.subtitle")}
        />
      )}
      */}

      {/* Curtain overlay — stays mounted during animation, then unmounts */}
      {!curtainDone && readyForCurtain && (
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
