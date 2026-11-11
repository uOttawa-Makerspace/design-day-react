import React from "react";
import DayScheduleLayout from "./ScheduleLayout";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";

const StudentPage: React.FC = () => {
  return (
    <DayScheduleLayout>
      {(day) => (
        <>
          <ScheduleTable type="students" />
          <PresentationSchedules />
        </>
      )}
    </DayScheduleLayout>
  );
};

export default StudentPage;
