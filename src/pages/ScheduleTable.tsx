import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import config from "../config/config";

interface ScheduleTableProps {
  type: 'judges' | 'students';
}
const ScheduleTable: React.FC<ScheduleTableProps> = ({ type }) => {
  const { t } = useTranslation();

  const scheduleData = type === 'judges' ? config.judgesSchedule : config.studentsSchedule;
  const title = type === 'judges' ? t("judges") : t("students");

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <h3 className="text-2xl font-normal mt-1 mb-0">{title}</h3> 
      <div className="py-4 pt-1">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal bg-gray-50">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    {t("time")}
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                  >
                    {t("event")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((sched) => (
                  <tr key={sched.eventEn}>
                    <td className="px-5 py-5 border-b border-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {sched.time}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
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
    </div>
  );
};

export default ScheduleTable;