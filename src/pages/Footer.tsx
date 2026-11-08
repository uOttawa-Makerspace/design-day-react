import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

/**
 * Displays social media icons and copyright information.
 * This component uses FontAwesome icons to display links to social media platforms.
 */
const Footer = () => {
  // Hook to access translation function
  const { t } = useTranslation();

  return (
    <div className="bg-ceed py-5">
      <div className="justify-center flex gap-10 mb-10">
        {/* Facebook */}
        <a href="https://www.facebook.com/uOCEED/">
          <FontAwesomeIcon icon={faFacebook} size="xl" className="text-white" />
        </a>
        {/* Twitter */}
        <a href="https://twitter.com/uOCEED">
          <FontAwesomeIcon icon={faTwitter} size="xl" className="text-white" />
        </a>
        {/* Instagram */}
        <a href="https://www.instagram.com/uoceed">
          <FontAwesomeIcon
            icon={faInstagram}
            size="xl"
            className="text-white"
          />
        </a>
      </div>
      <p className="text-white text-center text-sm font-light leading-relaxed">
        {/* Copyright */}
        <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} —{" "}
        {/* CEED */}
        <a className="underline" href="https://engineering.uottawa.ca/CEED">
          {t("centre_for_entrepreneurship_and_engineering_design")}
        </a>{" "}
        AND {/* GitHub contributors */}
        <a
          className="underline"
          href="https://github.com/uOttawa-Makerspace/design-day-react/graphs/contributors"
        >
          {t("github_contributors")}
        </a>
      </p>
    </div>
  );
};

export default Footer;
