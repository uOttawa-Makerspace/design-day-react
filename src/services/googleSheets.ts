import config from "../config/config";

export interface Category {
  name: string;
  description?: string;
  location: string;
  presentations: Record<string, Presentation[]>;
}

export interface Presentation {
  section?: string;
  group?: string;
  time?: string;
  project?: string;
  project_description?: string;
  project_repo?: string;
}

// Fetched tabs older than this are requested again on the next load.
export const TAB_CACHE_TTL_MS = 5 * 60 * 1000;

interface TabEntry {
  values?: string[][]; // last good data, if any
  fetchedAt: number; // when `values` arrived
  pending?: Promise<string[][]>; // request in flight
}

// What a caller gets for one tab: data it can show now (`cached`), and a
// request whose result should replace it (`pending`). A fresh tab has only
// `cached`; a stale one has both; a tab never loaded has only `pending`.
export interface TabLoad {
  cached?: string[][];
  pending?: Promise<string[][]>;
}

// Tabs requested this session, keyed by sheet id and tab, so switching
// between pages or days reuses them.
const tabCache = new Map<string, TabEntry>();

export function resetTabCache(): void {
  tabCache.clear();
}

// A day's presentation tab and its "Other" tab (schedules and food), loaded
// together in one request.
export function fetchDayTabs(day: string): {
  presentations: TabLoad;
  other: TabLoad;
} {
  const [presentations, other] = fetchTabs([`DD${day}`, `Other DD${day}`]);
  return { presentations, other };
}

// Starts loading both days' tabs in one request so the judge and student
// pages find them cached. Results land in the cache; nothing to await here.
export function prefetchScheduleTabs(): void {
  if (!config.sheetId) return;
  fetchTabs(["DD1", "Other DD1", "DD2", "Other DD2"]);
}

// Returns one load per tab, in order. Tabs never loaded, or loaded more than
// TAB_CACHE_TTL_MS ago, are fetched in a single request, and each tab keeps its
// own cache entry.
// Each tab is requested as its used range: Sheets returns rows from A1 down to
// the last row and column that hold a value, so nothing past the data is sent.
export function fetchTabs(tabNames: string[]): TabLoad[] {
  const sheetId = config.sheetId;
  if (!sheetId) {
    return requestTabs(sheetId, tabNames).map((pending) => ({ pending }));
  }

  const key = (tabName: string) => JSON.stringify([sheetId, tabName]);
  const due = Array.from(new Set(tabNames)).filter((tabName) =>
    isDue(tabCache.get(key(tabName)))
  );
  requestTabs(sheetId, due).forEach((request, i) =>
    track(key(due[i]), request)
  );
  return tabNames.map((tabName) => {
    const entry = tabCache.get(key(tabName))!;
    return { cached: entry.values, pending: entry.pending };
  });
}

function isDue(entry: TabEntry | undefined): boolean {
  if (!entry) return true;
  return !entry.pending && Date.now() - entry.fetchedAt >= TAB_CACHE_TTL_MS;
}

function track(key: string, request: Promise<string[][]>): void {
  const entry: TabEntry = tabCache.get(key) ?? { fetchedAt: 0 };
  entry.pending = request;
  tabCache.set(key, entry);
  request.then(
    (values) => {
      entry.values = values;
      entry.fetchedAt = Date.now();
      entry.pending = undefined;
    },
    () => {
      entry.pending = undefined;
      // Old data stays (and is retried next load); with none, the entry goes.
      if (!entry.values && tabCache.get(key) === entry) tabCache.delete(key);
    }
  );
}

// Passes a tab's data to `onValues`: the cached data at once, then the result
// of a request in flight. A failed refresh keeps the cached data on screen;
// `onError` runs only when there is no data to show. Returns a cancel function.
export function followTab(
  load: TabLoad,
  onValues: (values: string[][]) => void,
  onError: (error: unknown) => void
): () => void {
  let active = true;
  if (load.cached) {
    try {
      onValues(load.cached);
    } catch (error) {
      onError(error);
    }
  }
  load.pending
    ?.then((values) => {
      if (active) onValues(values);
    })
    .catch((error) => {
      if (!active) return;
      if (load.cached) console.warn("Keeping the cached sheet data", error);
      else onError(error);
    });
  return () => {
    active = false;
  };
}

function requestTabs(
  sheetId: string,
  tabNames: string[]
): Promise<string[][]>[] {
  if (tabNames.length < 2) {
    return tabNames.map((tabName) => requestTab(sheetId, tabName));
  }
  const batch = requestBatch(sheetId, tabNames);
  // batchGet fails as a whole when any one range is bad, such as a missing
  // tab (400 or 404). Only then fall back to one request per tab, so a missing
  // tab does not hide the others. Other failures (429, 5xx, network) reject
  // every tab: retrying them would only add to quota pressure.
  return tabNames.map((tabName, i) =>
    batch.then(
      (tabs) => tabs[i],
      (error) =>
        isBadRange(error) ? requestTab(sheetId, tabName) : Promise.reject(error)
    )
  );
}

