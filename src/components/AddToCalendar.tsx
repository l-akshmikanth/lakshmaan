import { ScrollAnimate } from "./ScrollAnimate";
import { CalendarPlus } from "lucide-react";

const EVENTS = [
  {
    label: "Reception",
    start: "20260307T133000Z", // 7:00 PM IST = 1:30 PM UTC
    end: "20260307T163000Z",
    title: "Lakshmikanth & Maanya – Reception",
    location: "Surabhi Kalyana Mantapa, Mysuru, Karnataka",
  },
  {
    label: "Muhurtha",
    start: "20260308T050000Z", // 10:30 AM IST = 5:00 AM UTC
    end: "20260308T090000Z",
    title: "Lakshmikanth & Maanya – Muhurtha",
    location: "Surabhi Kalyana Mantapa, Mysuru, Karnataka",
  },
];

const googleCalUrl = (e: (typeof EVENTS)[0]) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${e.start}/${e.end}&location=${encodeURIComponent(e.location)}&details=${encodeURIComponent("We would be honored by your presence.")}`;

const icsBlob = (e: (typeof EVENTS)[0]) => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${e.start}`,
    `DTEND:${e.end}`,
    `SUMMARY:${e.title}`,
    `LOCATION:${e.location}`,
    `DESCRIPTION:We would be honored by your presence.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return new Blob([ics], { type: "text/calendar" });
};

const downloadIcs = (e: (typeof EVENTS)[0]) => {
  const url = URL.createObjectURL(icsBlob(e));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${e.label}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

const AddToCalendar = () => (
  <ScrollAnimate className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
    {EVENTS.map((e) => (
      <div key={e.label} className="flex items-center gap-2">
        <a
          href={googleCalUrl(e)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 font-sans text-xs tracking-wider uppercase text-foreground hover:bg-primary/10 transition-all duration-300 hover:border-primary/60"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-primary" />
          {e.label} – Google
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

export default AddToCalendar;
