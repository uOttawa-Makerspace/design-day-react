import backgroundImg from "../images/home-bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import config from "../config/config";
import { useTranslation } from "react-i18next";

/**
 * Displays the landing section of the application.
 *
 * This component includes a background image, the title of the event, a
 * brief description, and a button that links to the schedule section.
 */
const Home = () => {
  const { t } = useTranslation();

  return (
    <div
      id="home"
      className="bg-center min-h-650 bg-fixed"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="lg:w-2/3 flex items-center justify-center py-10 px-5">
        <div className="bg-white p-4 rounded-2xl lg:w-2/3">
          {/* Event title */}
          <h1 className="text-5xl font-normal leading-normal mt-0 mb-2">
            {t("design_day", {
              year: config.year,
              semester: t(`semesters.${config.semester}`),
            })}
          </h1>
          {/* Event description */}
          <p className="text-base font-light leading-relaxed mt-0 mb-4">
            {t("home_paragraph")}
          </p>
          {/* Link to schedule section */}
          <a href="#schedule">
            <button
              type="button"
              className="rounded-xl px-4 py-3 bg-ceed text-white"
            >
              {t("schedule")}
              <FontAwesomeIcon className="ml-2" icon={solid("arrow-down")} />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
