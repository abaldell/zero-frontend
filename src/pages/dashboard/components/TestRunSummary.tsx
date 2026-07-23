import type { TestRunSummary } from "../../../types/playwright";

interface Props {
  summary?: TestRunSummary;
  durationTotal?: number | null;
}

export default function TestRunSummary({ summary, durationTotal }: Props) {
  if (!summary) {
    return null;
  }

  return (
    <section className="py-3">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-md shadow ring-1 ring-inset ring-slate-200/30  dark:ring-slate-700/30 bg-slate-100 dark:bg-slate-900 p-4">
          <p className="text-sm uppercase font-semibold tracking-[0.1em] text-teal-500">
            Pasaron
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-400">
            {summary.passed}
          </p>
        </div>
        <div className="rounded-md shadow ring-1 ring-inset ring-slate-200/30 dark:ring-slate-700/30 bg-slate-100 dark:bg-slate-900 p-4">
          <p className="text-sm uppercase font-semibold tracking-[0.1em] text-teal-500">
            Fallaron
          </p>
          <p className="mt-2 text-3xl font-semibold text-rose-400">
            {summary.failed}
          </p>
        </div>
        <div className="rounded-md shadow ring-1 ring-inset ring-slate-200/30 dark:ring-slate-700/30 bg-slate-100 dark:bg-slate-900 p-4">
          <p className="text-sm uppercase font-semibold tracking-[0.1em] text-teal-500">
            Skipped
          </p>
          <p className="mt-2 text-3xl font-semibold text-sky-400">
            {summary.skipped}
          </p>
        </div>
        <div className="rounded-md shadow ring-1 ring-inset ring-slate-200/30 dark:ring-slate-700/30 bg-slate-100 dark:bg-slate-900 p-4">
          <p className="text-sm uppercase font-semibold tracking-[0.1em] text-teal-500">
            Duración
          </p>
          <p className="mt-2 text-3xl font-semibold text-black/70 dark:text-white">
            {durationTotal && (durationTotal / 1000).toFixed(1)}{" "}
            <span className="text-white/30 text-base">segundos</span>
          </p>
        </div>
      </div>
    </section>
  );
}
