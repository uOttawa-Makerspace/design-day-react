import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import config from "../config/config";

const ArrowIcon: React.FC = () => (
  <svg
    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
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
      className="bg-white py-20 sm:py-24 border-b border-slate-100"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-6 text-left">
            <h2
              id="schedule-heading"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4"
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

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-6">
              {t("selectRoleSubtitle")}
            </p>
          </div>

          {/* Right Column: Navy Role Selection Card */}
          <div className="lg:col-span-6">
            <div className="">
              <h3 className="text-black text-xl font-semibold mb-6 text-left">
                {t("selectYourRole", "Select your role")}
              </h3>

              <div className="flex flex-col gap-4">
                {roles.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="group flex items-center justify-between rounded-2xl px-8 py-5 bg-ceed text-white text-xl font-semibold shadow-lg shadow-ceed/20 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] hover:shadow-ceed/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ceed/50"
                  >
                    <span>{label}</span>
                    <ArrowIcon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSelect;
