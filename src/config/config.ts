interface GeneralSchedule {
  time: string;
  eventEn: string;
  eventFr: string;
}

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
  showFloorPlan: boolean; // Admin want to hide old floorplans
  floorplans: string[]; // URL to makerepo hosted images
  floorplan_titles: (string | null)[];
  judgesSchedule: GeneralSchedule[]; // judges schedule
  studentsSchedule: GeneralSchedule[]; // students schedule
}

// Response of GET /api/v1/design_day (see doc/api/v1/design_day.md in the Rails app).
interface ApiSchedule {
  start: string; // ISO 8601
  end: string; // ISO 8601
  title_en: string;
  title_fr: string;
  event_for: "student" | "judge";
}

interface ApiDesignDay {
  year: number;
  semester: Semesters;
  day: string;
  sheet_key: string;
  show_floorplans: boolean;
  floorplan_urls: string[];
  floorplan_titles: (string | null)[];
  schedules: ApiSchedule[];
}

let config: Config = {
  year: 2025,
  sheetId: "",
  semester: Semesters.fall,
  dateFr: "",
  dateEn: "",
  showFloorPlan: false,
  floorplans: [],
  floorplan_titles: [],
  judgesSchedule: [],
  studentsSchedule: [],
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
    const response = await fetch(`${process.env.REACT_APP_CONFIG_ENDPOINT}`, {
      credentials: "omit",
    });
    if (!response.ok) {
      throw new Error(`Design Day config responded ${response.status}`);
    }
    j = await response.json();
  } catch (e) {
    console.error("Could not load the Design Day config", e);
    return false;
  }

  let judge_schedules: GeneralSchedule[] = [];
  let student_schedules: GeneralSchedule[] = [];

  // Push schedules
  try {
    j.schedules.forEach((sched) => {
      let start = new Date(sched["start"]);
      let startH = start.getHours();
      let startM = start.getMinutes();

      let end = new Date(sched["end"]);
      let endH = end.getHours();
      let endM = end.getMinutes();

      let item: GeneralSchedule = {
        time: `${startH}h${startM === 0 ? "" : startM} - ${endH}h${
          endM === 0 ? "" : endM
        }`,
        eventEn: sched["title_en"],
        eventFr: sched["title_fr"],
      };
      if (sched["event_for"] === "student") {
        student_schedules.push(item);
      } else {
        judge_schedules.push(item);
      }
    });
  } catch (e) {
    console.error("Could not parse the Design Day config", e);
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
  config["judgesSchedule"] = judge_schedules;
  config["studentsSchedule"] = student_schedules;
  return true;
}

export default config;
