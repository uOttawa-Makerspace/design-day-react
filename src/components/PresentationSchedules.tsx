import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  Category,
  Presentation,
  fetchDayTabs,
  followTab,
  parsePresentations,
} from "../services/googleSheets";
import { Day } from "./ScheduleLayout";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// "abc" -> /a.*b.*c/: the search letters in order, anywhere in the text.
function fuzzyPattern(search: string): RegExp {
  return new RegExp(
    search.normalize().toLowerCase().split("").map(escapeRegExp).join(".*")
  );
}

function filteredCategories(
  categories: Category[],
  search: string
): Category[] {
  const pattern = fuzzyPattern(search);
  let outCat: Category[] = [];
  categories.forEach((cat) => {
    let outSections: Record<string, Presentation[]> = {};
    for (const [section, presentations] of Object.entries(cat.presentations)) {
      let newPresentations = presentations.filter((p: Presentation) =>
        pattern.test((p.group || "").normalize().toLowerCase())
      );

      if (newPresentations.length > 0) {
        outSections[section] = newPresentations;
      }
    }

    if (Object.entries(outSections).length > 0) {
      outCat.push({
        name: cat.name,
        description: cat.description,
        location: cat.location,
        presentations: outSections,
      });
    }
  });
  return outCat;
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
}: {
  category: Category;
  presentationSection: string;
  presentation: Presentation;
  cell: keyof Presentation;
}) => {
  return category.presentations[presentationSection].some((el) => el[cell]) ? (
    <td className={tdClass(Boolean(presentation[cell]))}>
      <MobileLabel cell={cell} />
      <p className="text-gray-900">{presentation[cell]}</p>
    </td>
  ) : null;
};

// Below md, each row is a stacked card ("LABEL  value" per line) instead of
// a wide table, so nothing has to scroll sideways on phones. A line with no
// value is hidden on phones; on desktop the empty cell stays so columns line up.
const tdClass = (hasValue: boolean) =>
  `${
    hasValue ? "flex" : "hidden"
  } items-baseline gap-3 px-1 py-1 text-sm md:table-cell md:px-5 md:py-5 md:border-b md:border-gray-300`;

const isLink = (value?: string) => Boolean(value?.includes("https://"));

const MobileLabel = ({ cell }: { cell: keyof Presentation }) => {
  const { t } = useTranslation();
  return (
    <span className="md:hidden w-20 shrink-0 text-xs uppercase font-semibold text-gray-800">
      {t(cell)}
    </span>
  );
};

const PROJECT_CELLS = [
  "project",
  "project_description",
  "project_repo",
] as const;

const sectionHasProject = (category: Category, presentationSection: string) =>
  category.presentations[presentationSection].some((p) =>
    PROJECT_CELLS.some((cell) => p[cell])
  );

const ProjectTh = ({
  category,
  presentationSection,
}: {
  category: Category;
  presentationSection: string;
}) => {
  const { t } = useTranslation();
  return sectionHasProject(category, presentationSection) ? (
    <th
      scope="col"
      className="px-5 py-3 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold"
    >
      {t("project")}
    </th>
  ) : null;
};

const LinkButton = ({ href, label }: { href?: string; label: string }) =>
  isLink(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-lg bg-gray-400 px-3 py-1.5 text-center text-sm font-medium text-white hover:opacity-90 whitespace-nowrap"
    >
      {label}
    </a>
  ) : null;

const ProjectTd = ({
  category,
  presentationSection,
  presentation,
}: {
  category: Category;
  presentationSection: string;
  presentation: Presentation;
}) => {
  const { t } = useTranslation();
  return sectionHasProject(category, presentationSection) ? (
    <td
      className={tdClass(
        Boolean(presentation.project) ||
          isLink(presentation.project_description) ||
          isLink(presentation.project_repo)
      )}
    >
      <MobileLabel cell="project" />
      <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
        {presentation.project && (
          <p className="text-gray-900">{presentation.project}</p>
        )}
        <div className="flex gap-2 shrink-0 md:flex-col md:ml-auto">
          <LinkButton
            href={presentation.project_description}
            label={t("description_button")}
          />
          <LinkButton
            href={presentation.project_repo}
            label={t("repository_button")}
          />
        </div>
      </div>
    </td>
  ) : null;
};

