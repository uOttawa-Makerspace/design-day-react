import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";

const JudgePage: React.FC = () => {
  return (
    <main className="pt-16">
      <ScheduleTable type="judges" />
      <PresentationSchedules />
    </main>
  );
};

export default JudgePage;
