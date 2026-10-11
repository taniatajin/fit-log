"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Spinner from "@/components/Spinner";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

type SortKey = "duration" | "calories" | "rating";

const SORT_FIELDS: Record<SortKey, "duration" | "caloriesBurned" | "rating"> = {
  duration: "duration",
  calories: "caloriesBurned",
  rating: "rating",
};

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const field = SORT_FIELDS[sortBy];
    return workouts
      .filter(
        (w) =>
          !q ||
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      )
      .sort((a, b) => b[field] - a[field]); // boro theke choto
  }, [workouts, sortBy, query]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase">
              The Library
            </h2>
            <p className="mt-1 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or tag"
                className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:border-accent sm:w-56"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="w-full appearance-none rounded-md border border-border bg-surface py-2 pl-3 pr-9 text-sm outline-none focus:border-accent"
              >
                <option value="duration">Sort By: Duration</option>
                <option value="calories">Sort By: Calories</option>
                <option value="rating">Sort By: Rating</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>

        {loading && <Spinner />}

        {error && <p className="py-12 text-center text-red-400">{error}</p>}

        {!loading && !error && visible.length === 0 && (
          <p className="py-12 text-center text-muted">No workouts found.</p>
        )}

        {!loading && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}