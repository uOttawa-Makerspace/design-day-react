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
  dateFr: string;
  dateEn: string;
  sheetId: string;
  judgesSchedule: GeneralSchedule[]; // judges schedule
  studentsSchedule: GeneralSchedule[]; // students schedule
}

const config: Config = {
  year: 2024,
  semester: Semesters.winter,
  dateFr: "04/04/2024",
  dateEn: "2024/04/04",
  sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID || "",
  judgesSchedule: [
    {
      time: "9h15-9h45",
      eventEn: "Judge orientation (STEM 364)",
      eventFr: "Orientation des juges (STEM 364)",
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
      eventEn: "Table setup and registration (near STEM front entrance and SITE spinning doors)",
      eventFr: "Installation de la table et inscription (près de l'entrée principale de STEM et des portes tournantes de SITE)",
    },
    {
      time: "10h-12h",
      eventEn: "Judging",
      eventFr: "Évaluation",
    },
    {
      time: "12h-14h",
      eventEn: "Event open to the public",
      eventFr: "Evenement ouvert au public",
    },
    {
      time: "12h-13h15",
      eventEn: "Concepts competition (STEM 122)",
      eventFr: "Compétition de concepts (STEM 122)",
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
