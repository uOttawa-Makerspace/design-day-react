import React from "react";
import DayScheduleLayout from "./ScheduleLayout";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";

const JudgePage: React.FC = () => {
  return (
    <DayScheduleLayout>
      {(day) => (
        <>
          <ScheduleTable type="judges" />
          <PresentationSchedules />
        </>
      )}
    </DayScheduleLayout>
  );
};

export default JudgePage;
