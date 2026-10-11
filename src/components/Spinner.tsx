export default function Spinner({
  text = "Loading workouts…",
}: {
  text?: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-20"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}