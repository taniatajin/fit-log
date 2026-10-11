import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-2 font-display font-bold tracking-wide text-white">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}