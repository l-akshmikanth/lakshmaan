export type Language = "kn" | "en";

export interface TranslationStrings {
  // Curtain
  "curtain.pullRibbon": string;
  "curtain.names": string;
  "curtain.aria": string;

  // Intro
  "intro.step1": string;
  "intro.step2": string;
  "intro.step3": string;
  "intro.step4": string;
  "intro.subtitle": string;

  // Nav
  "nav.home": string;
  "nav.family": string;
  "nav.events": string;
  "nav.gallery": string;
  "nav.venue": string;

  // Hero
  "hero.groomName": string;
  "hero.brideName": string;
  "hero.and": string;
  "hero.date": string;
  "hero.photoAlt": string;

  // Families
  "families.blessing": string;
  "families.groomParents": string;
  "families.brideParents": string;
  "families.groomMother": string;
  "families.groomFather": string;
  "families.brideMother": string;
  "families.brideFather": string;
  "families.inMemory": string;
  "families.and": string;

  // Countdown
  "countdown.subtitle": string;
  "countdown.heading": string;
  "countdown.days": string;
  "countdown.hours": string;
  "countdown.minutes": string;
  "countdown.seconds": string;

  // Add to calendar
  "calendar.reception": string;
  "calendar.muhurtha": string;
  "calendar.google": string;

  // Events
  "events.subtitle": string;
  "events.heading": string;
  "events.receptionTitle": string;
  "events.muhurthaTitle": string;
  "events.receptionDate": string;
  "events.muhurthaDate": string;
  "events.receptionTime": string;
  "events.muhurthaTime": string;
  "events.venue": string;

  // Gallery
  "gallery.subtitle": string;
  "gallery.heading": string;
  "gallery.date": string;
  "gallery.closeAria": string;
  "gallery.prevAria": string;
  "gallery.nextAria": string;

  // Venue
  "venue.subtitle": string;
  "venue.heading": string;
  "venue.name": string;
  "venue.location": string;
  "venue.getDirections": string;
  "venue.mapTitle": string;

  // Footer
  "footer.message": string;
  "footer.names": string;
  "footer.madeWithLove": string;
  "footer.promoTitle": string;
  "footer.promoLink": string;

  // Calendar Prompt
  "calendarPrompt.title": string;
  "calendarPrompt.message": string;
  "calendarPrompt.close": string;

  // Music
  "music.muteAria": string;
  "music.playAria": string;

  // Heartbeat
  "heartbeat.aria": string;
}

