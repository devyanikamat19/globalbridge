import { Fragment } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = ["9:00", "11:00", "1:00", "3:00", "5:00"];

export default function AvailabilityPage() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink-950 dark:text-paper mb-2">Availability</h2>
      <p className="text-sm text-ink-950/60 dark:text-paper/60 mb-6">
        Tap a slot to toggle it open for booking. Highlighted slots are currently open.
      </p>
      <div className="overflow-x-auto rounded-xl border border-ink-700/10 dark:border-paper/10 bg-white dark:bg-ink-900 p-4">
        <div className="grid grid-cols-8 gap-2 min-w-[600px]">
          <div />
          {days.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-ink-950/50 dark:text-paper/50 pb-2">
              {d}
            </div>
          ))}
          {slots.map((s) => (
            <Fragment key={s}>
              <div className="text-xs font-mono text-ink-950/40 dark:text-paper/40 py-2">
                {s}
              </div>
              {days.map((d, i) => {
                const open = (s.charCodeAt(0) + i) % 3 === 0;
                return (
                  <button
                    key={`${s}-${d}`}
                    className={`h-9 rounded-md text-xs transition-colors ${
                      open
                        ? "bg-harbor-500/15 text-harbor-600 dark:text-harbor-400"
                        : "bg-ink-700/5 dark:bg-paper/5 text-transparent hover:bg-ink-700/10 dark:hover:bg-paper/10"
                    }`}
                  >
                    {open ? "Open" : ""}
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
