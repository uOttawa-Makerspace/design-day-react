import sponsorImg from "../images/sponsors.png";
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
      <div className="lg:w-1/3 py-10 text-center">
        {/* Sponsors title */}
        <h2 className="text-5xl font-normal leading-normal mt-0 mb-1">
          {t("sponsors")}
        </h2>
        {/* Sponsors image */}
        <img src={sponsorImg} alt="sponsors" />
      </div>
    </div>
  );
};

export default Sponsors;
