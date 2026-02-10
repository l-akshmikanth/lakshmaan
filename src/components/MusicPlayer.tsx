import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Users should provide their own music file at src/assets/wedding-music.mp3
      // For now we use a silent placeholder to avoid errors
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

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
      aria-label={playing ? "Mute music" : "Play music"}
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
