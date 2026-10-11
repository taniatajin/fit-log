"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import type { PlanWorkout, Workout } from "@/types/workout";

interface PlanContextValue {
  plan: PlanWorkout[];
  saved: Workout[];
  ready: boolean;
  planFull: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);
const STORAGE_KEY = "fitlog-state-v1";
export const PLAN_LIMIT = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);

  // page load e localStorage theke data ana
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as {
          plan?: PlanWorkout[];
          saved?: Workout[];
        };
        setPlan(data.plan ?? []);
        setSaved(data.saved ?? []);
      }
    } catch (err) {
      console.error("Failed to read saved data", err);
    }
    setReady(true);
  }, []);

  // data change hole localStorage e save
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
  }, [plan, saved, ready]);

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isSaved = (id: number) => saved.some((w) => w.id === id);
  const planFull = plan.length >= PLAN_LIMIT;

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (planFull) {
      toast.error(`Plan is full — max ${PLAN_LIMIT} lifts`);
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    if (isSaved(workout.id)) {
      toast.error("Already in your saved list");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast("Removed from saved");
  };

  const markDone = (id: number) => {
    setPlan(plan.map((w) => (w.id === id ? { ...w, done: true } : w)));
    toast.success("Nice work! Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        planFull,
        isInPlan,
        isSaved,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#13151a",
            color: "#fff",
            border: "1px solid #23262d",
          },
          success: { iconTheme: { primary: "#ccff00", secondary: "#000" } },
        }}
      />
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
