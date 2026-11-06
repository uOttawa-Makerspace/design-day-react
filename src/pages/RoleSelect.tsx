import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RoleSelect: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
          {t("selectRole")}
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto mb-12 leading-relaxed">
          {t("selectRoleSubtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Judge Card */}
          <Link
            to="/judges"
            className="group relative flex flex-col justify-center items-center rounded-2xl bg-slate-50 border-2 border-slate-200/80 p-10 transition-all duration-300 ease-in-out hover:bg-orange-50/70 hover:border-ceed hover:ring-2 hover:ring-ceed/20"
          >
            <span className="block text-2xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-ceed">
              {t("imJudge")}
            </span>
          </Link>

          {/* Student Card */}
          <Link
            to="/students"
            className="group relative flex flex-col justify-center items-center rounded-2xl bg-slate-50 border-2 border-slate-200/80 p-10 transition-all duration-300 ease-in-out hover:bg-orange-50/70 hover:border-ceed hover:ring-2 hover:ring-ceed/20"
          >
            <span className="block text-2xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-ceed">
              {t("imStudent")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoleSelect;
