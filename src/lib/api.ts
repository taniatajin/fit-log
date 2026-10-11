import type { Workout } from "@/types/workout";

const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function fetchFromBases(path = ""): Promise<unknown> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) return await res.json();
    } catch {
      // pore porer API try korbe
    }
  }
  return null;
}

export async function getWorkouts(): Promise<Workout[]> {
  const data = await fetchFromBases();
  if (Array.isArray(data)) return data as Workout[];
  const wrapped = data as { data?: Workout[] } | null;
  if (wrapped && Array.isArray(wrapped.data)) return wrapped.data;
  throw new Error("Failed to load workouts");
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const data = await fetchFromBases(`/${id}`);
  if (!data) return null;
  if (Array.isArray(data)) return (data[0] as Workout) ?? null;
  const obj = data as Workout & { data?: Workout };
  return obj.data ?? obj;
}