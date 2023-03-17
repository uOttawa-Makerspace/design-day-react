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
  generalSchedule: GeneralSchedule[];
}

const config: Config = {
  year: 2023,
  semester: Semesters.winter,
  dateFr: "30/03/2023",
  dateEn: "2023/03/30",
  sheetId: "1edPKFVkc3KErPQHaG4zVG-L95Kz2psM96qxbeWKW7w4",
  generalSchedule: [
    {
      time: "8h30-9h00",
      eventEn: "Judge orientation",
      eventFr: "Orientation des juges",
    },
    {
      time: "9h15-11h15",
      eventEn: "Judging",
      eventFr: "Évaluation",
    },
    {
      time: "11h15-12h45",
      eventEn: "Lunch and Deliberation",
      eventFr: "Diner et déliberation",
    },
    {
      time: "11h15-13h15",
      eventEn: "Event open to the public",
      eventFr: "Evenement ouvert au public",
    },
    {
      time: "13h15-14h15",
      eventEn: "Closing remark and awards ceremony",
      eventFr: "Remarques de clôture et cérémonie de remise des prix",
    },
  ],
};

export default config;
