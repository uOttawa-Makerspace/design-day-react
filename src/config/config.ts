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
  date: string;
  generalSchedule: GeneralSchedule[];
}

const config: Config = {
  year: 2022,
  semester: Semesters.fall,
  date: "01/12/2022",
  generalSchedule: [
    {
      time: "10h30-11h00",
      eventEn: "Judge orientation",
      eventFr: "Orientation des juges",
    },
    {
      time: "11h15-13h15",
      eventEn: "Judging",
      eventFr: "Évaluation",
    },
    {
      time: "13h15-14h45",
      eventEn: "Lunch and Deliberation",
      eventFr: "Diner et déliberation",
    },
    {
      time: "13h15-15h15",
      eventEn: "Event open to the public",
      eventFr: "Evenement ouvert au public",
    },
    {
      time: "15h15-16h15",
      eventEn: "Closing remark and awards ceremony",
      eventFr: "Remarques de clôture et cérémonie de remise des prix",
    },
  ],
};

export default config;
