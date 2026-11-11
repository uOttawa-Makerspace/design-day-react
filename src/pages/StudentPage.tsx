import React from "react";
import DayScheduleLayout from "./ScheduleLayout";
import ScheduleTable from "./ScheduleTable";
import PresentationSchedules from "./PresentationSchedules";

const StudentPage: React.FC = () => {
  return (
    <DayScheduleLayout>
      {(day) => (
        <>
          <ScheduleTable type="students" day={day} />
          <PresentationSchedules day={day} />
        </>
      )}
    </DayScheduleLayout>
  );
};

export default StudentPage;
