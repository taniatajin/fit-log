import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-10 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-110"
          >
            BROWSE WORKOUTS <ArrowDown size={16} />
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/hero.png"
            alt="Workout machine illustration"
            width={420}
            height={420}
            priority
            className="h-auto w-full max-w-xs sm:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}