import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

/**
- Displays social media icons, CEED copyright info, and contributor link.
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ceed py-8 text-white text-center">
      {/* 1. Social Media Logos */}
      <div className="justify-center flex gap-8 mb-4">
        <a
          href="https://www.facebook.com/uOCEED/"
          aria-label="Facebook"
          className="hover:opacity-80 transition-opacity"
        >
          <FontAwesomeIcon icon={faFacebook} size="xl" />
        </a>
        <a
          href="https://www.instagram.com/cgec.uottawa.ceed"
          aria-label="Instagram"
          className="hover:opacity-80 transition-opacity"
        >
          <FontAwesomeIcon icon={faInstagram} size="xl" />
        </a>
        <a
          href="https://www.linkedin.com/company/the-centre-for-entrepreneurship-and-engineering-design/posts/?feedView=all"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <FontAwesomeIcon icon={faLinkedin} size="xl" />
        </a>
      </div>

      {/* 2. Copyright © 2026 Centre for Entrepreneurship and Engineering Design and MakerRepo Contributors */}
      <p className="text-sm sm:text-base font-medium leading-relaxed">
        Copyright <FontAwesomeIcon icon={faCopyright} className="mx-1" />{" "}
        {new Date().getFullYear()}{" "}
        <a
          className="underline hover:opacity-80 transition-opacity"
          href="https://engineering.uottawa.ca/CEED"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("centre_for_entrepreneurship_and_engineering_design")}
        </a>{" "}
        and{" "}
        <a
          className="underline hover:opacity-80 transition-opacity"
          href="https://github.com/uOttawa-Makerspace/design-day-react/graphs/contributors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("github_contributors")}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
