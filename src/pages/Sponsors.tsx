import sponsorGovernment from "../images/sponsors/3li_EnFr_Wordmark_C.png";
import sponsorNSERC from "../images/sponsors/NSERC.png";
import sponsorResolute from "../images/sponsors/resolute-forest-products-transparent.png";
import sponsorYear3000 from "../images/sponsors/Year3000GroupTransparentLogo.png";
import sponsorUOttawa from "../images/sponsors/uOttawa_HOR_BLACK.png";
import sponsorDesjardins from "../images/sponsors/d15-desjardins-logo-couleur.png";
import sponsorCNL from "../images/sponsors/CNLLNC_LOGO_V_RGB.png";
// Don't use one big image block
//import sponsorImg from "../images/sponsors.png";

import { useTranslation } from "react-i18next";

/**
 * Displays the sponsors section of the application.
 *
 * This component includes a title and an image containing logos of sponsors.
 */
const Sponsors = () => {
  const { t } = useTranslation();

  return (
    <div id="sponsors" className="flex justify-center bg-gray-100 px-4 lg:px-0">
      <div className="lg:w-2/5 py-10 text-center">
        {/* Sponsors title */}
        <h2 className="text-5xl font-normal leading-normal mt-0 mb-1">
          {t("sponsors")}
        </h2>
        {/* Sponsors image */}
        {/* <img src={sponsorImg} alt="sponsors" /> */}
        <div className="md:grid grid-cols-6 gap-4 items-center">
          <img
            src={sponsorGovernment}
            alt="sponsorLogo"
            className="col-span-3"
          />
          <img src={sponsorUOttawa} alt="sponsorLogo" className="col-span-3" />
          {[sponsorNSERC, sponsorResolute, sponsorYear3000].map(
            (sponsor_img, i) => (
              <img
                src={sponsor_img}
                key={i}
                alt="sponsorLogo"
                className="col-span-2"
              />
            )
          )}
          {[sponsorDesjardins, sponsorCNL].map((sponsor_img, i) => (
            <img
              src={sponsor_img}
              key={i}
              alt="sponsorLogo"
              className="col-span-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
