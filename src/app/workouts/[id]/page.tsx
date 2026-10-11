import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkout } from "@/lib/api";
import DetailActions from "@/components/DetailActions";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkout(id);
  return {
    title: workout ? `${workout.name} — FitLog` : "Not found — FitLog",
  };
}

export default async function WorkoutDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout || !workout.name) notFound();

  const specs: [string, string | number][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
      >
        <ArrowLeft size={16} /> Back to workouts
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: info */}
        <div>
          <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-2 text-sm text-muted">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">
            Instructions
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-semibold text-white">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}