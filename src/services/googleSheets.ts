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

export async function fetchTab(
  tabName: string,
  range = "A1:ZZZ1000"
): Promise<string[][]> {
  const a1 = `'${tabName.replace(/'/g, "''")}'!${range}`;
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${
      config.sheetId
    }/values/${encodeURIComponent(a1)}?key=${
      import.meta.env.REACT_APP_GOOGLE_API_KEY
    }`
  );
  if (!res.ok) {
    throw new Error(`Sheets request for "${tabName}" failed (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data?.values) ? data.values : [];
}

// Expects values starting at row 2 (fetch with range "A2:ZZZ1000").
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
