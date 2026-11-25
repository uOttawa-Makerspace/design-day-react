import React from "react";
import { useTranslation, Trans } from "react-i18next";
import config from "../config/config";
import homeImgOne from "../images/home-1.jpg";
import homeImgTwo from "../images/home-2.jpg";
import ceedLogo from "../images/logos/CEED_white.png";
import cgecLogo from "../images/logos/CGEC_white.png";

const HighlightLink = ({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-[#F84A32] hover:underline underline-offset-4"
  >
    {children}
  </a>
);

const Home = () => {
  const { t, i18n } = useTranslation();

  const isFrench = i18n.language?.startsWith("fr");
  const logoSrc = isFrench ? cgecLogo : ceedLogo;
  const logoAlt = isFrench ? "CGEC" : "CEED";

  return (
    <div
      id="home"
      className="md:min-h-[650px] bg-[#1a2332] text-white flex items-center overflow-hidden"
    >
      {/* Standardized container: px-4 sm:px-6 lg:px-8 */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">
        {/* Left text block */}
        <div className="text-center md:text-left">
          <h1 className="mt-0 mb-4 flex flex-col">
            <span className="text-ceed uppercase font-black tracking-tight text-6xl sm:text-7xl lg:text-8xl leading-none mb-3">
              {t("design_day")}
            </span>

            <span className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-3 gap-y-2 text-3xl sm:text-4xl lg:text-5xl leading-none">
              <span className="text-white font-semibold tracking-tight">
                {t(`semesters.${config.semester}`)} {config.year}
              </span>

              <span className="inline-flex items-baseline gap-2.5">
                <span className="text-[0.75em] font-bold text-slate">
                  {t("presented_by")}
                </span>
                <a
                  href={t("ceed_url") ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block align-baseline -translate-y-[-1px] hover:opacity-80 transition-opacity"
                >
                  <img
                    src={logoSrc}
                    alt={logoAlt}
                    className="h-[0.74em] w-auto block"
                  />
                </a>
              </span>
            </span>
          </h1>

          <p className="text-base lg:text-lg font-light leading-relaxed mt-0 mb-6 text-gray-200 max-w-2xl">
            <Trans
              i18nKey="home_paragraph"
              components={{
                ceedLink: <HighlightLink href={t("ceed_url") ?? ""} />,
                designDayLink: (
                  <HighlightLink href={t("what_is_design_day_url") ?? ""} />
                ),
              }}
            />
          </p>
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
