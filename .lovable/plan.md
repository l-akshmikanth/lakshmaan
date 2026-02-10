

# Changes to Wedding Invitation

## 1. Remove Sections
Remove the following sections from the page:
- **RSVP Section** -- remove from Index.tsx and its divider
- **Blessings Section** ("Words of Love") -- remove from Index.tsx and its divider
- Remove "RSVP" link from the NavBar

## 2. Scratchable Date Reveal in Events Section
Replace the visible dates (e.g., "Saturday, March 7, 2026") in the Events cards with a **scratch-to-reveal** interaction:
- The date text will be hidden behind a gold/shimmery overlay
- Users scratch (drag/swipe) over it with their finger or mouse to reveal the date underneath
- Uses an HTML `<canvas>` overlay with composite operations (`destination-out`) to erase the scratch layer
- A small hint text like "Scratch to reveal" will appear below the overlay
- Once ~50% is scratched, the full date auto-reveals with a fade animation

## 3. Hero Image as Background
- Use the hero couple photo (`hero-couple.jpg`) as a **full-screen background** for the Hero section instead of just a circular photo
- Apply a dark overlay gradient so the gold text remains readable
- Keep the circular photo as well, layered on top of the background
- The background will have a subtle parallax/ken-burns zoom effect

---

## Technical Details

### Files Modified:
1. **`src/pages/Index.tsx`** -- Remove BlessingsSection, RSVPSection imports and their rendered sections + dividers
2. **`src/components/NavBar.tsx`** -- Remove the "RSVP" nav link from the array
3. **`src/components/EventsSection.tsx`** -- Replace date text with a `ScratchReveal` canvas component
4. **`src/components/HeroSection.tsx`** -- Add hero-couple.jpg as a full-bleed background image with dark gradient overlay and subtle zoom animation

### New File:
- **`src/components/ScratchReveal.tsx`** -- Reusable scratch-to-reveal component using HTML Canvas. Renders a gold-colored scratch surface over hidden text. Tracks mouse/touch drag events to "erase" the overlay using `globalCompositeOperation: 'destination-out'`. Auto-reveals when scratch percentage exceeds 50%.

### No new dependencies needed -- Canvas API is native browser functionality.
