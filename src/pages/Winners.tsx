import React from "react";
import { useTranslation } from "react-i18next";
import winnersImgOne from "../images/winners-1.jpg";

const PAST_WINNERS_URL =
  "https://www.uottawa.ca/faculty-engineering/centre-entrepreneurship-engineering-design/past-winners";

const PAST_PICTURES_URL =
  "https://www.flickr.com/photos/uottawa-genie-engineering/albums/";

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
                href={PAST_WINNERS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl px-6 py-4 bg-ceed text-white text-lg font-medium transition-opacity hover:opacity-90"
              >
                {t("viewPastWinners", { defaultValue: "View past winners" })}
              </a>
              <a
                href={PAST_PICTURES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl px-6 py-4 bg-ceed text-white text-lg font-medium transition-opacity hover:opacity-90"
              >
                {t("viewPastPictures", { defaultValue: "View past pictures" })}
              </a>
            </div>
          </div>

          {/* Right Column: Picture */}
          <div className="w-full max-w-md md:max-w-none mx-auto">
            <img
              src={winnersImgOne}
              alt="Past Design Day winners"
              className="w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