const PresentationDisclosure = ({
  category,
  presentationSection,
  i,
  openAll,
}: {
  category: Category;
  presentationSection: string;
  i: number;
  openAll: boolean;
}) => {
  return (
    <Disclosure
      key={i}
      defaultOpen={Object.keys(category.presentations).length === 1}
    >
      {({ open }) => (
        <div>
          <Disclosure.Button className="flex w-full bg-gray-400 text-white my-2 items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium focus:outline-none">
            <span>{presentationSection}</span>
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
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
              <div key={i} className="overflow-x-auto">
                <table className="block w-full leading-normal md:table md:min-w-full">
                  <thead className="hidden md:table-header-group">
                    <tr>
                      <DisplayTh
                        category={category}
                        presentationSection={presentationSection}
                        cell="section"
                      />
                      <DisplayTh
                        category={category}
                        presentationSection={presentationSection}
                        cell="group"
                      />
                      <DisplayTh
                        category={category}
                        presentationSection={presentationSection}
                        cell="time"
                      />
                      <ProjectTh
                        category={category}
                        presentationSection={presentationSection}
                      />
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {category.presentations[presentationSection].map(
                      (presentation, i) => (
                        <tr
                          key={i}
                          className="block py-3 border-b border-gray-300 md:table-row md:py-0 md:border-0"
                        >
                          <DisplayTd
                            category={category}
                            presentationSection={presentationSection}
                            presentation={presentation}
                            cell="section"
                          />
                          <DisplayTd
                            category={category}
                            presentationSection={presentationSection}
                            presentation={presentation}
                            cell="group"
                          />
                          <DisplayTd
                            category={category}
                            presentationSection={presentationSection}
                            presentation={presentation}
                            cell="time"
                          />
                          <ProjectTd
                            category={category}
                            presentationSection={presentationSection}
                            presentation={presentation}
                          />
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
};

const CategoryDisclosure = ({
  category,
  openAll,
}: {
  category: Category;
  openAll: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Disclosure key={category.name}>
      {({ open }) => (
        <>
          {/* Rendered as a div so the Description link can sit inside it
              (a link can't be nested in a <button>). */}
          <Disclosure.Button
            as="div"
            className="flex w-full bg-ceed text-white my-2 items-center justify-between gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium cursor-pointer focus:outline-none"
          >
            <span className="min-w-0 break-words">
              {category.name}
              {category.description?.includes("https://") && (
                <>
                  :{" "}
                  <a
                    href={category.description}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                    // Keep clicks and Enter/Space on the link from toggling the dropdown.
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {t("description_button")}
                  </a>
                </>
              )}
            </span>
            <span className="flex items-center gap-3 shrink-0">
              {category.location && <span>{category.location}</span>}
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </span>
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
              {Object.keys(category.presentations).map(
                (presentationSection, i) => (
                  <PresentationDisclosure
                    key={i}
                    category={category}
                    presentationSection={presentationSection}
                    i={i}
                    openAll={openAll}
                  />
                )
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

const PresentationSchedules = ({ day }: { day: Day }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    return followTab(
      fetchDayTabs(day).presentations,
      (values) => {
        // The parser reads the tab from row 2 down, as the old A2 range did.
        setCategories(parsePresentations(values.slice(1)));
        setLoadFailed(false);
      },
      (err) => {
        console.error(err);
        setCategories([]);
        setLoadFailed(true);
      }
    );
  }, [day]);

  const shownCategories = useMemo(
    () =>
      searchTerm ? filteredCategories(categories, searchTerm) : categories,
    [categories, searchTerm]
  );

  return (
    <div id="presentation" className="flex justify-center py-12">
      <div className="w-full lg:w-1/2 pb-10 lg:px-0 text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-6 text-left">
          {t("presentation_schedule")}
        </h2>
        <div className="text-lg sm:text-xl text-slate-600 mb-6 text-left">
          <p className="mb-2">{t("presentation_paragraph")}</p>
          {t("presentation_li_1") && (
            <ul className="list-disc list-inside inline-block text-left mt-2">
              <li>{t("presentation_li_1")}</li>
              {t("presentation_li_2") && <li>{t("presentation_li_2")}</li>}
            </ul>
          )}
        </div>

        <input
          name="presentationSearch"
          placeholder={t("search_prompt") ?? ""}
          className="shadow block appearance-none border rounded mb-3 px-4 py-2 w-full focus:shadow-outline"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <hr />
        {loadFailed && (
          <p className="my-4 text-sm text-gray-500" role="status">
            {t("schedule_unavailable")}
          </p>
        )}
        <div className="rounded-2xl pb-5">
          {shownCategories.map((category, i) => (
            <CategoryDisclosure
              key={i}
              category={category}
              openAll={searchTerm !== ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationSchedules;
