import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import config from "../config/config";
import homeImgOne from "../images/home-1.jpg";
import homeImgTwo from "../images/home-2.jpg";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div
      id="home"
      className="md:min-h-[650px] bg-[#1a2332] text-white flex items-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">
        {/* Left: text */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-0 mb-4">
            {t("design_day", {
              year: config.year,
              semester: t(`semesters.${config.semester}`),
            })}
          </h1>

          <p className="text-base lg:text-lg font-light leading-relaxed mt-0 mb-6 text-gray-200">
            {t("home_paragraph")}{" "}
            <a
              href={t("what_is_design_day_url") ?? ""}
              className="font-medium text-ceed hover:underline"
            >
              {t("what_is_design_day")}
            </a>
          </p>

          <a
            href="#schedule"
            className="inline-block rounded-xl px-4 py-3 bg-ceed text-white"
          >
            {t("schedule")}
            <FontAwesomeIcon className="ml-2" icon={solid("arrow-down")} />
          </a>
        </div>

        {/* Right: two pictures */}
        <div className="relative w-full max-w-md md:max-w-none mx-auto aspect-[4/3]">
          <img
            src={homeImgOne}
            alt=""
            className="absolute top-0 right-0 w-2/3 h-3/4 object-cover rounded-2xl shadow-xl"
          />
          <img
            src={homeImgTwo}
            alt=""
            className="absolute bottom-0 left-0 w-1/2 h-3/5 object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
