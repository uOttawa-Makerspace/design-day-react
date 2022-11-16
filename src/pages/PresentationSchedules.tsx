import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface Categories {
  name: string;
  description: string;
  location: string;
  presentations: Presentation[];
}

interface Presentation {
  section: string;
  group: string;
  time: string;
  project: string;
}

const PresentationSchedules = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/1st-year?key=${process.env.REACT_APP_GOOGLE_API_KEY}&range=!A2:Z1000`
    )
      .then((res) => res.json())
      .then((data) => {
        const categories: Categories[] = [];
        for (let i = 0; i < data.values[0].length; i += 5) {
          categories.push({
            name: data.values[0][i],
            description: data.values[0][i + 1],
            location: data.values[0][i + 2],
            presentations: [],
          });
        }

        const presentationData = data.values.slice(3);
        for (let i = 0; i < presentationData.length; i++) {
          for (let j = 0; j < presentationData[i].length; j += 5) {
            categories[j / 5].presentations.push({
              section: presentationData[i][j],
              group: presentationData[i][j + 1],
              time: presentationData[i][j + 2],
              project: presentationData[i][j + 3],
            });
          }
        }

        setCategories(categories);
        console.log(categories);
      });
  }, []);

  return (
    <div id="schedule" className="flex justify-center">
      <div className="w-full lg:w-1/2 pb-10 px-4 lg:px-0">
        <div className="rounded-2xl pb-5">
          {categories.map((category) => (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full bg-ceed text-white my-2 justify-between rounded-lg px-4 py-3 text-left text-sm font-medium focus:outline-none">
                    <span>{category.name}</span>
                    <FontAwesomeIcon
                      icon={open ? solid("chevron-up") : solid("chevron-down")}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 text-sm text-gray-500">
                    <div className="flex p-2 items-center w-full justify-between">
                      <p>
                        {t("description")}{" "}
                        <a className="underline" href={category.description}>
                          {category.description}
                        </a>
                      </p>
                      <div className="px-2 py-1 bg-ceed text-white rounded-2xl">
                        {category.location}
                      </div>
                    </div>
                    <div className="overflow-scroll">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                            >
                              {t("section")}
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                            >
                              {t("group")}
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                            >
                              {t("time")}
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
                            >
                              {t("project")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.presentations.map((presentation) => (
                            <tr key={presentation.group}>
                              <td className="px-5 py-5 border-b border-gray-300 text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {presentation.section}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-300 text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {presentation.group}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-300 text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {presentation.time}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-300 text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {presentation.project.includes("https://") ? (
                                    <a
                                      className="underline"
                                      href={presentation.project}
                                    >
                                      {presentation.project}
                                    </a>
                                  ) : (
                                    presentation.project
                                  )}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        <p className="text-base font-light leading-relaxed mt-0">
          {t("awards_ceremony_paragraph")}
        </p>
      </div>
    </div>
  );
};

export default PresentationSchedules;
