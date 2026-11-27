import { useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import config from "../config/config";
import i18n from "i18next";
import useHideOnScroll from "../hooks/useHideOnScroll";
import ceedLogo from "../images/logos/CEED_white.png";
import cgecLogo from "../images/logos/CGEC_white.png";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Header = () => {
  const { t } = useTranslation();
  const visible = useHideOnScroll();
  const { pathname, hash } = useLocation();

  const isFrench = i18n.language?.startsWith("fr");
  const logoSrc = isFrench ? cgecLogo : ceedLogo;
  const logoAlt = isFrench ? "CGEC" : "CEED";

  useEffect(() => {
    if (pathname === "/" && hash === "#sponsors") {
      setTimeout(() => {
        document
          .getElementById("sponsors")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const navigation = [
    {
      name: t("home"),
      to: "/",
      current: pathname === "/" && hash !== "#sponsors",
    },
    {
      name: t("sponsors"),
      to: "/#sponsors",
      current: pathname === "/" && hash === "#sponsors",
    },
    { name: t("judges"), to: "/judges", current: pathname === "/judges" },
    { name: t("students"), to: "/students", current: pathname === "/students" },
  ];

  const toggleLanguage = () =>
    i18n.changeLanguage(isFrench ? "en" : "fr", () => {
      localStorage.setItem("defaultLang", i18n.language);
    });

  return (
    <Disclosure
      as="nav"
      className={classNames(
        "fixed top-0 left-0 w-full z-50 bg-[#1a2332]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20",
        "transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {() => (
        <>
          {/* Matched padding: px-4 sm:px-6 lg:px-8 */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="inset-y-0 left-0 flex items-center sm:hidden mr-2">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <FontAwesomeIcon icon={faBars} size="lg" />
                </Disclosure.Button>
              </div>

              {/* Header content starting flush on the left */}
              <div className="flex flex-1 items-center justify-start">
                <div className="flex-shrink-0 mr-6">
                  <a
                    href={t("ceed_url")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img src={logoSrc} alt={logoAlt} className="h-6 w-auto" />
                  </a>
                </div>

                <div className="flex-shrink-0 text-gray-400 text-sm sm:text-base mr-6 hidden sm:block">
                  {t("design_day", {
                    year: config.year,
                    semester: t(`semesters.${config.semester}`),
                  })}
                </div>

                {/* Desktop links */}
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {isFrench ? "EN" : "FR"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="a"
                href={t("ceed_url")}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md hover:bg-gray-700"
              >
                <img src={logoSrc} alt={logoAlt} className="h-5 w-auto" />
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
