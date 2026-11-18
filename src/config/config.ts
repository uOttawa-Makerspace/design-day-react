enum Semesters {
  fall = "fall",
  winter = "winter",
  summer = "summer",
}

interface Config {
  year: number;
  semester: Semesters;
  dateFr: string; // date in DD/MM/YYYY format
  dateEn: string; // date in YYYY/MM/DD format
  sheetId: string;
  showFloorPlan: boolean; // Day 1 switch: admin want to hide old floorplans
  showFloorPlanDay2: boolean; // Day 2 switch
  floorplans: string[]; // URL to makerepo hosted images
  floorplan_titles: (string | null)[];
  // Day (1 or 2) of floorplans[i]; null when the API doesn't send days (all days)
  floorplanDays: (number | null)[];
  // Student/judge schedules and food blurbs come from the Google Sheet, see services/googleSheets.ts
}

// Response of GET /api/v1/design_day (see doc/api/v1/design_day.md in the Rails app).
interface ApiDesignDay {
  year: number;
  semester: Semesters;
  day: string;
  sheet_key: string;
  show_floorplans: boolean;
  floorplan_urls: string[];
  floorplan_titles: (string | null)[];
  show_floorplans_day2?: boolean;
  floorplan_days?: number[];
}

let config: Config = {
  year: 2025,
  sheetId: "",
  semester: Semesters.fall,
  dateFr: "",
  dateEn: "",
  showFloorPlan: false,
  showFloorPlanDay2: false,
  floorplans: [],
  floorplan_titles: [],
  floorplanDays: [],
};

let inFlight: Promise<boolean> | null = null;

// Resolves true once the real config is loaded, false if the fetch or parse
// failed (config is then left untouched). Concurrent calls share one request.
export function fetchConfig(): Promise<boolean> {
  if (!inFlight) {
    inFlight = loadConfig().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

async function loadConfig(): Promise<boolean> {
  let j: ApiDesignDay;
  try {
    // Public endpoint: no cookies, no credentials.
    const response = await fetch(
      `${import.meta.env.REACT_APP_CONFIG_ENDPOINT}`,
      {
        credentials: "omit",
      }
    );
    if (!response.ok) {
      throw new Error(`Design Day config responded ${response.status}`);
    }
    j = await response.json();
  } catch (e) {
    console.error("Could not load the Design Day config", e);
    return false;
  }

  // Copy over simple structures
  config["year"] = j["year"];
  config["sheetId"] = j["sheet_key"];
  config["semester"] = j["semester"];
  // TODO localize time
  config["dateFr"] = j["day"];
  config["dateEn"] = j["day"];
  config["sheetId"] = j["sheet_key"];
  config["showFloorPlan"] = j["show_floorplans"];
  config["floorplans"] = j["floorplan_urls"];
  config["floorplan_titles"] = j["floorplan_titles"];
  // Older APIs have no per-day fields
  config["showFloorPlanDay2"] =
    j["show_floorplans_day2"] ?? j["show_floorplans"];
  config["floorplanDays"] = j["floorplan_urls"].map(
    (_, i) => j["floorplan_days"]?.[i] ?? null
  );
  return true;
}

export default config;
