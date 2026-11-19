import React from "react";
import ScheduleLayout from "../components/ScheduleLayout";
import DayContent from "../components/DayContent";
import Sponsors from "../components/Sponsors";

const StudentPage: React.FC = () => {
  return (
    <>
      <ScheduleLayout>
        {(day) => <DayContent role="students" day={day} />}
      </ScheduleLayout>
      <Sponsors />
    </>
  );
};
export default StudentPage;
