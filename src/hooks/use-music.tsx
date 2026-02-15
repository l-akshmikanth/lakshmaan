import { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react";
import weddingMusic from "@/assets/wedding-music.mp3";

interface MusicContextType {
  playing: boolean;
  toggle: () => void;
  pause: () => void;
  play: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children, revealed }: { children: ReactNode; revealed: boolean }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(weddingMusic);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (revealed && audioRef.current) {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [revealed]);

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  };

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const toggle = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  return (
    <MusicContext.Provider value={{ playing, toggle, pause, play, audioRef }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
};
