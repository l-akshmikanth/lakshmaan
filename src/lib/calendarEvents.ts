export const EVENTS = [
  {
    labelKey: "calendar.reception" as const,
    start: "20260307T133000Z", // 7:00 PM IST = 1:30 PM UTC
    end: "20260307T163000Z",
    title: "Lakshmikanth & Maanya – Reception",
    location: "Surabhi Kalyana Mantapa, Mandya, Karnataka",
  },
  {
    labelKey: "calendar.muhurtha" as const,
    start: "20260308T050000Z", // 10:30 AM IST = 5:00 AM UTC
    end: "20260308T090000Z",
    title: "Lakshmikanth & Maanya – Muhurtha",
    location: "Surabhi Kalyana Mantapa, Mandya, Karnataka",
  },
];

export type CalendarEvent = (typeof EVENTS)[number];

export const googleCalUrl = (e: CalendarEvent) =>
  (() => {
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      e.location
    )}`;
    const details = `We would be honored by your presence.\n\nVenue: ${e.location}\nMap: ${mapsLink}\nReminder: 1 day before`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      e.title
    )}&dates=${e.start}/${e.end}&location=${encodeURIComponent(e.location)}&details=${encodeURIComponent(
      details
    )}`;
  })();

const icsBlob = (e: CalendarEvent) => {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    e.location
  )}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${e.start}`,
    `DTEND:${e.end}`,
    `SUMMARY:${e.title}`,
    `LOCATION:${e.location}`,
    `DESCRIPTION:We would be honored by your presence.\\n\\nMap: ${mapsLink}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "TRIGGER:-P1D",
    "END:VALARM",
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
