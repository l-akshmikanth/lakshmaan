import { Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useMusic } from "@/hooks/use-music";

const MusicPlayer = () => {
  const { playing, toggle } = useMusic();
  const { t } = useLanguage();

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
