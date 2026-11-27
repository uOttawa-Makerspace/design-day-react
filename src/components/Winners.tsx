import React from "react";
import { useTranslation } from "react-i18next";
import winnersImgOne from "../images/winners-1.jpg";

// Constants for external URLs. Have this in Makerepo in the future instead.
const PAST_WINNERS_URL =
  "https://www.uottawa.ca/faculty-engineering/centre-entrepreneurship-engineering-design/past-winners";

const PAST_PICTURES_URL =
  "https://www.flickr.com/photos/uottawa-genie-engineering/albums/";

const ArrowIcon: React.FC = () => (
  <svg
    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-6-6 6 6-6 6"
    />
  </svg>
);

const Winners: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="winners" className="bg-[#1a2332] text-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left Column: Text & Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              {t("winners", { defaultValue: "Winners" })}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">
              {t("winnersSubtitle", {
                defaultValue:
                  "See the teams who took home top prizes in past years.",
              })}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href={t("past_winners_url") ?? PAST_WINNERS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 rounded-xl px-6 py-4 bg-ceed text-white text-lg font-medium shadow-lg shadow-ceed/20 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] hover:shadow-ceed/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ceed/50"
              >
                <span>
                  {t("viewPastWinners", { defaultValue: "View past winners" })}
                </span>
                <ArrowIcon />
              </a>
              <a
                href={PAST_PICTURES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 rounded-xl px-6 py-4 bg-ceed text-white text-lg font-medium shadow-lg shadow-ceed/20 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] hover:shadow-ceed/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ceed/50"
              >
                <span>
                  {t("viewPastPictures", {
                    defaultValue: "View past pictures",
                  })}
                </span>
                <ArrowIcon />
              </a>
            </div>
          </div>

          {/* Right Column: Picture */}
          <div className="w-full max-w-sm md:max-w-md mx-auto">
            <img
              src={winnersImgOne}
              alt="Past Design Day winners"
              className="w-full h-auto max-h-[280px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
