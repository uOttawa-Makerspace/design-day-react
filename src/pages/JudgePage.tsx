import React from "react";
import ScheduleLayout from "./ScheduleLayout";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";
import Food from "./Food";

const JudgePage: React.FC = () => {
  return (
    <ScheduleLayout>
      {(day) => (
        <>
          <ScheduleTable type="judges" />
          <Food type="judges" />
          <PresentationSchedules />
        </>
      )}
    </ScheduleLayout>
  );
};

export default JudgePage;
