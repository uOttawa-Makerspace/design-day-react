import React from "react";
import DayScheduleLayout from "./ScheduleLayout";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";
import Food from "./Food";

const StudentPage: React.FC = () => {
  return (
    <DayScheduleLayout>
      {(day) => (
        <>
          <ScheduleTable type="students" />
          <Food type="students" />
          <PresentationSchedules />
        </>
      )}
    </DayScheduleLayout>
  );
};

export default StudentPage;
