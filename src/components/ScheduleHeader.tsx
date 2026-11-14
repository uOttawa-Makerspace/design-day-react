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
          {/* Left Column: Role label on top, Header, Date, & Description */}
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {t("selectRole", "Select your role")}
            </p>
            <h2
              id="schedule-heading"
              className="text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 mb-2"
            >
              {t("schedule", "Schedule")}
            </h2>
            <h3 className="text-xl sm:text-2xl font-normal text-slate-600 mb-4">
              {i18n.language === "fr" ? config.dateFr : config.dateEn}
            </h3>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {t("schedule_paragraph", {
                year: config.year,
                semester:
                  i18n.language === "fr"
                    ? t(`semesters.${config.semester}`).toLowerCase()
                    : t(`semesters.${config.semester}`),
              })}
            </p>
          </div>

          {/* Right Column: Role Selection Buttons */}
          <div className="flex flex-col gap-5">
            {roles.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between rounded-2xl bg-slate-50 border-2 border-slate-200/80 px-8 py-8 text-left text-slate-800 transition-all duration-300 ease-in-out hover:bg-orange-50/70 hover:border-ceed hover:text-ceed hover:ring-2 hover:ring-ceed/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceed/40"
              >
                <span className="text-2xl font-semibold">{label}</span>
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
