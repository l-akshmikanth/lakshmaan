import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Family", href: "#family" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
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
      </div>
    </nav>
  );
};

export default NavBar;