export const translations: Record<Language, TranslationStrings> = {
  kn: {
    // Curtain
    "curtain.pullRibbon": "ರಿಬ್ಬನ್ ಎಳೆಯಿರಿ",
    "curtain.names": "ಲಕ್ಷ್ಮೀಕಾಂತ್ & ಮಾನ್ಯ",
    "curtain.aria": "ಮದುವೆ ಆಹ್ವಾನ ಪರದೆ",

    // Intro
    "intro.step1": "LakshMaan",
    "intro.step2": "Lakshmi Maanya",
    "intro.step3": "Lakshmikan & Maanya",
    "intro.step4": "Lakshmikanth & Maanya",
    "intro.subtitle": "Laksh + Maan",

    // Nav
    "nav.home": "ಮುಖಪುಟ",
    "nav.family": "ಕುಟುಂಬ",
    "nav.events": "ಕಾರ್ಯಕ್ರಮಗಳು",
    "nav.gallery": "ಗ್ಯಾಲರಿ",
    "nav.venue": "ಸ್ಥಳ",

    // Hero
    "hero.groomName": "ಲಕ್ಷ್ಮೀಕಾಂತ್",
    "hero.brideName": "ಮಾನ್ಯ",
    "hero.and": "&",
    "hero.date": "ಮಾರ್ಚ್ ೨೦೨೬",
    "hero.photoAlt": "ಲಕ್ಷ್ಮೀಕಾಂತ್ & ಮಾನ್ಯ",

    // Families
    "families.blessing": "ನಮ್ಮ ಕುಟುಂಬಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",
    "families.groomParents": "ವರನ ತಾಯಿ-ತಂದೆ",
    "families.brideParents": "ವಧುವಿನ ತಾಯಿ-ತಂದೆ",
    "families.groomMother": "ಶೀಲಾವತಿ",
    "families.groomFather": "ಮೂರ್ತಿ",
    "families.brideMother": "ಚಂದ್ರಕಲಾ",
    "families.brideFather": "ದಿ. ವೆಂಕಟೇಶ್",
    "families.inMemory": "ಪ್ರೀತಿಯ ನೆನಪಿನಲ್ಲಿ",
    "families.and": "&",

    // Countdown
    "countdown.subtitle": "ಇನ್ನೆಷ್ಟು ಸಮಯ",
    "countdown.heading": "ಮುಹೂರ್ತ",
    "countdown.days": "ದಿನಗಳು",
    "countdown.hours": "ಗಂಟೆಗಳು",
    "countdown.minutes": "ನಿಮಿಷಗಳು",
    "countdown.seconds": "ಸೆಕೆಂಡುಗಳು",

    // Add to calendar
    "calendar.reception": "ರಿಸೆಪ್ಷನ್",
    "calendar.muhurtha": "ಮುಹೂರ್ತ",
    "calendar.google": "ಗೂಗಲ್",

    // Events
    "events.subtitle": "ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ",
    "events.heading": "ಮದುವೆ ಕಾರ್ಯಕ್ರಮಗಳು",
    "events.receptionTitle": "ರಿಸೆಪ್ಷನ್",
    "events.muhurthaTitle": "ಮುಹೂರ್ತ",
    "events.receptionDate": "ಶನಿವಾರ, ಮಾರ್ಚ್ ೭, ೨೦೨೬",
    "events.muhurthaDate": "ಭಾನುವಾರ, ಮಾರ್ಚ್ ೮, ೨೦೨೬",
    "events.receptionTime": "ಸಂಜೆ ೭:೦೦ ರಿಂದ",
    "events.muhurthaTime": "ಬೆಳಿಗ್ಗೆ ೧೦:೩೦ ರಿಂದ",
    "events.venue": "ಸುರಭಿ ಕಲ್ಯಾಣ ಮಂಟಪ",

    // Gallery
    "gallery.subtitle": "ಸುಂದರ ಆರಂಭ",
    "gallery.heading": "ನಮ್ಮ ನಿಶ್ಚಿತಾರ್ಥ",
    "gallery.date": "ಅಕ್ಟೋಬರ್ ೧೩, ೨೦೨೫",
    "gallery.closeAria": "ಮುಚ್ಚಿ",
    "gallery.prevAria": "ಹಿಂದಿನ ಫೋಟೋ",
    "gallery.nextAria": "ಮುಂದಿನ ಫೋಟೋ",

    // Venue
    "venue.subtitle": "ದಾರಿ ಹುಡುಕಿ",
    "venue.heading": "ಸ್ಥಳ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
    "venue.name": "ಸುರಭಿ ಕಲ್ಯಾಣ ಮಂಟಪ",
    "venue.location": "ಮಂಡ್ಯ, ಕರ್ನಾಟಕ",
    "venue.getDirections": "ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ",
    "venue.mapTitle": "ಸುರಭಿ ಕಲ್ಯಾಣ ಮಂಟಪ ಸ್ಥಳ",

    // Footer
    "footer.message": "ನಿಮ್ಮನ್ನು ನಮ್ಮ ಜೀವನದಲ್ಲಿ ಹೊಂದಿರುವುದು ನಮ್ಮ ಸೌಭಾಗ್ಯ. ನಮ್ಮ ವಿಶೇಷ ದಿನದಂದು ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯಿಂದ ನಮಗೆ ಸಂತೋಷವಾಗುತ್ತದೆ.",
    "footer.names": "ಲಕ್ಷ್ಮೀಕಾಂತ್ & ಮಾನ್ಯ",
    "footer.madeWithLove": "ಪ್ರೀತಿಯಿಂದ ❤️ ಲಕ್ಷ್ಮಣ್",
    "footer.promoTitle": "ಮದುವೆ ವೆಬ್‌ಸೈಟ್ ಬೇಕೇ? ನನ್ನ ಪೋರ್ಟ್‌ಫೋಲಿಯೋ ನೋಡಿ",
    "footer.promoLink": "ಪೋರ್ಟ್‌ಫೋಲಿಯೋ ಭೇಟಿ ಮಾಡಿ",

    // Calendar Prompt
    "calendarPrompt.title": "ನಮ್ಮ ವಿವಾಹದ ದಿನಾಂಕವನ್ನು ಕಾಯ್ದಿರಿಸಿ ✨",
    "calendarPrompt.message": "ನಮ್ಮ ಮದುವೆಯ ಈ ಸುಂದರ ದಿನವನ್ನು ನಿಮ್ಮ ಕ್ಯಾಲೆಂಡರ್‌ನಲ್ಲಿ ಗುರುತಿಸಿ — ನಿಮ್ಮ ಉಪಸ್ಥಿತಿ ನಮಗೆ ಅತ್ಯಮೂಲ್ಯ.",
    "calendarPrompt.close": "ನಾನು ಬರುತ್ತೇನೆ! 💛",

    // Music
    "music.muteAria": "ಸಂಗೀತ ನಿಲ್ಲಿಸಿ",
    "music.playAria": "ಸಂಗೀತ ಪ್ಲೇ ಮಾಡಿ",

    // Heartbeat
    "heartbeat.aria": "ಹೃದಯ ಬಡಿತ",
  },

  en: {
    // Curtain
    "curtain.pullRibbon": "Pull the ribbon",
    "curtain.names": "Lakshmikanth & Maanya",
    "curtain.aria": "Wedding invitation curtain",

    // Intro
    "intro.step1": "LakshMaan",
    "intro.step2": "Lakshmi Maanya",
    "intro.step3": "Lakshmikan & Maanya",
    "intro.step4": "Lakshmikanth & Maanya",
    "intro.subtitle": "Laksh + Maan",

    // Nav
    "nav.home": "Home",
    "nav.family": "Family",
    "nav.events": "Events",
    "nav.gallery": "Gallery",
    "nav.venue": "Venue",

    // Hero
    "hero.groomName": "Lakshmikanth",
    "hero.brideName": "Maanya",
    "hero.and": "&",
    "hero.date": "March 2026",
    "hero.photoAlt": "Lakshmikanth & Maanya",

    // Families
    "families.blessing": "With the blessings of our families",
    "families.groomParents": "Groom's Parents",
    "families.brideParents": "Bride's Parents",
    "families.groomMother": "Sheelavathi",
    "families.groomFather": "Murthy",
    "families.brideMother": "Chandrakala",
    "families.brideFather": "Late Venkatesh",
    "families.inMemory": "In loving memory",
    "families.and": "&",

    // Countdown
    "countdown.subtitle": "Counting down to",
    "countdown.heading": "Muhurtha",
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.minutes": "Minutes",
    "countdown.seconds": "Seconds",

    // Add to calendar
    "calendar.reception": "Reception",
    "calendar.muhurtha": "Muhurtha",
    "calendar.google": "Google",

    // Events
    "events.subtitle": "Join us for",
    "events.heading": "Wedding Events",
    "events.receptionTitle": "Reception",
    "events.muhurthaTitle": "Muhurtha",
    "events.receptionDate": "Saturday, March 7, 2026",
    "events.muhurthaDate": "Sunday, March 8, 2026",
    "events.receptionTime": "7:00 PM onwards",
    "events.muhurthaTime": "10:30 AM onwards",
    "events.venue": "Surabhi Kalyana Mantapa",

    // Gallery
    "gallery.subtitle": "A beautiful beginning",
    "gallery.heading": "Our Engagement",
    "gallery.date": "October 13, 2025",
    "gallery.closeAria": "Close lightbox",
    "gallery.prevAria": "Previous photo",
    "gallery.nextAria": "Next photo",

    // Venue
    "venue.subtitle": "Find your way",
    "venue.heading": "Venue & Directions",
    "venue.name": "Surabhi Kalyana Mantapa",
    "venue.location": "Mandya, Karnataka",
    "venue.getDirections": "Get Directions",
    "venue.mapTitle": "Surabhi Kalyana Mantapa location",

    // Footer
    "footer.message": "We are blessed to have you in our lives and would be honored by your presence on our special day.",
    "footer.names": "Lakshmikanth & Maanya",
    "footer.madeWithLove": "Made with love ❤️ LakshMaan",
    "footer.promoTitle": "Need a wedding website? Check out my portfolio",
    "footer.promoLink": "Visit Portfolio",

    // Calendar Prompt
    "calendarPrompt.title": "Save Our Date ✨",
    "calendarPrompt.message": "We'd love for you to mark this beautiful day in your calendar so you don't miss a moment of our celebration!",
    "calendarPrompt.close": "I'll be there! 💛",

    // Music
    "music.muteAria": "Mute music",
    "music.playAria": "Play music",

    // Heartbeat
    "heartbeat.aria": "Feel the heartbeat",
  },
};
