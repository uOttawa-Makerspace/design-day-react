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
  year: 2023,
  semester: Semesters.fall,
  dateFr: "30/11/2023",
  dateEn: "2023/11/30",
  sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID || "",
  judgesSchedule: [
    {
      time: "9h15-9h45",
      eventEn: "Judge orientation",
      eventFr: "Orientation des juges",
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
      eventEn: "Table setup",
      eventFr: "Installation de la table",
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
      time: "14h-15h",
      eventEn: "Closing remark and awards ceremony (STEM atrium)",
      eventFr:
        "Remarques de clôture et cérémonie de remise des prix (atrium STEM)",
    },
  ],
};

export default config;
