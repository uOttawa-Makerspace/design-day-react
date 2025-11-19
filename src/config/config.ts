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
  judgesSchedule: GeneralSchedule[]; // judges schedule
  studentsSchedule: GeneralSchedule[]; // students schedule
}

let config: Config = {
  year: 2025,
  sheetId: "",
  semester: Semesters.fall,
  dateFr: "",
  dateEn: "",
  showFloorPlan: false,
  floorplans: [],
  judgesSchedule: [],
  studentsSchedule: [],
};

export async function fetchConfig() {
  const response = await fetch(`${process.env.REACT_APP_CONFIG_ENDPOINT}`);
  const j = await response.json();

  let judge_schedules: GeneralSchedule[] = [];
  let student_schedules: GeneralSchedule[] = [];

  // Push schedules
  j["design_day_schedules"].forEach((sched: any) => {
    let start = new Date(sched["start"]);
    let startH = start.getHours();
    let startM = start.getMinutes();

    let end = new Date(sched["end"]);
    let endH = end.getHours();
    let endM = end.getMinutes();

    let item: GeneralSchedule = {
      time: `${startH}h${startM == 0 ? "" : startM} - ${endH}h${
        endM == 0 ? "" : endM
      }`,
      eventEn: sched["title_en"],
      eventFr: sched["title_fr"],
    };
    if (sched["event_for"] == "student") {
      student_schedules.push(item);
    } else {
      judge_schedules.push(item);
    }
  });

  // Copy over simple structures
  config["year"] = j["year"];
  config["sheetId"] = j["sheet_key"];
  config["semester"] = j["semester"];
  // TODO localize time
  config["dateFr"] = j["day"];
  config["dateEn"] = j["day"];
  config["sheetId"] = j["sheet_key"];
  config["showFloorPlan"] = j["show_floorplans"];
  config["floorplans"] = j["floorplan_urls"] || [];
  config["judgesSchedule"] = judge_schedules;
  config["studentsSchedule"] = student_schedules;
}

export default config;
