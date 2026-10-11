"use client";

import { Bookmark, Plus } from "lucide-react";
import { PLAN_LIMIT, usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved, planFull } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planDisabled = planFull && !inPlan;

  let planLabel = "Add to today's plan";
  if (inPlan) planLabel = "In today's plan";
  else if (planFull) planLabel = `Plan full (${PLAN_LIMIT}/${PLAN_LIMIT})`;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={planDisabled}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={16} /> {planLabel}
      </button>

      <button
        onClick={() => saveForLater(workout)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
      >
        <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}