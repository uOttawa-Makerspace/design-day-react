import React from "react";
import { useTranslation } from "react-i18next";

interface FoodProps {
  type: "judges" | "students";
  subtitle?: string;
}

const Food: React.FC<FoodProps> = ({ type, subtitle }) => {
  const { t } = useTranslation();

  const roleSubtitle = t(`food.${type}_subtitle`, { defaultValue: "" });
  const displaySubtitle =
    subtitle?.trim() || roleSubtitle.trim() || t("food.subtitle_placeholder");

  return (
    <div id="food" className="flex justify-center py-2">
      <div className="w-full lg:w-1/2 px-4 lg:px-0 text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-3 text-left capitalize">
          {t("food.title")}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mb-6">
          {displaySubtitle}
        </p>
      </div>
    </div>
  );
};

export default Food;
