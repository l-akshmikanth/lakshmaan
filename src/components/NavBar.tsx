import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const NAV_SECTIONS = ["home", "family", "events", "gallery", "venue"] as const;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.family"), href: "#family" },
    { label: t("nav.events"), href: "#events" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.venue"), href: "#venue" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(NAV_SECTIONS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
      style={{ animationDelay: "0.2s" }}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-1 md:gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase px-2 py-1.5 rounded-full transition-all duration-300 ${
              activeSection === link.href.slice(1)
                ? "text-primary-foreground bg-primary/80"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            {link.label}
          </a>
        ))}
        <LanguageToggle />
      </div>
    </nav>
  );
};

export default NavBar;
