"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-wide"
        >
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="hidden sm:inline">FITLOG</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 rounded-full bg-surface p-1 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-accent/15 font-medium text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Badges */}
        <Link href="/my-plan" className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-accent px-2.5 py-1 font-semibold text-black">
            <span className="hidden sm:inline">Plan: </span>
            {plan.length}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 text-muted">
            <span className="hidden sm:inline">Saved: </span>
            {saved.length}
          </span>
        </Link>
      </div>
    </header>
  );
}