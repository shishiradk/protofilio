"use client";

import { useState, useEffect } from "react";

export default function DateTime() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toDateString());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed right-4 md:right-5 bottom-4 md:bottom-5 bg-[var(--card-bg)]
        px-3.5 py-2.5 rounded-lg border border-[var(--border)] z-[120]"
    >
      <span className="text-lg font-semibold text-white block">
        {time}
      </span>
      <span className="text-xs text-[var(--muted)]">{date}</span>
    </div>
  );
}
