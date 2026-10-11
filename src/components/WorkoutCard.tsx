import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { id, name, image, muscleGroups, equipment } = workout;

  return (
    <Link
      href={`/workouts/${id}`}
      className="group overflow-hidden rounded-xl border border-border bg-surface transition hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-black"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase tracking-wide">
          {name}
        </h3>
        <p className="text-xs text-muted">{equipment}</p>
        <WorkoutStats
          workout={workout}
          className="border-t border-border pt-3"
        />
      </div>
    </Link>
  );
}