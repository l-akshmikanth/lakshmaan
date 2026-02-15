import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import weddingMusic from "@/assets/wedding-music.mp3";

const MusicPlayer = ({ revealed = false }: { revealed?: boolean }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useLanguage();

  // Pre-create the audio element on mount so the mp3 starts downloading
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

  // Play once the curtain is opened (user has made a gesture)
  useEffect(() => {
    if (revealed && audioRef.current) {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [revealed]);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label={playing ? t("music.muteAria") : t("music.playAria")}
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-primary animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
      {!playing && (
        <span className="absolute -inset-1 rounded-full border border-primary/30 animate-ping opacity-40" />
      )}
    </button>
  );
};

export default MusicPlayer;
