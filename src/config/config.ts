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
  hideFloorPlan: boolean;
  judgesSchedule: GeneralSchedule[]; // judges schedule
  studentsSchedule: GeneralSchedule[]; // students schedule
}

let config: Config = {
  year: 2025,
  sheetId: "",
  semester: Semesters.fall,
  dateFr: "",
  dateEn: "",
  hideFloorPlan: false,
  judgesSchedule: [],
  studentsSchedule: [],
};

export async function fetchConfig() {
  const response = await fetch(`${process.env.REACT_APP_CONFIG_ENDPOINT}`);
  const j = await response.json();

  let judge_schedules: GeneralSchedule[] = [];
  let student_schedules: GeneralSchedule[] = [];

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

  config["year"] = j["year"];
  config["sheetId"] = j["sheet_key"];
  config["semester"] = j["semester"];
  // TODO localize time
  config["dateFr"] = j["day"];
  config["dateEn"] = j["day"];
  config["sheetId"] = j["sheet_key"];
  config["hideFloorPlan"] = true;
  config["judgesSchedule"] = judge_schedules;
  config["studentsSchedule"] = student_schedules;
}

export default config;
