import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleTable from "./ScheduleTable";

type TabType = "judges" | "students";

const GeneralSchedule = () => {
  const [activeTab, setActiveTab] = useState<TabType>("judges");
  const { t } = useTranslation();

  return (
    <div id="schedule" className="flex justify-center">
      <div className="lg:w-1/2 pt-10 py-3 px-4 lg:px-0">
        <ScheduleHeader />

        <div className="flex justify-center mb-4">
          <div className="border-b border-gray-300">
            <button
              className={`px-6 py-2 inline-block ${
                activeTab === "judges"
                  ? "text-ceed border-ceed"
                  : "text-gray-500 border-transparent"
              } border-b-2`}
              onClick={() => setActiveTab("judges")}
            >
              {t("judges")}
            </button>
            <button
              className={`px-6 py-2 inline-block ${
                activeTab === "students"
                  ? "text-orange-500 border-orange-500"
                  : "text-gray-500 border-transparent"
              } border-b-2`}
              onClick={() => setActiveTab("students")}
            >
              {t("students")}
            </button>
          </div>
        </div>

        <ScheduleTable type={activeTab} />

        <p className="text-base font-light leading-relaxed mt-0 mb-2">
          {t("presentation_paragraph")}
        </p>
        <ul className="text-base font-light leading-relaxed mt-0 mb-2 space-y-1 list-disc list-inside pl-3">
          <li>{t("presentation_li_1")}</li>
          <li>{t("presentation_li_2")}</li>
        </ul>
      </div>
    </div>
  );
};

export default GeneralSchedule;
