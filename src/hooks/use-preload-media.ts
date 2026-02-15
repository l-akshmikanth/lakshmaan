import { useEffect, useState } from "react";

import heroPhoto from "@/assets/hero-couple.jpg";
import engagement1 from "@/assets/engagement-1.jpg";
import engagement2 from "@/assets/engagement-2.jpg";
import engagement3 from "@/assets/engagement-3.jpg";
import engagement4 from "@/assets/engagement-4.jpg";
import engagement5 from "@/assets/engagement-5.jpg";
import engagement6 from "@/assets/engagement-6.jpg";
import weddingMusic from "@/assets/wedding-music.mp3";

const PRELOAD_IMAGES = [
  heroPhoto,
  engagement1,
  engagement2,
  engagement3,
  engagement4,
  engagement5,
  engagement6,
];
const SAFETY_TIMEOUT_MS = 4000;

export const usePreloadMedia = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const imagePromises = PRELOAD_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    );

    const audioPromise = new Promise<void>((resolve) => {
      const audio = new Audio();
      audio.preload = "auto";
      audio.oncanplaythrough = () => resolve();
      audio.onerror = () => resolve();
      audio.src = weddingMusic;
    });

    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) setLoaded(true);
    }, SAFETY_TIMEOUT_MS);

    Promise.all([...imagePromises, audioPromise]).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, []);

  return loaded;
};