class SheetsRequestError extends Error {
  constructor(what: string, readonly status: number) {
    super(`Sheets request for ${what} failed (${status})`);
  }
}

function isBadRange(error: unknown): boolean {
  return (
    error instanceof SheetsRequestError &&
    (error.status === 400 || error.status === 404)
  );
}

function a1Range(tabName: string): string {
  return `'${tabName.replace(/'/g, "''")}'`;
}

async function requestBatch(
  sheetId: string,
  tabNames: string[]
): Promise<string[][][]> {
  const ranges = tabNames
    .map((tabName) => `ranges=${encodeURIComponent(a1Range(tabName))}`)
    .join("&");
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${ranges}&key=${
      import.meta.env.REACT_APP_GOOGLE_API_KEY
    }`
  );
  if (!res.ok) {
    throw new SheetsRequestError(tabNames.join(", "), res.status);
  }
  const data = await res.json();
  const valueRanges: { range?: string; values?: string[][] }[] = Array.isArray(
    data?.valueRanges
  )
    ? data.valueRanges
    : [];
  // One range per requested tab, in order. Anything else is a failure rather
  // than an empty tab, so it is not cached.
  if (
    valueRanges.length !== tabNames.length ||
    !valueRanges.every((range, i) => rangeIsTab(range?.range, tabNames[i]))
  ) {
    throw new Error(
      `Sheets batch for ${tabNames.join(", ")} did not match the request`
    );
  }
  return valueRanges.map((range) =>
    Array.isArray(range.values) ? range.values : []
  );
}

// Sheets echoes each range as "Tab!A1:Z9", quoting the tab name when needed.
function rangeIsTab(range: string | undefined, tabName: string): boolean {
  return (
    typeof range === "string" &&
    (range.startsWith(`${a1Range(tabName)}!`) ||
      range.startsWith(`${tabName}!`))
  );
}

async function requestTab(
  sheetId: string,
  tabName: string
): Promise<string[][]> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      a1Range(tabName)
    )}?key=${import.meta.env.REACT_APP_GOOGLE_API_KEY}`
  );
  if (!res.ok) {
    throw new SheetsRequestError(`"${tabName}"`, res.status);
  }
  const data = await res.json();
  return Array.isArray(data?.values) ? data.values : [];
}

export function parsePresentations(values: string[][]): Category[] {
  if (!Array.isArray(values[0]) || values[0].length === 0) {
    throw new Error("Presentation tab has no values");
  }

  const categories: Category[] = [];
  for (let i = 0; i < values[0].length; i += 7) {
    categories.push({
      name: values[0][i],
      description: values[0][i + 1],
      location: values[0][i + 2],
      presentations: {},
    });
  }

  const presentationData = values.slice(3);
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

  return categories;
}

// "Other DD1" / "Other DD2" tabs: food blurbs and the student/judge schedules
export type Role = "students" | "judges";

export interface FoodBlurb {
  fr: string;
  en: string;
}

export interface ScheduleRow {
  time: string;
  detailsFr: string;
  detailsEn: string;
  location: string;
}

export type OtherTab = Record<
  Role,
  { food: FoodBlurb; schedule: ScheduleRow[] }
>;

// "Student", "students ", "Étudiant" -> "students"; unknown -> null
function toRole(cell: string | undefined): Role | null {
  const value = (cell ?? "").trim().toLowerCase();
  if (
    value.startsWith("student") ||
    value.startsWith("étudiant") ||
    value.startsWith("etudiant")
  ) {
    return "students";
  }
  if (value.startsWith("judge") || value.startsWith("juge")) {
    return "judges";
  }
  return null;
}

export function parseOtherTab(values: string[][]): OtherTab {
  const result: OtherTab = {
    students: { food: { fr: "", en: "" }, schedule: [] },
    judges: { food: { fr: "", en: "" }, schedule: [] },
  };

  for (let i = 1; i < values.length && values[i].some((el) => el); i++) {
    const role = toRole(values[i][0]);
    if (!role) {
      console.warn(`Unknown role "${values[i][0]}" in food row ${i + 1}`);
      continue;
    }
    result[role].food = { fr: values[i][1] ?? "", en: values[i][2] ?? "" };
  }

  const scheduleData = values.slice(5);
  for (let i = 0; i < scheduleData.length; i++) {
    for (let j = 0; j < scheduleData[i].length; j += 6) {
      if (scheduleData[i].slice(j, j + 5).some((el: string) => el)) {
        const role = toRole(scheduleData[i][j]);
        if (!role) {
          console.warn(
            `Unknown role "${scheduleData[i][j]}" in schedule row ${i + 6}`
          );
          continue;
        }
        result[role].schedule.push({
          time: scheduleData[i][j + 1] ?? "",
          detailsFr: scheduleData[i][j + 2] ?? "",
          detailsEn: scheduleData[i][j + 3] ?? "",
          location: scheduleData[i][j + 4] ?? "",
        });
      }
    }
  }

  return result;
}
