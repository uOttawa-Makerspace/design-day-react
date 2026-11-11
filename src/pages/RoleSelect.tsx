import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import config from "../config/config";

const ArrowIcon: React.FC = () => (
  <svg
    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-6-6 6 6-6 6"
    />
  </svg>
);

const RoleSelect: React.FC = () => {
  const { t } = useTranslation();

  const roles = [
    { to: "/judges", label: t("imJudge") },
    { to: "/students", label: t("imStudent") },
  ];

  return (
    <section
      aria-labelledby="schedule-heading"
      className="bg-white py-16 sm:py-20 border-b border-slate-100"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="text-left">
            <h2
              id="schedule-heading"
              className="text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 mb-4"
            >
              {t("schedule", "Schedule")}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {t("schedule_paragraph", {
                year: config.year,
                semester:
                  i18n.language === "fr"
                    ? t(`semesters.${config.semester}`).toLowerCase()
                    : t(`semesters.${config.semester}`),
              })}
            </p>

            {/* Select Role */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-8">
              {t("selectRoleSubtitle")}
            </p>
          </div>

          {/* Right Column: Smaller Role Buttons */}
          <div className="flex flex-col gap-3">
            {roles.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between rounded-xl bg-slate-50 border-2 border-slate-200/80 px-6 py-5 text-left text-slate-800 transition-all duration-300 ease-in-out hover:bg-orange-50/70 hover:border-ceed hover:text-ceed hover:ring-2 hover:ring-ceed/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceed/40"
              >
                <span className="text-lg font-semibold">{label}</span>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSelect;
