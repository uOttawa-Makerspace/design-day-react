import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export type Day = "1" | "2";

interface ScheduleLayoutProps {
  children: (day: Day) => React.ReactNode;
}

const getInitialDay = (): Day | null => {
  const param = new URLSearchParams(window.location.search).get("day");
  return param === "1" || param === "2" ? param : null;
};

const ScheduleLayout: React.FC<ScheduleLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState<Day | null>(getInitialDay);

  const days: { id: Day; key: string }[] = [
    { id: "1", key: "day1" },
    { id: "2", key: "day2" },
  ];

  const current = days.find((d) => d.id === activeDay) ?? null;

  const selectDay = (day: Day) => {
    setActiveDay(day);

    const url = new URL(window.location.href);
    url.searchParams.set("day", day);
    window.history.replaceState({}, "", url);
  };

  return (
    <main className="pt-32">
      {/* Prompt */}
      <div className="max-w-5xl mx-auto px-4 mb-6 text-center">
        <p className="text-2xl font-semibold text-slate-700">
          {t("scheduleDays.selectDayTitle")}
        </p>

        <p className="mt-2 text-slate-500">
          {t("scheduleDays.selectDaySubtitle")}
        </p>
      </div>

      {/* Day Toggle Switch */}
      <div className={`flex justify-center ${current ? "mb-6" : "mb-16"}`}>
        <div
          role="tablist"
          aria-label={t("scheduleDays.ariaTablistLabel")}
          className="inline-flex rounded-xl bg-slate-100 p-1.5 border border-slate-200"
        >
          {days.map((day) => {
            const selected = activeDay === day.id;

            return (
              <button
                key={day.id}
                role="tab"
                aria-selected={selected}
                onClick={() => selectDay(day.id)}
                className={`flex flex-col items-center px-8 py-2.5 rounded-lg text-base font-bold transition-all duration-200 ${
                  selected
                    ? "bg-[#F84A32] text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span>{t(`scheduleDays.${day.key}.label`)}</span>

                <span
                  className={`text-sm font-medium ${
                    selected ? "text-white/90" : "text-slate-500"
                  }`}
                >
                  {t(`scheduleDays.${day.key}.date`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {current && (
        <>
          {/* Day Banner */}
          <div className="max-w-5xl mx-auto px-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#F84A32] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {t(`scheduleDays.${current.key}.label`)}
              </span>

              <span className="text-lg font-semibold text-slate-700">
                {t(`scheduleDays.${current.key}.longDate`)}
              </span>
            </div>
          </div>

          {/* Schedule Content */}
          <div
            key={current.id}
            role="tabpanel"
            className="space-y-12 animate-[fadeIn_200ms_ease-out]"
          >
            {children(current.id)}
          </div>
        </>
      )}
    </main>
  );
};

export default ScheduleLayout;
