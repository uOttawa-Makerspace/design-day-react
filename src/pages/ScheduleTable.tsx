import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import config from "../config/config";

interface ScheduleTableProps {
  type: "judges" | "students";
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ type }) => {
  const { t } = useTranslation();

  const scheduleData =
    type === "judges" ? config.judgesSchedule : config.studentsSchedule;
  const title = type === "judges" ? t("judges") : t("students");

  return (
    <div id="schedule" className="flex justify-center py-2">
      <div className="w-full lg:w-1/2 px-4 lg:px-0 text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-3 text-left">
          {title}
        </h2>

        <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white leading-normal text-left">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                >
                  {t("time")}
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                >
                  {t("event")}
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((sched) => (
                <tr key={sched.eventEn}>
                  <td className="px-4 py-2 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-nowrap">
                      {sched.time}
                    </p>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-sm">
                    <p className="text-gray-900">
                      {i18n.language === "fr" ? sched.eventFr : sched.eventEn}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
