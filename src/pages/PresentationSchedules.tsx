import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import config from "../config/config";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import siteFloorPlan from "../images/floorplans/Floorplan_SITEatrium.webp";
import siteRotundaFloorPlan from "../images/floorplans/Floorplan_SITErotunda.webp";
import stemFloorPlan from "../images/floorplans/Floorplan_STEM.webp";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

interface Category {
  name: string;
  description?: string;
  location: string;
  presentations: Record<string, Presentation[]>;
}

interface Presentation {
  section?: string;
  group?: string;
  time?: string;
  project?: string;
  project_description?: string;
  project_repo?: string;
}

const DisplayTh = ({
  category,
  presentationSection,
  cell,
}: {
  category: Category;
  presentationSection: string;
  cell: keyof Presentation;
}) => {
  const { t } = useTranslation();
  return category.presentations[presentationSection].some((el) => el[cell]) ? (
    <th
      scope="col"
      className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
    >
      {t(cell)}
    </th>
  ) : null;
};

const DisplayTd = ({
  category,
  presentationSection,
  presentation,
  cell,
  with_link = false,
}: {
  category: Category;
  presentationSection: string;
  presentation: Presentation;
  cell: keyof Presentation;
  with_link?: boolean;
}) => {
  return category.presentations[presentationSection].some((el) => el[cell]) ? (
    with_link ? (
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {presentation[cell]?.includes("https://") ? (
            <a className="underline" href={presentation[cell]}>
              {presentation[cell]}
            </a>
          ) : (
            presentation[cell]
          )}
        </p>
      </td>
    ) : (
      <td className="px-5 py-5 border-b border-gray-300 text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{presentation[cell]}</p>
      </td>
    )
  ) : null;
};

/**
 * Displays presentation schedules for different categories.
 *
 * This component fetches presentation data from a Google Sheets spreadsheet and displays it
 * in a series of collapsible sections. Each section contains a table with presentation details
 * such as section, group, time, project, project description, and project repository. It also
 * includes a lightbox for viewing floor plans.
 */
