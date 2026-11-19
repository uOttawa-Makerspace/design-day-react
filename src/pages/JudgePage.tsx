import React from "react";
import ScheduleLayout from "../components/ScheduleLayout";
import DayContent from "../components/DayContent";
import Sponsors from "../components/Sponsors";

const JudgePage: React.FC = () => {
  return (
    <>
      <ScheduleLayout>
        {(day) => <DayContent role="judges" day={day} />}
      </ScheduleLayout>
      <Sponsors />
    </>
  );
};

export default JudgePage;
