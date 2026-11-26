import React from "react";
import { useTranslation } from "react-i18next";
import { FoodBlurb, Role } from "../services/googleSheets";

interface FoodProps {
  type: Role;
  blurb?: FoodBlurb; // from the "Other DD{day}" tab
}

const Food: React.FC<FoodProps> = ({ type, blurb }) => {
  const { t, i18n } = useTranslation();

  const sheetSubtitle = i18n.language === "fr" ? blurb?.fr : blurb?.en;
  const roleSubtitle = t(`food.${type}_subtitle`, { defaultValue: "" });
  const displaySubtitle =
    sheetSubtitle?.trim() ||
    roleSubtitle.trim() ||
    t("food.subtitle_placeholder");

  return (
    <div id="food" className="flex justify-center">
      <div className="w-full lg:w-1/2 lg:px-0 text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-3 text-left capitalize">
          {t("food.title")}
        </h2>
        <p className="text-base sm:text-lg text-slate-600">{displaySubtitle}</p>
      </div>
    </div>
  );
};

export default Food;
