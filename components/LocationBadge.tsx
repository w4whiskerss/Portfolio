"use client";

import { useEffect, useState } from "react";

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="m4.93 4.93 1.77 1.77" />
      <path d="m17.3 17.3 1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="m4.93 19.07 1.77-1.77" />
      <path d="m17.3 6.7 1.77-1.77" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function getMumbaiState(now: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(now);

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(now),
  );

  return {
    time,
    isDaytime: hour >= 6 && hour < 18,
  };
}

export default function LocationBadge() {
  const [mumbaiState, setMumbaiState] = useState(() => getMumbaiState(new Date()));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMumbaiState(getMumbaiState(new Date()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="group relative">
      <div className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-[999] w-[13.5rem] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
        <div className="glass-surface rounded-[1.15rem] border border-white/12 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] tracking-[0.22em] text-white/45 uppercase">
                Current Location
              </p>
              <p className="mt-1 text-base font-semibold text-white">Mumbai</p>
              <p className="text-[11px] text-white/65">Maharashtra</p>
              <p className="mt-3 text-sm font-medium text-white/88">
                {mumbaiState.time} IST
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                mumbaiState.isDaytime
                  ? "border-orange-300/30 bg-orange-400/12 text-orange-300"
                  : "border-blue-300/30 bg-blue-400/12 text-blue-200"
              }`}
            >
              {mumbaiState.isDaytime ? <SunIcon /> : <MoonIcon />}
            </div>
          </div>
        </div>
      </div>

      <span className="glass-chip inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 transition-colors duration-300 hover:text-green-400">
        <span className="transition-colors duration-300 group-hover:text-red-400">
          <LocationIcon />
        </span>
        Mumbai, India
      </span>
    </div>
  );
}
