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

const ArrowIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
    aria-hidden="true"
  >
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);

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
    <main className="pt-28 pb-16 px-1 sm:px-4">
      {/* Heading */}
      <header className="mx-auto max-w-4xl px-0 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          {t("scheduleDays.selectDayTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-none text-base sm:text-lg text-slate-600">
          {t("scheduleDays.selectDaySubtitle")}
        </p>
      </header>

      {/* Day selector */}
      <div
        role="tablist"
        aria-label={t("scheduleDays.ariaTablistLabel") as string}
        className={`mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 ${
          !current ? "mb-12" : ""
        }`}
      >
        {days.map((day) => {
          const selected = activeDay === day.id;

          return (
            <button
              key={day.id}
              role="tab"
              aria-selected={selected}
              onClick={() => selectDay(day.id)}
              className={`group relative flex flex-col rounded-xl border-2 p-7 sm:p-6 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F84A32]/30 ${
                selected
                  ? "border-[#F84A32] bg-[#F84A32] text-white"
                  : "border-slate-300 bg-white text-[#F84A32] hover:border-slate-900"
              }`}
            >
              <span className="mt-1.5 text-4xl sm:text-5xl font-bold tracking-tight">
                {t(`scheduleDays.${day.key}.date`)}
              </span>

              <span
                className={`mt-4 flex items-center justify-between text-lg sm:text-3xl font-semibold ${
                  selected ? "text-white" : "text-black"
                }`}
              >
                {selected
                  ? t("scheduleDays.viewing")
                  : t("scheduleDays.viewSchedule")}
                {selected ? <CheckIcon /> : <ArrowIcon />}
              </span>
            </button>
          );
        })}
      </div>

      {current && (
        <>
          {/* Schedule content */}
          <div
            key={current.id}
            role="tabpanel"
            className="px-4 lg:px-1 mb-10 mt-12 space-y-12 animate-[fadeIn_200ms_ease-out]"
          >
            {children(current.id)}
          </div>
        </>
      )}
    </main>
  );
};

export default ScheduleLayout;
