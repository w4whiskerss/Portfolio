"use client";

import Image from "next/image";
import Link from "next/link";

type SiteNavbarProps = {
  currentPage: "home" | "projects" | "presentation";
};

export default function SiteNavbar({ currentPage }: SiteNavbarProps) {
  const openTerminal = () => {
    window.dispatchEvent(new Event("portfolio:open-terminal"));
  };

  const navLinkClass = (page: SiteNavbarProps["currentPage"]) =>
    `glass-chip rounded-full px-4 py-2 text-sm transition-colors ${
      currentPage === page ? "text-white" : "text-white/70 hover:text-white"
    }`;

  return (
    <nav className="glass-surface glass-navbar animate-pop-up-delay-1 relative z-10 mx-auto w-full rounded-[1.85rem] border border-white/12 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:px-6">
      <div className="glass-content flex items-center justify-between gap-4">
        <Link
          href="/"
          className="glass-chip inline-flex items-center gap-3 rounded-full border border-white/10 px-2 py-2 pr-4 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image
            src="/logo.jpg"
            alt="W4Whiskers home"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="brand-script text-lg text-white/90">W4Whiskers</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/" className={navLinkClass("home")}>
            Home
          </Link>
          <Link href="/projects" className={navLinkClass("projects")}>
            Projects
          </Link>
          <Link href="/presentation" className={navLinkClass("presentation")}>
            Presentation
          </Link>
          <a
            href={currentPage === "home" ? "#contact" : "/#contact"}
            className="glass-chip rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          onClick={openTerminal}
          aria-label="Open terminal"
          title="Open terminal"
          className="glass-chip inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m7.5 10 2.5 2-2.5 2" />
            <path d="M12.5 16h4" />
          </svg>
          <span className="hidden sm:inline">Terminal</span>
        </button>
      </div>
    </nav>
  );
}
