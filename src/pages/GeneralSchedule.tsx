import config from "../config/config";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const GeneralSchedule = () => {
  const { t } = useTranslation();

  return (
    <div id="schedule" className="flex justify-center">
      <div className="lg:w-1/2 pt-10 py-3 px-4 lg:px-0">
        <h2 className="text-5xl font-normal mt-0 mb-2">{t("schedule")}</h2>
        <h3 className="text-2xl font-normal mt-0 mb-2">
          {i18n.language === "fr" ? config.dateFr : config.dateEn}
        </h3>
        <p className="text-base font-light leading-relaxed mt-0 mb-2">
          {t("schedule_paragraph", {
            year: config.year,
            // semester: t(`semesters.${config.semester}`).toLowerCase()
            semester:
              i18n.language === "fr"
                ? t(`semesters.${config.semester}`).toLowerCase()
                : t(`semesters.${config.semester}`),
          })}
        </p>
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <div className="py-4">
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
                    {config.generalSchedule.map((sched) => (
                      <tr key={sched.eventEn}>
                        <td className="px-5 py-5 border-b border-gray-300 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {sched.time}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-300 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {i18n.language === "fr"
                              ? sched.eventFr
                              : sched.eventEn}
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
