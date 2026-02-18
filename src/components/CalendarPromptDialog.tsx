import { useEffect, useRef, useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { EVENTS, googleCalUrl, downloadIcs } from "@/lib/calendarEvents";

interface CalendarPromptDialogProps {
  targetRef: React.RefObject<HTMLElement>;
}

const CalendarPromptDialog = ({ targetRef }: CalendarPromptDialogProps) => {
  const [open, setOpen] = useState(false);
  const hasShown = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t, perspective } = useLanguage();

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (hasShown.current) return;

        if (entry.isIntersecting) {
          // Start 2-second timer when footer becomes visible
          timerRef.current = setTimeout(() => {
            if (!hasShown.current) {
              hasShown.current = true;
              setOpen(true);
              observerRef.current?.disconnect();
            }
          }, 2000);
        } else {
          // User scrolled away — cancel the timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(el);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      observerRef.current?.disconnect();
    };
  }, [targetRef]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md border-primary/20 bg-background/95 backdrop-blur-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="font-serif text-2xl md:text-3xl gold-text">
            {t("calendarPrompt.title")}
          </DialogTitle>
          <DialogDescription className="font-sans text-sm text-muted-foreground leading-relaxed px-2">
            {t("calendarPrompt.message")}
          </DialogDescription>
        </DialogHeader>

        {/* Event calendar buttons */}
        <div className="mt-4 space-y-3">
          {EVENTS.map((e) => (
            <div
              key={e.labelKey}
              className="flex items-center justify-between gap-2 p-3 rounded-xl border border-primary/15 bg-primary/[0.03]"
            >
              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm font-semibold text-foreground">
                  {t(e.labelKey)}
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">
                  {e.getTitleEn(perspective).split(" – ")[1] || e.getTitleEn(perspective)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={googleCalUrl(e, perspective)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-primary/30 font-sans text-xs tracking-wider uppercase text-foreground hover:bg-primary/10 transition-all duration-300 hover:border-primary/60"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-primary" />
                  {t("calendar.google")}
                </a>
                <button
                  onClick={() => downloadIcs(e, perspective)}
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-full border border-primary/30 font-sans text-xs tracking-wider uppercase text-foreground hover:bg-primary/10 transition-all duration-300 hover:border-primary/60"
                  aria-label={`Download ${t(e.labelKey)} .ics file`}
                >
                  <Download className="w-3 h-3 text-primary" />
                  .ics
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 font-sans text-sm font-medium tracking-wider text-background hover:brightness-110 transition-all duration-300"
        >
          {t("calendarPrompt.close")}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarPromptDialog;
