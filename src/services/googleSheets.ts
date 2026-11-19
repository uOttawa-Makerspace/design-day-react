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

// Tabs already requested this session, keyed by sheet id and tab, so
// switching between pages or days reuses the first request.
const tabCache = new Map<string, Promise<string[][]>>();

export function resetTabCache(): void {
  tabCache.clear();
}

// Fetches the tab's used range: Sheets returns rows from A1 down to the last
// row and column that hold a value, so nothing past the data is scanned or sent.
export function fetchTab(tabName: string): Promise<string[][]> {
  const sheetId = config.sheetId;
  if (!sheetId) return requestTab(sheetId, tabName);

  const key = JSON.stringify([sheetId, tabName]);
  let request = tabCache.get(key);
  if (!request) {
    request = requestTab(sheetId, tabName);
    tabCache.set(key, request);
    // A failed request is dropped so the next call tries again.
    request.catch(() => {
      if (tabCache.get(key) === request) tabCache.delete(key);
    });
  }
  return request;
}

async function requestTab(
  sheetId: string,
  tabName: string
): Promise<string[][]> {
  const a1 = `'${tabName.replace(/'/g, "''")}'`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      a1
    )}?key=${import.meta.env.REACT_APP_GOOGLE_API_KEY}`
  );
  if (!res.ok) {
    throw new Error(`Sheets request for "${tabName}" failed (${res.status})`);
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
