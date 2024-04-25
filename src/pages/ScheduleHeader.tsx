import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import config from "../config/config";

/**
 * Displays the header for the schedule section.
 *
 * This component includes the schedule title, 
 * the date of the event, and a description.
 */
const ScheduleHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Schedule title */}
      <h2 className="text-5xl font-normal mt-0 mb-2">{t("schedule")}</h2>
      {/* Event date */}
      <h3 className="text-2xl font-normal mt-0 mb-2">
        {i18n.language === "fr" ? config.dateFr : config.dateEn}
      </h3>
      {/* Schedule description */}
      <p className="text-base font-light leading-relaxed mt-0 mb-2">
        {t("schedule_paragraph", {
          year: config.year,
          semester:
            i18n.language === "fr"
              ? t(`semesters.${config.semester}`).toLowerCase()
              : t(`semesters.${config.semester}`),
        })}
      </p>
    </div>
  );
};

export default ScheduleHeader;
