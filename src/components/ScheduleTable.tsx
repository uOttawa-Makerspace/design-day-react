import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Role, ScheduleRow } from "../services/googleSheets";

interface ScheduleTableProps {
  type: Role;
  rows: ScheduleRow[];
  failed?: boolean;
}

const headerClass =
  "px-4 py-2 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold";
const cellClass = "px-4 py-2 border-b border-gray-200 text-sm";

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  type,
  rows,
  failed = false,
}) => {
  const { t } = useTranslation();

  const title = type === "judges" ? t("judges") : t("students");

  return (
    <div id="schedule" className="flex justify-center py-2">
      <div className="w-full lg:w-1/2 px-4 lg:px-0 text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-3 text-left">
          {title}
        </h2>

        {failed ? (
          <p className="text-sm text-gray-500" role="status">
            {t("day_schedule_unavailable")}
          </p>
        ) : (
          <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
            <table className="min-w-full bg-white leading-normal text-left">
              <thead>
                <tr>
                  <th scope="col" className={headerClass}>
                    {t("time")}
                  </th>
                  <th scope="col" className={headerClass}>
                    {t("event")}
                  </th>
                  <th scope="col" className={headerClass}>
                    {t("location")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className={cellClass}>
                      <p className="text-gray-900 whitespace-nowrap">
                        {row.time}
                      </p>
                    </td>
                    <td className={cellClass}>
                      <p className="text-gray-900">
                        {i18n.language === "fr" ? row.detailsFr : row.detailsEn}
                      </p>
                    </td>
                    <td className={cellClass}>
                      <p className="text-gray-900 whitespace-nowrap">
                        {row.location}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTable;
