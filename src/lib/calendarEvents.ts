export const EVENTS = [
  {
    labelKey: "calendar.reception" as const,
    start: "20260307T133000Z", // 7:00 PM IST = 1:30 PM UTC
    end: "20260307T163000Z",
    title: "Lakshmikanth & Maanya – Reception",
    location: "Surabhi Kalyana Mantapa, Mysuru, Karnataka",
  },
  {
    labelKey: "calendar.muhurtha" as const,
    start: "20260308T050000Z", // 10:30 AM IST = 5:00 AM UTC
    end: "20260308T090000Z",
    title: "Lakshmikanth & Maanya – Muhurtha",
    location: "Surabhi Kalyana Mantapa, Mysuru, Karnataka",
  },
];

export type CalendarEvent = (typeof EVENTS)[number];

export const googleCalUrl = (e: CalendarEvent) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${e.start}/${e.end}&location=${encodeURIComponent(e.location)}&details=${encodeURIComponent("We would be honored by your presence.")}`;

const icsBlob = (e: CalendarEvent) => {
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

export const downloadIcs = (e: CalendarEvent) => {
  const url = URL.createObjectURL(icsBlob(e));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${e.title}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};
