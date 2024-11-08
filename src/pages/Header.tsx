import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useTranslation } from "react-i18next";
import config from "../config/config";
import i18n from "i18next";

/**
 * Utility function to combine CSS classes.
 */
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Displays the navigation bar for the application.
 *
 * This component uses the Disclosure component from Headless UI to handle
 * the mobile menu toggle. It displays the application title and navigation
 * links for different sections. It also includes a button to switch between
 * languages (English and French).
 */
const Header = () => {
  const { t } = useTranslation();

  // Navigation links for the header
  const navigation = [
    { name: t("home"), href: "#home", current: true },
    { name: t("schedule"), href: "#schedule", current: false },
    { name: t("presentations"), href: "#presentation", current: false },
    { name: t("sponsors"), href: "#sponsors", current: false },
    { name: t("makerepo"), href: "https://makerepo.com", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <FontAwesomeIcon icon={solid("bars")} size="lg" />
                </Disclosure.Button>
              </div>
              {/* Application title */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-white">
                  {t("design_day", {
                    year: config.year,
                    semester: t(`semesters.${config.semester}`),
                  })}
                </div>
                {/* Desktop navigation links */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* Language switch button */}
              <button
                onClick={() =>
                  i18n.changeLanguage(
                    i18n.language === "fr" ? "en" : "fr",
                    () => {
                      localStorage.setItem("defaultLang", i18n.language);
                    }
                  )
                }
                className="flex items-center justify-center sm:justify-end text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {i18n.language === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </div>
          {/* Mobile navigation menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
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
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
