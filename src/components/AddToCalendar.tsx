import { ScrollAnimate } from "./ScrollAnimate";
import { CalendarPlus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { EVENTS, googleCalUrl, downloadIcs } from "@/lib/calendarEvents";

const AddToCalendar = () => {
  const { t } = useLanguage();

  return (
    <ScrollAnimate className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
      {EVENTS.map((e) => (
        <div key={e.labelKey} className="flex items-center gap-2">
          <a
            href={googleCalUrl(e)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 font-sans text-xs tracking-wider uppercase text-foreground hover:bg-primary/10 transition-all duration-300 hover:border-primary/60"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-primary" />
            {t(e.labelKey)} – {t("calendar.google")}
          </a>
          <button
            onClick={() => downloadIcs(e)}
            className="px-3 py-2.5 rounded-full border border-primary/30 font-sans text-xs tracking-wider uppercase text-foreground hover:bg-primary/10 transition-all duration-300 hover:border-primary/60"
          >
            .ics
          </button>
        </div>
      ))}
    </ScrollAnimate>
  );
};

export default AddToCalendar;
