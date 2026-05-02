import { useEffect, useState } from 'react';

interface Props {
  endDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calcTimeLeft(endDate: string): TimeLeft {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalSeconds = diff / 1000;
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: Math.floor(totalSeconds % 60),
    expired: false,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function CountdownTimerIsland({ endDate, label = 'Offer ends in' }: Props) {
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(endDate));

  useEffect(() => {
    if (time.expired) return;
    const id = setInterval(() => {
      const next = calcTimeLeft(endDate);
      setTime(next);
      if (next.expired) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endDate, time.expired]);

  return (
    <section className="campaign-countdown bg-amber-50 border-y border-amber-200 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 mb-3">
          {label}
        </p>
        {time.expired ? (
          <p className="text-amber-700 font-semibold">This offer has ended.</p>
        ) : (
          <div
            className="flex justify-center gap-4 md:gap-8"
            aria-live="polite"
            aria-atomic="true"
          >
            {(
              [
                ['days', time.days],
                ['hours', time.hours],
                ['minutes', time.minutes],
                ['seconds', time.seconds],
              ] as [string, number][]
            ).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center min-w-[60px]">
                <span className="text-4xl md:text-5xl font-bold tabular-nums text-[var(--color-brand-charcoal)]">
                  {pad(value)}
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-500 mt-1">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
