"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LocationBadge from "@/components/LocationBadge";
import SiteNavbar from "@/components/SiteNavbar";
import Image from "next/image";

type ChannelStats = {
  name: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  url: string;
};

const youtubeChannelId = "UCHQ6YLMWEidDw0LqjBTDLmg";
const socialCountsBaseUrl = "https://api.socialcounts.org/youtube-live-subscriber-count";

const skills = [
  "Web Development",
  "Minecraft Mods",
  "Datapack Systems",
  "UI Experiments",
] as const;

type HomeContentProps = {
  channelStats: ChannelStats;
};

export default function HomeContent({ channelStats }: HomeContentProps) {
  const [hireFocus, setHireFocus] = useState(false);
  const [showMoreOpen, setShowMoreOpen] = useState(false);
  const [pageViews, setPageViews] = useState<number | null>(null);
  const [viewsReady, setViewsReady] = useState(false);
  const [liveChannelStats, setLiveChannelStats] = useState(channelStats);

  useEffect(() => {
    setLiveChannelStats(channelStats);
  }, [channelStats]);

  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const formatCompactCount = (value: number | undefined) => {
      if (typeof value !== "number" || Number.isNaN(value)) {
        return undefined;
      }

      return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: value >= 1000 ? 1 : 0,
      }).format(value);
    };

    async function loadLiveChannelStats() {
      try {
        const response = await fetch(
          `${socialCountsBaseUrl}/${youtubeChannelId}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          counters?: {
            api?: {
              subscriberCount?: number;
              viewCount?: number;
              videoCount?: number;
            };
            estimation?: {
              subscriberCount?: number;
              viewCount?: number;
              videoCount?: number;
            };
          };
        };

        const apiCounts = data.counters?.api;
        const estimatedCounts = data.counters?.estimation;
        const subscriberCount = formatCompactCount(
          apiCounts?.subscriberCount ?? estimatedCounts?.subscriberCount,
        );
        const viewCount = formatCompactCount(
          apiCounts?.viewCount ?? estimatedCounts?.viewCount,
        );
        const videoCount = formatCompactCount(
          apiCounts?.videoCount ?? estimatedCounts?.videoCount,
        );

        if (!isMounted || !subscriberCount || !viewCount || !videoCount) {
          return;
        }

        setLiveChannelStats((current) => ({
          ...current,
          subscriberCount,
          viewCount,
          videoCount,
        }));
      } catch {
        // Keep the server-rendered fallback if the client-side request fails.
      }
    }

    void loadLiveChannelStats();
    intervalId = setInterval(() => {
      void loadLiveChannelStats();
    }, 30000);

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [channelStats]);

  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    async function loadViewCount() {
      try {
        const response = await fetch("/api/view", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          enabled: boolean;
          totalViews: number | null;
        };

        if (!isMounted || !data.enabled || typeof data.totalViews !== "number") {
          return;
        }

        setPageViews(data.totalViews);
        setViewsReady(true);
      } catch {
        // Keep the UI quiet if storage is not configured.
      }
    }

    void loadViewCount();
    intervalId = setInterval(() => {
      void loadViewCount();
    }, 15000);

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: "YouTube",
      href: liveChannelStats.url,
      background:
        "bg-gradient-to-br from-red-600 to-red-800 border-red-500/50",
      hoverCard: {
        image: "/logo.jpg",
        title: "W4Whiskers",
        subtitle: "YouTube Channel",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "https://discord.gg/gnmR3D5Yxk",
      background:
        "bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-500/50",
      hoverCard: {
        image: "/deluxesmp.png",
        title: "DeluxeSMP",
        subtitle: "Discord Server",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
          <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189Zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
    },
    {
      name: "Discord 2",
      href: "https://discord.gg/NjZg46TRmf",
      background:
        "bg-gradient-to-br from-orange-400 to-orange-600 border-orange-300/50",
      hoverCard: {
        image: "/mydiscord.png",
        title: "W4Whiskers",
        subtitle: "Discord Server",
      },
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
          <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189Zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
    },
  ];

  function renderSkillLabel(skill: (typeof skills)[number]) {
    if (skill === "Web Development") {
      return (
        <span className="transition-all duration-300 group-hover:bg-[linear-gradient(90deg,#60a5fa,#f87171,#60a5fa,#facc15)] group-hover:bg-clip-text group-hover:text-transparent">
          {skill}
        </span>
      );
    }

    if (skill === "Minecraft Mods") {
      return (
        <span className="transition-all duration-300">
          <span className="group-hover:text-green-400">Minecraft </span>
          <span className="group-hover:text-red-400">Mods</span>
        </span>
      );
    }

    if (skill === "Datapack Systems") {
      return (
        <span className="transition-all duration-300 group-hover:text-green-400">
          Datapack
        </span>
      );
    }

    return (
      <span className="transition-all duration-300 group-hover:bg-[linear-gradient(90deg,#f9a8d4,#c084fc,#67e8f9)] group-hover:bg-clip-text group-hover:text-transparent">
        UI Experiments
      </span>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-5 text-white sm:px-10 lg:px-16">
      {showMoreOpen ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm animate-[overlay-fade_220ms_ease-out]"
          onClick={() => setShowMoreOpen(false)}
        >
          <div
            className="glass-surface glass-panel relative w-full max-w-4xl rounded-[1.8rem] border border-white/12 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] animate-[popup-enter_360ms_cubic-bezier(0.22,1,0.36,1)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs tracking-[0.3em] text-white/45 uppercase">
                  Credits
                </p>
                <button
                  type="button"
                  onClick={() => setShowMoreOpen(false)}
                  aria-label="Close popup"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/25 bg-red-500/10 text-lg font-semibold text-red-400 shadow-[0_10px_30px_rgba(239,68,68,0.14)] transition-all duration-200 hover:scale-110 hover:bg-red-500/18 hover:text-red-300"
                >
                  X
                </button>
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-white">Inspired By</h2>
                <p className="text-sm leading-7 text-white/68 sm:text-base">
                  This portfolio takes inspiration from{" "}
                  <a
                    href="https://www.duyle.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-200 underline decoration-orange-300/40 underline-offset-4 hover:text-orange-100"
                  >
                    duyle.dev
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-white">Elements From</h2>
                <p className="text-sm leading-7 text-white/68 sm:text-base">
                  Some interactive UI elements were adapted from Uiverse.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    TCdesign-dev
                  </span>
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    alexroumi
                  </span>
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    gharsh11032000
                  </span>
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    Itskrish01
                  </span>
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    vinodjangid07
                  </span>
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    cssbuttons-io
                  </span>
                  <span className="glass-chip rounded-full border border-white/12 px-4 py-2 text-sm text-white/82">
                    catraco
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6">
        <SiteNavbar currentPage="home" />

        <section className="glass-surface glass-panel glass-overflow-visible animate-pop-up relative z-20 grid w-full gap-8 rounded-[2.2rem] border border-white/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[1.3fr_0.9fr] lg:p-10">
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="animate-pop-up-delay-1 flex flex-wrap items-center justify-between gap-4">
                  <p
                    className={`text-sm font-medium tracking-[0.35em] uppercase transition-all duration-300 ${
                      hireFocus ? "text-emerald-200/80" : "text-white/60"
                    }`}
                  >
                    {hireFocus ? "Hire Focus Mode" : "Welcome to my World!"}
                  </p>

                  <button
                    type="button"
                    onClick={() => setHireFocus((value) => !value)}
                    aria-pressed={hireFocus}
                    className={`glass-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 ${
                      hireFocus
                        ? "border-emerald-400/25 text-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.16)]"
                        : "border-white/10 text-white/60"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                        hireFocus ? "bg-emerald-400" : "bg-white/35"
                      }`}
                    />
                    {hireFocus ? "Standard View" : "Hire Focus"}
                  </button>
                </div>

                <h1 className="brand-script animate-pop-up-delay-2 max-w-3xl text-5xl text-white sm:text-6xl lg:text-7xl">
                  W4Whiskers
                </h1>

                <div className="animate-pop-up-delay-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <div className={hireFocus ? "hire-focus-muted" : ""}>
                    <LocationBadge />
                  </div>

                  <div className="group relative">
                    <div className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-[999] w-max -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                      <div className="glass-surface rounded-[1rem] border border-white/12 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                        <p className="text-sm font-medium text-white/88">
                          Under 18
                        </p>
                      </div>
                    </div>

                    <span
                      className={`glass-chip rounded-full border border-white/12 px-4 py-2 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/12 hover:text-red-200 ${
                        hireFocus ? "hire-focus-muted" : ""
                      }`}
                    >
                      Age -18
                    </span>
                  </div>

                  {pageViews !== null ? (
                    <span
                      className={`glass-chip rounded-full border border-white/12 px-4 py-2 transition-all duration-500 ${
                        viewsReady
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0"
                      } ${
                        hireFocus ? "hire-focus-muted" : ""
                      }`}
                    >
                      {pageViews.toLocaleString()} Views
                    </span>
                  ) : null}
                </div>

                <p
                  className={`animate-pop-up-delay-3 max-w-2xl text-lg leading-8 italic sm:text-xl transition-all duration-300 ${
                    hireFocus ? "hire-focus-muted" : "text-orange-100/90"
                  }`}
                >
                  If you never try you&apos;ll never know if you can succeed.
                </p>

                <p className="animate-pop-up-delay-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                  I create{" "}
                  <span className={hireFocus ? "hire-focus-highlight" : ""}>
                    websites
                  </span>
                  ,{" "}
                  <span className={hireFocus ? "hire-focus-highlight" : ""}>
                    Minecraft mods
                  </span>
                  ,{" "}
                  <span className={hireFocus ? "hire-focus-highlight" : ""}>
                    datapacks
                  </span>
                  , and{" "}
                  <span className={hireFocus ? "hire-focus-highlight" : ""}>
                    UI experiments
                  </span>{" "}
                  with a clean, modern style and a creator-first mindset.
                </p>
              </div>

              <div className="animate-pop-up-delay-5 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="group relative">
                    {skill === "Web Development" ? (
                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-[999] w-40 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                        <div className="glass-surface rounded-[1rem] border border-white/12 px-3 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                              <span className="flex h-5 w-5 items-center justify-center">
                                <Image
                                  src="/react.png"
                                  alt="React logo"
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 object-contain"
                                />
                              </span>
                              <span>React</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                              <span className="flex h-5 w-5 items-center justify-center">
                                <Image
                                  src="/html.png"
                                  alt="HTML logo"
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 object-contain"
                                />
                              </span>
                              <span>HTML</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                              <span className="flex h-5 w-5 items-center justify-center">
                                <Image
                                  src="/css.png"
                                  alt="CSS logo"
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 object-contain"
                                />
                              </span>
                              <span>CSS</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                              <span className="flex h-5 w-5 items-center justify-center">
                                <Image
                                  src="/js.png"
                                  alt="JavaScript logo"
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 object-contain"
                                />
                              </span>
                              <span>JS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {skill === "Minecraft Mods" ? (
                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-[999] w-max -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                        <div className="glass-surface flex items-center gap-2 rounded-[1rem] border border-white/12 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-200">
                            <Image
                              src="/logo.png"
                              alt="Fabric logo"
                              width={20}
                              height={20}
                              className="h-5 w-5 rounded object-contain"
                            />
                          </span>
                          <p className="text-sm font-medium text-white/88">
                            Fabric Mods
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {skill === "Datapack Systems" ? (
                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-[999] w-max -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                        <div className="glass-surface flex items-center gap-2 rounded-[1rem] border border-white/12 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-green-300/20 bg-green-400/10 text-green-200">
                            <Image
                              src="/minecraft.png"
                              alt="Minecraft logo"
                              width={20}
                              height={20}
                              className="h-5 w-5 rounded object-contain"
                            />
                          </span>
                          <p className="text-sm font-medium text-white/88">
                            Minecraft
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {skill === "UI Experiments" ? (
                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-[999] w-44 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                        <div className="glass-surface rounded-[1rem] border border-white/12 px-3 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                          <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-300/20 bg-orange-400/10 text-orange-200">
                                UI
                              </span>
                              <span>Glass UI</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-white/88">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                                FX
                              </span>
                              <span>Motion & Hover</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <span
                      className={`glass-chip rounded-full border border-white/12 px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-1 ${
                        hireFocus
                          ? "hire-focus-important text-white"
                          : "text-white/78"
                      }`}
                    >
                      {renderSkillLabel(skill)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-pop-up-delay-5 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/projects"
                className={`button-connect w-fit px-7 ${
                  hireFocus ? "hire-focus-cta" : ""
                }`}
              >
                <span>View Projects</span>
              </Link>
              <a
                href="/contact"
                className={`button-connect w-fit px-7 ${
                  hireFocus ? "hire-focus-cta" : ""
                }`}
              >
                <span>Let&apos;s Connect</span>
              </a>
              <Link
                href="/presentation"
                className={`button-connect w-fit px-7 ${
                  hireFocus ? "hire-focus-cta" : ""
                }`}
              >
                <span>See what I Can Do!</span>
              </Link>
            </div>

          </div>

          <div className="flex items-stretch">
              <div className="glass-surface glass-panel-strong glass-overflow-visible animate-pop-up-delay-5 relative flex w-full flex-col justify-between rounded-[1.9rem] border border-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-7">
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-sm tracking-[0.28em] uppercase transition-all duration-300 ${
                      hireFocus ? "hire-focus-muted" : "text-white/50"
                    }`}
                  >
                    Profile
                  </p>
                  <p className="brand-script mt-2 text-3xl text-white">
                    W4Whiskers
                  </p>
                  <p
                    className={`mt-1 text-sm transition-all duration-300 ${
                      hireFocus ? "hire-focus-important" : "text-orange-100/80"
                    }`}
                  >
                    YouTuber | Builder | Mod Developer
                  </p>
                </div>
                <div className="overflow-hidden rounded-full border border-white/20 bg-white/12 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/logo.jpg"
                    alt="W4Whiskers logo"
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="glass-surface glass-panel-warm glass-overflow-visible relative z-20 mt-8 rounded-[1.6rem] border border-orange-300/20 p-5">
                <p
                  className={`text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                    hireFocus ? "hire-focus-muted" : "text-orange-100/70"
                  }`}
                >
                  Live Channel
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-orange-200/20">
                    <Image
                      src="/logo.jpg"
                      alt="W4Whiskers YouTube logo"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      {liveChannelStats.name}
                    </p>
                    <p
                      className={`text-sm transition-all duration-300 ${
                        hireFocus ? "hire-focus-muted" : "text-white/55"
                      }`}
                    >
                      Live stats pulled from the W4Whiskers1 YouTube channel
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3 overflow-visible sm:grid-cols-3">
                  <div
                    className={`glass-chip group relative overflow-visible rounded-2xl border border-white/8 px-4 py-3 transition-all duration-300 ${
                      hireFocus ? "hire-focus-important" : ""
                    }`}
                  >
                    <p className="text-xs tracking-[0.2em] text-white/45 uppercase">
                      Subs
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      {liveChannelStats.subscriberCount}
                    </p>
                    <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-[9999] w-max -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                      <div className="glass-surface rounded-[1rem] border border-white/12 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                        <a
                          href="https://www.youtube.com/@W4Whiskers1?sub_confirmation=1"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Subscribe to W4Whiskers1 on YouTube"
                          className="Btn pointer-events-auto"
                        >
                          <span className="sr-only">Subscribe</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`glass-chip rounded-2xl border border-white/8 px-4 py-3 transition-all duration-300 ${
                      hireFocus ? "hire-focus-muted" : ""
                    }`}
                  >
                    <p className="text-xs tracking-[0.2em] text-white/45 uppercase">
                      Views
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      {liveChannelStats.viewCount}
                    </p>
                  </div>
                  <div
                    className={`glass-chip rounded-2xl border border-white/8 px-4 py-3 transition-all duration-300 ${
                      hireFocus ? "hire-focus-muted" : ""
                    }`}
                  >
                    <p className="text-xs tracking-[0.2em] text-white/45 uppercase">
                      Videos
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      {liveChannelStats.videoCount}
                    </p>
                  </div>
                </div>
                <p
                  className={`mt-4 text-sm leading-6 transition-all duration-300 ${
                    hireFocus ? "hire-focus-muted" : "text-white/60"
                  }`}
                >
                  This card refreshes from W4Whiskers1&apos;s YouTube data and
                  falls back safely if anything changes.
                </p>
                <a
                  href={liveChannelStats.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-4 inline-flex text-sm font-medium transition-all duration-300 ${
                    hireFocus ? "hire-focus-important" : "text-orange-200 hover:text-orange-100"
                  }`}
                >
                  youtube.com/@W4Whiskers1
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="animate-pop-up-delay-5 relative z-50 flex justify-center pt-2">
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
                <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
              </clipPath>
            </defs>
          </svg>

          <div className="relative z-50 w-fit overflow-visible rounded-2xl">
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl" />
            <div className="relative flex items-end gap-x-2 rounded-2xl p-2">
              {socialLinks.map((social) => (
                <div key={social.name} className="group relative z-50">
                  {social.hoverCard ? (
                    <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-[9999] w-max -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                      <div className="glass-surface flex items-center gap-3 rounded-[1rem] border border-white/12 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                        <div className="h-10 w-10 overflow-hidden rounded-full border border-white/12">
                          <Image
                            src={social.hoverCard.image}
                            alt={`${social.hoverCard.title} server icon`}
                            width={40}
                            height={40}
                            className={`rounded-full ${
                              social.hoverCard.title === "DeluxeSMP"
                                ? "h-7 w-7 object-contain m-1.5"
                                : "h-10 w-10 object-cover"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="brand-script text-base text-white/92">
                            {social.hoverCard.title}
                          </p>
                          <p className="text-xs text-white/62">
                            {social.hoverCard.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={social.name}
                    title={social.name}
                    style={{ clipPath: "url(#squircleClip)" }}
                    className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:shadow-2xl ${social.background}`}
                  >
                    {social.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={() => setShowMoreOpen(true)}
            className="show-more-btn"
          >
            Credits
          </button>
        </div>
      </div>
    </main>
  );
}
