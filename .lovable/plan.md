

# Professional Polish and Extra Features

Beyond the animation upgrade already planned, here are additional enhancements to make this feel like a premium, professionally built wedding invitation.

---

## 1. Sticky Navigation Bar
Add a minimal, elegant top navigation that appears after the curtain opens. It will be a thin glass-effect bar with smooth scroll links to each section: Home, Family, Events, Gallery, Venue. It fades in after the curtain opens and becomes semi-transparent on scroll.

## 2. RSVP Section
Add an RSVP form before the footer where guests can confirm attendance. Fields: Name, Number of guests (dropdown 1-4), Attending which event (checkboxes: Reception / Muhurtha / Both), and a "Send with love" submit button. Since there's no backend, it will open a pre-filled WhatsApp message or mailto link with the details.

## 3. "Save the Date" Add-to-Calendar Button
Below the countdown timer, add a button that lets guests add the wedding events to their Google Calendar / Apple Calendar (.ics download). This is a very common feature on professional wedding sites.

## 4. Floating Music Player
A small floating button (bottom-right corner) that plays soft instrumental music when toggled on. It appears after the curtain opens with a speaker icon and gentle pulse animation. Muted by default to respect autoplay policies.

## 5. Kolam / Rangoli Decorative SVG Motifs
Add subtle kolam-inspired SVG patterns as section backgrounds or borders -- fitting the South Indian wedding theme. These will be light watermark-style patterns behind sections like Families and Events.

## 6. Parallax Background Texture
Add a subtle gold-foil or floral watermark texture to the page background that moves at a slightly different scroll speed, giving depth to the entire page.

## 7. "Blessings" / Wishes Section
A read-only section showing pre-written blessings or quotes about love and marriage, displayed as elegant cards with quotation marks. This adds warmth and content depth.

---

## Technical Details

### New Files:
- `src/components/NavBar.tsx` -- Sticky glass navigation with smooth scroll links
- `src/components/RSVPSection.tsx` -- RSVP form with WhatsApp/email integration
- `src/components/AddToCalendar.tsx` -- Calendar export button (Google Calendar URL + .ics file)
- `src/components/MusicPlayer.tsx` -- Floating audio toggle button
- `src/components/KolamPattern.tsx` -- Reusable SVG kolam/rangoli decorative component
- `src/components/BlessingsSection.tsx` -- Elegant quotes/blessings cards
- `src/components/SectionDivider.tsx` -- Animated ornamental divider (from previous plan)
- `src/assets/wedding-music.mp3` -- Background instrumental (user to provide)

### Modified Files:
- `src/pages/Index.tsx` -- Add new sections (NavBar, RSVP, Blessings, AddToCalendar, SectionDividers) and staggered reveal after curtain
- `src/index.css` -- Add all missing keyframes (sparkle, fade-up, divider-expand, pulse-glow, shimmer, float, etc.), parallax background styles, kolam watermark styles
- `src/components/HeroSection.tsx` -- Enhanced animations (rotating rings, shimmer on names, better particles)
- `src/components/FamiliesSection.tsx` -- Kolam background, animated underlines
- `src/components/CountdownTimer.tsx` -- Add "Add to Calendar" button below timer, breathing animation on cards
- `src/components/EventsSection.tsx` -- Border shimmer on hover, sequential icon animations
- `src/components/EngagementGallery.tsx` -- Ken Burns hover effect, improved lightbox transition
- `src/components/VenueSection.tsx` -- Parallax map offset, button ripple
- `src/components/Footer.tsx` -- SVG stroke-draw animation, gold shimmer on names
- `tailwind.config.ts` -- Add new keyframe and animation definitions

### Section Order (top to bottom):
```text
NavBar (sticky)
HeroSection
  SectionDivider
FamiliesSection
  SectionDivider
CountdownTimer + AddToCalendar
  SectionDivider
EventsSection
  SectionDivider
EngagementGallery
  SectionDivider
BlessingsSection
  SectionDivider
VenueSection
  SectionDivider
RSVPSection
Footer
MusicPlayer (floating)
```

### No new dependencies needed -- everything uses CSS animations, native HTML audio, and standard URL APIs for calendar links.

