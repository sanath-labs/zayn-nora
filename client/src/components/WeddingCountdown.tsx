import { useEffect, useState } from "react";

const weddingTime = new Date("2026-11-30T10:30:00+00:00").getTime();

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function getCountdown(): Countdown {
  const remaining = Math.max(0, weddingTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function WeddingCountdown() {
  const [countdown, setCountdown] = useState(getCountdown);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getCountdown();
      setCountdown(next);
      if (next.seconds === 0) {
        setAnnouncement(`${next.days} days, ${next.hours} hours, and ${next.minutes} minutes remain until the ceremony.`);
      }
    }, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div className="countdown-clock" role="timer" aria-live="off" aria-label={`Countdown to the ceremony: ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds`}>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
      {units.map(({ label, value }) => (
        <div className="countdown-unit" key={label}>
          <span className="countdown-number" aria-hidden="true">{String(value).padStart(2, "0")}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
