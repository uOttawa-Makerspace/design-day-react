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

const config: Config = {
  year: 2025,
  semester: Semesters.winter,
  dateFr: "27/03/2025",
  dateEn: "2025/03/27",
  sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID || "",
  hideFloorPlan: false,
  judgesSchedule: [
    {
      time: "9h15-9h45",
      eventEn: "Judge orientation (STEM 464/664)",
      eventFr: "Orientation des juges (STEM 464/664)",
    },
    {
      time: "10h-12h",
      eventEn: "Judging",
      eventFr: "Évaluation",
    },
    {
      time: "12h-13h15",
      eventEn: "Lunch and Deliberation",
      eventFr: "Diner et déliberation",
    },
    {
      time: "14h-15h",
      eventEn: "Closing remark and awards ceremony (STEM atrium)",
      eventFr:
        "Remarques de clôture et cérémonie de remise des prix (atrium STEM)",
    },
  ],
  studentsSchedule: [
    {
      time: "9h15-9h45",
      eventEn:
        "Table setup and registration (near STEM front entrance and SITE spinning doors)",
      eventFr:
        "Installation de la table et inscription (près de l'entrée principale de STEM et des portes tournantes de SITE)",
    },
    {
      time: "10h-12h",
      eventEn: "Group evaluation",
      eventFr: "Évaluation de groupe",
    },
    {
      time: "10h-12h30",
      eventEn: "Engineering pitch competition (STEM 122)",
      eventFr: "Concours de pitch entrepreneurial en génie (STEM 122)",
    },
    {
      time: "10h30-13h30",
      eventEn: "Career fair (STEM atrium)",
      eventFr: "Foire aux carrières (atrium STEM)",
    },
    {
      time: "11h-13h",
      eventEn: "Headshots available (STEM atrium)",
      eventFr: "Photos de tête disponibles (atrium STEM)",
    },
    {
      time: "12h-14h",
      eventEn: "Event open to the public",
      eventFr: "Événement ouvert au public",
    },
    {
      time: "14h-15h",
      eventEn: "Closing remark and awards ceremony (STEM atrium)",
      eventFr:
        "Remarques de clôture et cérémonie de remise des prix (atrium STEM)",
    },
  ],
};

export default config;
