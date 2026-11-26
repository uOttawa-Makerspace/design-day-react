import sponsorNSERC from "../images/sponsors/NSERC.png";
import sponsorResolute from "../images/sponsors/resolute-forest-products-transparent.png";
import peo from "../images/sponsors/PEO.png";
import sponsorUOttawa from "../images/sponsors/uOttawa_HOR_BLACK.png";
import sponsorCNL from "../images/sponsors/CNLLNC_LOGO_V_RGB.png";
import sponsorSSC from "../images/sponsors/wordmark_C.png.png";

import { useTranslation } from "react-i18next";

// Increased height from h-16/h-20 to h-20/h-24 and max width to 320px
const logoClasses =
  "h-20 sm:h-24 w-auto max-w-[80%] sm:max-w-[320px] object-contain";

/**
- Displays the sponsors section: a title, a short thank-you note,
- and the sponsor logos.
 */
const Sponsors = () => {
  const { t } = useTranslation();

  return (
    <section
      id="sponsors"
      className="bg-white py-20 sm:py-24 border-t-4 border-[#1a2332]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
          {t("sponsors")}
        </h2>
        <p className="text-slate-600 text-sm sm:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          {" "}
          {t("sponsorsThanks", {
            defaultValue:
              "Thank you to our sponsors for making design day possible!",
          })}
        </p>

        {/* Logos */}
        <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-center gap-x-12 gap-y-12">
          <img
            src={sponsorUOttawa}
            alt="University of Ottawa"
            className="h-20 sm:h-24 w-auto max-w-[80%] sm:max-w-[360px] object-contain"
          />
          <img
            src={peo}
            alt="Professional Engineers Ontario"
            className={logoClasses}
          />
          <img
            src={sponsorCNL}
            alt="Canadian Nuclear Laboratories"
            className={logoClasses}
          />
          <img src={sponsorNSERC} alt="NSERC" className={logoClasses} />
          <img
            src={sponsorResolute}
            alt="Resolute Forest Products"
            className={logoClasses}
          />
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
