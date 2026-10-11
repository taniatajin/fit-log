import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

interface WorkoutStatsProps {
  workout: Workout;
  className?: string;
}

export default function WorkoutStats({
  workout,
  className = "",
}: WorkoutStatsProps) {
  return (
    <div className={`flex items-center gap-4 text-xs text-muted ${className}`}>
      <span className="flex items-center gap-1.5">
        <Clock size={14} /> {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame size={14} /> {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star size={14} /> {workout.rating}
      </span>
    </div>
  );
}