const PresentationSchedules = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const images = [
    {
      title: "SITE 1",
      caption: "SITE 1",
      src: siteFloorPlan,
    },
    {
      title: "SITE 0",
      caption: "SITE 0",
      src: siteRotundaFloorPlan,
    },
    { title: "STEM", caption: "STEM", src: stemFloorPlan },
  ];

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/1st-year?key=${process.env.REACT_APP_GOOGLE_API_KEY}&range=!A2:ZZZ1000`
    )
      .then((res) => res.json())
      .then((data) => {
        const categories: Category[] = [];
        for (let i = 0; i < data.values[0].length; i += 7) {
          categories.push({
            name: data.values[0][i],
            description: data.values[0][i + 1],
            location: data.values[0][i + 2],
            presentations: {},
          });
        }

        const presentationData = data.values.slice(3);
        for (let i = 0; i < presentationData.length; i++) {
          for (let j = 0; j < presentationData[i].length; j += 7) {
            if (presentationData[i].slice(j, j + 6).some((el: string) => el)) {
              if (!categories[j / 7].presentations[presentationData[i][j]]) {
                categories[j / 7].presentations[presentationData[i][j]] = [];
              }
              categories[j / 7].presentations[presentationData[i][j]].push({
                section: presentationData[i][j],
                group: presentationData[i][j + 1],
                time: presentationData[i][j + 2],
                project: presentationData[i][j + 3],
                project_description: presentationData[i][j + 4],
                project_repo: presentationData[i][j + 5],
              });
            }
          }
        }

        setCategories(categories);
      });
  }, []);

  return (
    <div id="presentation" className="flex justify-center">
      <div className="w-full lg:w-1/2 pb-10 px-4 lg:px-0">
        <div className="rounded-2xl pb-5">
          {categories.map((category) => (
            <Disclosure key={category.name}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full bg-ceed text-white my-2 items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium focus:outline-none">
                    <span>{category.name}</span>
                    <FontAwesomeIcon
                      icon={open ? solid("chevron-up") : solid("chevron-down")}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 text-sm text-gray-500">
                      <div className="p-2 items-center w-full sm:flex sm:justify-between">
                        {category.description ? (
                          <p className="mb-2 lg:mb-0">
                            {t("description")}{" "}
                            <a
                              className="underline"
                              href={category.description}
                            >
                              {category.description}
                            </a>
                          </p>
                        ) : (
                          <div></div>
                        )}
                        <div className="px-2 py-1 bg-ceed text-white rounded-2xl flex justify-center">
                          {category.location}
                        </div>
                      </div>

                      {Object.keys(category.presentations).map(
                        (presentationSection, i) => (
                          <Disclosure
                            key={i}
                            defaultOpen={
                              Object.keys(category.presentations).length === 1
                            }
                          >
                            {({ open }) => (
                              <div>
                                <Disclosure.Button className="flex w-full bg-ceed-light text-white my-2 items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium focus:outline-none">
                                  <span>{presentationSection}</span>
                                  <FontAwesomeIcon
                                    icon={
                                      open
                                        ? solid("chevron-up")
                                        : solid("chevron-down")
                                    }
                                  />
                                </Disclosure.Button>
                                <Transition
                                  enter="transition duration-100 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >
                                  <Disclosure.Panel className="px-4 text-sm text-gray-500">
                                    <div key={i} className="overflow-x-scroll">
                                      <table className="min-w-full leading-normal">
                                        <thead>
                                          <tr>
                                            <DisplayTh
                                              category={category}
                                              presentationSection={
                                                presentationSection
                                              }
                                              cell="section"
                                            />
                                            <DisplayTh
                                              category={category}
                                              presentationSection={
                                                presentationSection
                                              }
                                              cell="group"
                                            />
                                            <DisplayTh
                                              category={category}
                                              presentationSection={
                                                presentationSection
                                              }
                                              cell="time"
                                            />
                                            <DisplayTh
                                              category={category}
                                              presentationSection={
                                                presentationSection
                                              }
                                              cell="project"
                                            />
                                            <DisplayTh
                                              category={category}
                                              presentationSection={
                                                presentationSection
                                              }
                                              cell="project_description"
                                            />
                                            <DisplayTh
                                              category={category}
                                              presentationSection={
                                                presentationSection
                                              }
                                              cell="project_repo"
                                            />
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {category.presentations[
                                            presentationSection
                                          ].map((presentation, i) => (
                                            <tr key={i}>
                                              <DisplayTd
                                                category={category}
                                                presentationSection={
                                                  presentationSection
                                                }
                                                presentation={presentation}
                                                cell="section"
                                              />
                                              <DisplayTd
                                                category={category}
                                                presentationSection={
                                                  presentationSection
                                                }
                                                presentation={presentation}
                                                cell="group"
                                              />
                                              <DisplayTd
                                                category={category}
                                                presentationSection={
                                                  presentationSection
                                                }
                                                presentation={presentation}
                                                cell="time"
                                              />
                                              <DisplayTd
                                                category={category}
                                                presentationSection={
                                                  presentationSection
                                                }
                                                presentation={presentation}
                                                cell="project"
                                              />
                                              <DisplayTd
                                                category={category}
                                                presentationSection={
                                                  presentationSection
                                                }
                                                presentation={presentation}
                                                cell="project_description"
                                                with_link={true}
                                              />
                                              <DisplayTd
                                                category={category}
                                                presentationSection={
                                                  presentationSection
                                                }
                                                presentation={presentation}
                                                cell="project_repo"
                                                with_link={true}
                                              />
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </Disclosure.Panel>
                                </Transition>
                              </div>
                            )}
                          </Disclosure>
                        )
                      )}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        <h4 className="text-xl font-normal mt-0 mb-2">{t("floor_plans")}</h4>

        {config.hideFloorPlan ? (
          t("no_floor_plans")
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {images.map((image, i) => (
              <button
                onClick={() => {
                  setImgIndex(i);
                  setIsImgPopupOpen(true);
                }}
                className="flex flex-col items-center justify-center"
                key={image.title}
              >
                <p className="text-sm font-semibold mb-2">{image.title}</p>
                <img
                  className="w-auto h-auto max-h-full"
                  src={image.src}
                  alt={image.caption}
                />
              </button>
            ))}
          </div>
        )}

        <Lightbox
          open={isImgPopupOpen}
          index={imgIndex}
          slides={images}
          close={() => setIsImgPopupOpen(false)}
          plugins={[Captions]}
        />
      </div>
    </div>
  );
};

export default PresentationSchedules;
